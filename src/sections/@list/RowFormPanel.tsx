import { useState, useEffect, useRef } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Drawer,
  Box,
  Typography,
  Checkbox
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useResponsive from "src/hooks/useResponsive";
import { Dayjs } from "dayjs";
import { connect } from "react-redux";
import {
  cloneContent,
  listContentService,
} from "src/services/listContent.service";
import { FlexlistsError, isErr, isSucc } from "src/models/ApiResponse";
import { filter } from "lodash";
import ChatForm from "./chat/ChatForm";
import { ChatType } from "src/enums/ChatType";
import { marked } from "marked";
//import MarkdownEditor from "src/components/wysiwyg/markdownEditor";
// -----ICONS------
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArchiveIcon from "@mui/icons-material/Archive";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import { FlashMessageModel } from "src/models/FlashMessageModel";
import { setFlashMessage } from "src/redux/actions/authAction";
import { hasPermission } from "src/utils/permissionHelper";
import { View } from "src/models/SharedModels";
import YesNoDialog from "src/components/dialog/YesNoDialog";
import { useReactToPrint } from "react-to-print";
import RenderFields from "./RenderFields";
import { useRouter } from "next/router";
import { FieldUiTypeEnum } from "src/enums/SharedEnums";
import { FieldValidatorEnum, ModelValidatorEnum, frontendValidate, isFrontendError } from "src/utils/validatorHelper";
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";
import { removeReadContent, setReadContent } from "src/redux/actions/viewActions";
import Tooltip from '@mui/material/Tooltip';
import { isValidFieldValue } from "src/utils/flexlistHelper";

interface RowFormProps {
  currentView: View;
  rowData: any[];
  columns: any[];
  open: boolean;
  mode: "view" | "create" | "update" | "comment";
  translations: TranslationText[];
  onClose: () => void;
  onSubmit: (values: any, action: string, id?: number) => void;
  setFlashMessage: (message: FlashMessageModel | undefined) => void;
  setReadContent: (viewId: number,contentId:number) => void;
  removeReadContent: (viewId: number,contentId:number) => void;
}

const RowFormPanel = ({
  currentView,
  rowData,
  open,
  columns,
  mode,
  translations,
  onClose,
  onSubmit,
  setFlashMessage,
  setReadContent,
  removeReadContent
}: RowFormProps) => {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const router = useRouter();
  const componentRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [values, setValues] = useState(rowData[0]);
  const [submit, setSubmit] = useState(false);
  const [currentMode, setCurrentMode] = useState<
    "view" | "create" | "update" | "comment"
  >(mode);
  const [windowHeight, setWindowHeight] = useState(0);
  const [panelWidth, setPanelWidth] = useState("500px");
  const [openBulkDeleteDialog, setOpenBulkDeleteDialog] = useState(false);
  const [copySuccess, setCopySuccess] = useState(t("Copy to Clipboard"));
  const [checkedFields, setCheckedFields] = useState<any[]>([]);

  const actions = [
    {
      title: t("Resize"),
      icon: <FullscreenIcon />,
      action: "resize",
      allowed: true,
    },
    {
      title: t("Clone"),
      icon: <ContentCopyIcon />,
      action: "clone",
      allowed: hasPermission(currentView?.role, "Update"),
    },
    {
      title: `${values &&
        values[columns.find((x) => x.system && x.name === "___archived").id]
        ? t("Unarchive")
        : t("Archive")
        }`,
      icon: <ArchiveIcon />,
      action: "archive",
      allowed: hasPermission(currentView?.role, "Update"),
    },
    {
      title: t("Print"),
      icon: <PrintIcon />,
      action: "print",
      allowed: hasPermission(currentView?.role, "Read"),
    },
    {
      title: t("Delete"),
      icon: <DeleteIcon />,
      action: "delete",
      // color: "#c92929",
      color: theme.palette.palette_style.error.dark,
      allowed: hasPermission(currentView?.role, "Delete"),
    },
  ];

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    setValues(rowData.length > 1 ? null : rowData[0]);
    setSubmit(false);
    setCurrentMode(mode);
    if (
      router.isReady &&
      mode === "view" &&
      rowData.length &&
      rowData[0].id &&
      rowData[0].id > 0
    ) {
      window.history.pushState( {} , '', '?contentId=' + rowData[0].id );
      setReadContent(currentView.id,rowData[0].id);
    }

    if (rowData.length > 1) {
      const fieldCheckStatus: any[] = [];
      columns.map((column: any) => {
        fieldCheckStatus.push({ id: column.id, checked: false });
      });

      setCheckedFields(fieldCheckStatus);
    }
  }, [open, rowData, mode]);

  const handleSubmit = async () => {
    setSubmit(true);
    if (!values) {
      setFlashMessage({ message: "No values", type: "error" });
      return;
    } else {
      if (rowData.length > 1) {
        if (!checkedFields.find((checkedField: any) => checkedField.checked)) {
          setFlashMessage({ message: "No selected fields", type: "error" });
          return;
        } else {
          if (checkedFields.filter((checkedField: any) => checkedField.checked).find((checkedField: any) => !values[checkedField.id])) {
            setFlashMessage({ message: "Empty value for selected field", type: "error" });
            return;
          }
        }
      }
    }

    let validator = true;
    let requiredErrorFields: string[] = [];
    let otherErrorFields: string[] = [];
    if (values) {
      for (const column of columns) {
        if (
          !column.system
        ) {
          let isValid = await isValidFieldValue(column.uiField,values[column.id],column.required);
          if(!isValid)
          {
            validator = false;
            requiredErrorFields.push(column.name);
          }
        }
        if(column.uiField === FieldUiTypeEnum.Link)
        {
          let linkValue = values[column.id]?.linkValue;
          if(linkValue)
          {
            let _errors: { [key: string]: string|boolean } = {}

            const _setErrors = (e: { [key: string]: string|boolean }) => { 
              _errors = e
            } 
            await frontendValidate(ModelValidatorEnum.GenericTypes,FieldValidatorEnum.uRL,linkValue,_errors,_setErrors,true)
            if(isFrontendError(FieldValidatorEnum.uRL,_errors)) 
            {
              validator = false;
              otherErrorFields.push(`${column.name} is invalid link`);
            }
          }
          // else
          // {
          //   if(column.required)
          //   {
          //     validator = false;
          //     requiredErrorFields.push(column.name);
          //   }
          // }
        }
      }
     
      if (validator) {
        //update row data
        if (rowData.length && rowData[0].id) {
          if (rowData.length > 1) {
            const updatedContents = rowData.map((row: any) => {
              const newRow = row;

              for (const key in values) {
                newRow[key] = values[key];
              }

              return newRow;
            });

            const updateRowRespone = await listContentService.updateContents(
              currentView.id,
              updatedContents
            );
            if (isSucc(updateRowRespone)) {
              onSubmit(updatedContents, "update");
              rowData.map((row: any) => {
                removeReadContent(currentView.id, row.id)
              });
            } else {
              setFlashMessage({
                message: (updateRowRespone as FlexlistsError).message,
                type: "error",
              });
              return;
            }
          } else {
            const updateRowRespone = await listContentService.updateContent(
              currentView.id,
              values
            );
            if (isSucc(updateRowRespone)) {
              onSubmit(values, "update");
              removeReadContent(currentView.id, rowData[0].id)
            } else {
              setFlashMessage({
                message: (updateRowRespone as FlexlistsError).message,
                type: "error",
              });
              return;
            }
          }
        } else {
          var createRowResponse = await listContentService.createContent(
            currentView.id,
            values
          );
          if (
            isSucc(createRowResponse) &&
            createRowResponse.data &&
            createRowResponse.data.content &&
            createRowResponse.data.content.length > 0
          ) {
            values.id = createRowResponse.data.content[0].id;
            values.createdAt = new Date().toISOString();
            values.updatedAt = new Date().toISOString();
            var archiveField = columns.find(
              (x) => x.system && x.name === "___archived"
            );
            if (archiveField) {
              values[archiveField.id] = false;
            }
            const { query } = router;
            router.replace({
              pathname: router.pathname,
              query: { ...query, ["contentId"]: values.id },
            });
            onSubmit(values, "create", values.id);
          } else {
            setFlashMessage({
              message: (createRowResponse as FlexlistsError).message,
              type: "error",
            });
            return;
          }
        }

        onClose();
      } else {
        if(requiredErrorFields.length > 0)
        {
          setFlashMessage({
            message: `${requiredErrorFields.join(",")} ${requiredErrorFields.length > 1 ? "are" : "is"
              } required`,
            type: "error",
          });
          return;
        }
        if(otherErrorFields)
        {
          setFlashMessage({
            message: otherErrorFields.join(','),
            type: "error",
          });
          return;
        }
      }
    }
  };

  const handleAction = async (action: string) => {
    let newValues = Object.assign({}, values);
    if (action === "delete") {
      setOpenBulkDeleteDialog(true);
      return;
    } else if (action === "resize") {
      if (panelWidth.includes("%")) {
        setPanelWidth("500px");
      } else {
        setPanelWidth("100%");
      }
      return;
    } else if (action === "clone") {
      let cloneResponse = await cloneContent(
        currentView.id,
        rowData.map((row: any) => {
          if (row) {
            delete row.id;
            var archiveField = columns.find(
              (x) => x.system && x.name === "___archived"
            );
            if (archiveField) {
              row[archiveField.name] = row[archiveField.id];
              delete row[archiveField.id];
            }
            return row;
          }
        })
      );
      if (
        isSucc(cloneResponse) &&
        cloneResponse.data &&
        cloneResponse.data.content &&
        cloneResponse.data.content.length > 0
      ) {
        newValues.id = cloneResponse.data.content[0].id;
      } else {
        setFlashMessage({
          type: "error",
          message: (cloneResponse as FlexlistsError).message,
        });
        return;
      }
    } else if (action === "archive") {
      let updateRowRespone: any;
      const archiveField = columns.find(
        (x) => x.system && x.name === "___archived"
      );

      if (rowData.length > 1) {
        if (archiveField) {
          newValues = rowData.map((row: any) => (
            {...row, [archiveField.id]: !row[archiveField.id]}
          ));
        }
        updateRowRespone = await listContentService.updateContents(
          currentView.id,
          newValues
        );
      } else {
        if (archiveField) {
          newValues[archiveField.id] = !values[archiveField.id];
        }
        updateRowRespone = await listContentService.updateContent(
          currentView.id,
          newValues
        );
      }
      
      if (isSucc(updateRowRespone)) {
        setFlashMessage({
          message: "Row archived successfully",
          type: "success",
        });
        onSubmit(newValues, "archive");
        onClose();
        return;
      } else {
        setFlashMessage({
          type: "error",
          message: (updateRowRespone as FlexlistsError).message,
        });
        return;
      }
    } else if (action === "print") {
      handlePrint();
      return;
    }
    onSubmit(newValues, action);
    onClose();
  };

  const handleDelete = async () => {
    let deleteContentResponse: any;

    if (rowData.length > 1) {
      deleteContentResponse = await listContentService.deleteBulkContents(
        currentView.id,
        rowData.map((row: any) => row.id)
      );
    } else {
      deleteContentResponse = await listContentService.deleteContent(
        currentView.id,
        values.id
      );
    }
    
    if (isErr(deleteContentResponse)) {
      setFlashMessage({
        message: (deleteContentResponse as FlexlistsError).message,
        type: "error",
      });
      return;
    } else {
      setFlashMessage({ message: "Row deleted successfully", type: "success" });
    }
    onSubmit(values, "delete");
    onClose();
  };

  const setDateValue = (columnId: number, date: Dayjs | Date | null) => {
    try {
      if (date == null) {
        return;
      }
      if (typeof date === "string") {
        setValues({ ...values, [columnId]: date });
        return;
      }
      setValues({ ...values, [columnId]: date.toISOString() });
    } catch (e) { }
  };

  const setTimeValue = (columnId: number, time: Dayjs | null) => {
    if (time == null) {
      return;
    }
    setValues({
      ...values,
      [columnId]: time.toISOString(),
    });
    // if(typeof time === 'string')
    // {
    //   setValues({ ...values, [columnId]: time })
    //   return
    // }
  };

  const handleEditRow = () => {
    setCurrentMode("update");
  };

  const convertMarkdownToHtml = (markdown: string): string => {
    return marked(markdown);
  };

  const handleCloseModal = () => {
    // setCurrentMode("view");
    onClose();
  };
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const isDesktop = useResponsive("up", "lg");

  const copyUrlToClipboard = async () => {
    await navigator.clipboard.writeText(location.href);
    setCopySuccess(t("Copied to Clipboard"));
  };

  const handleCheckedFields = (e: any, column: any) => {
    const newCheckedFields = checkedFields.map((checkedField) => {
      if (checkedField.id === column.id) {
        return {...checkedField, checked: e.target.checked};
      }
      return checkedField;
    });

    setCheckedFields(newCheckedFields);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleCloseModal}
      PaperProps={{
        sx: {
          width: { xs: "100%", lg: panelWidth },
          border: "none",
          // height: `${windowHeight}px`,
          backgroundColor: theme.palette.palette_style.background.default,
        },
      }}
    >
      {currentMode == "comment" && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            px: { xs: 1, md: 3 },
            marginTop: 4,
            paddingBottom: 2,
            borderBottom: `1px solid ${theme.palette.palette_style.border.default}`,
          }}
        >
          <Box
            component="span"
            className="svg-color"
            sx={{
              width: 22,
              height: 22,
              display: "inline-block",
              bgcolor: theme.palette.palette_style.text.primary,
              mask: `url(/assets/icons/arrow_back.svg) no-repeat center / contain`,
              WebkitMask: `url(/assets/icons/arrow_back.svg) no-repeat center / contain`,
              cursor: "pointer",
              marginRight: { xs: 1.5, md: 4 },
            }}
            onClick={() => {
              setCurrentMode("view");
            }}
          />
        </Box>
      )}
      {currentMode === "create" && (
        <DialogTitle
          textAlign="left"
          sx={{
            borderBottom: `1px solid ${theme.palette.palette_style.border.default}`,
          }}
        >
          {t("Create New Row")}
        </DialogTitle>
      )}
      {(currentMode === "update" || currentMode === "view") && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            px: { xs: 1, md: 3 },
            marginTop: 4,
            paddingBottom: 2,
            borderBottom: `1px solid ${theme.palette.palette_style.border.default}`,
          }}
        >
          {actions.map(
            (action: any) =>
              action.allowed && (
                <Box
                  key={action.title}
                  sx={{
                    display: "flex",
                    cursor: "pointer",
                    "&:first-child": {
                      display: isDesktop ? "flex" : "none",
                    },
                  }}
                  onClick={() => {
                    handleAction(action.action);
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      component="span"
                      className="svg-color"
                      sx={{
                        width: 24,
                        height: 24,
                        display: "grid",
                        placeContent: "center",
                        color:
                          action.color ||
                          theme.palette.palette_style.text.primary,
                        // mask: `url(/assets/icons/toolbar/${action.icon}.svg) no-repeat center / contain`,
                        // WebkitMask: `url(/assets/icons/${action.icon}.svg) no-repeat center / contain`,
                        mr: { xs: 0.2, md: 0.5 },
                      }}
                    >
                      {action.icon}
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color:
                          action.color ||
                          theme.palette.palette_style.text.primary,
                      }}
                    >
                      {action.title}
                    </Typography>
                  </Box>
                </Box>
              )
          )}
        </Box>
      )}

      <DialogContent>
        {currentMode !== "comment" && (
          <form onSubmit={(e) => e.preventDefault()} id="new_row_form">
            <Stack
              sx={{
                width: "100%",
                minWidth: { xs: "300px", sm: "360px", md: "400px" },
                gap: "1.5rem",
                paddingTop: 2,
              }}
            >
              {currentMode !== "view" &&
                filter(columns, (x) => !x.system).map((column: any) =>
                  <Box
                    key={column.id}
                    sx={{ display: 'flex', width: '100%' }}
                  >
                    {checkedFields.length > 1 && <Checkbox
                      checked={checkedFields.find((field: any) => field.id === column.id).checked}
                      onChange={(e) => { handleCheckedFields(e, column); }}
                    />}
                    <RenderFields column={column} currentMode={currentMode} values={values} submit={submit} setValues={setValues} setDateValue={setDateValue} setTimeValue={setTimeValue} translations={translations} />
                  </Box>
                )}
              {currentMode === "view" &&
                values &&
                columns.map((column: any) => <RenderFields key={column.id} column={column} currentMode={currentMode} values={values} submit={submit} setValues={setValues} setDateValue={setDateValue} setTimeValue={setTimeValue} translations={translations} />)}
            </Stack>
          </form>
        )}
        {currentMode == "comment" && (
          <ChatForm chatType={ChatType.RowData} id={rowData[0].id} translations={translations} />
        )}
      </DialogContent>

      <DialogActions
        sx={{
          p: "1.25rem",
          borderTop: `1px solid ${theme.palette.palette_style.border.default}`,
          justifyContent: "space-between",
        }}
      >
        {(currentMode === "update" || currentMode === "view") && (
          <Box>
            <Box
              component="span"
              className="svg-color"
              sx={{
                width: 16,
                height: 16,
                display: "inline-block",
                bgcolor: theme.palette.palette_style.text.primary,
                mask: `url(/assets/icons/header/chat.svg) no-repeat center / contain`,
                WebkitMask: `url(/assets/icons/header/chat.svg) no-repeat center / contain`,
                cursor: "pointer",
                marginRight: { xs: 0.5, md: 1.5 },
              }}
              onClick={() => {
                setCurrentMode("comment");
              }}
            />
            <Tooltip title={copySuccess}>
              <Box
                component="span"
                className="svg-color"
                sx={{
                  width: 20,
                  height: 20,
                  display: "inline-block",
                  bgcolor: theme.palette.palette_style.text.primary,
                  mask: `url(/assets/icons/copy_to_clipboard.svg) no-repeat center / contain`,
                  WebkitMask: `url(/assets/icons/copy_to_clipboard.svg) no-repeat center / contain`,
                  cursor: "pointer",
                  marginRight: { xs: 1.5, md: 4 },
                }}
                onClick={copyUrlToClipboard}
              />
            </Tooltip>
          </Box>
        )}
        {currentMode === "create" && (
          <Box
            component="span"
            className="svg-color"
            sx={{
              marginRight: { xs: 1.5, md: 4 },
            }}
          />
        )}

        <Box
          sx={{
            display: "flex",
            bottom: 0,
          }}
        >
          <Button onClick={handleCloseModal}>{t("Cancel")}</Button>
          {(currentMode === "update" || currentMode === "create") && (
            <Button
              color="primary"
              onClick={handleSubmit}
              variant="contained"
              type="submit"
            >
              {rowData.length && rowData[0].id ? t("Update Row") : t("Create New Row")}
            </Button>
          )}
          {hasPermission(currentView?.role, "Update") &&
            currentMode === "view" && (
              <Button
                color="primary"
                onClick={handleEditRow}
                variant="contained"
                type="submit"
              >
                {t("Edit")}
              </Button>
            )}
        </Box>
        <YesNoDialog
          title={t("Delete Selected Data")}
          submitText={t("Delete")}
          message={t("Sure Delete Data")}
          open={openBulkDeleteDialog}
          translations={translations}
          handleClose={() => setOpenBulkDeleteDialog(false)}
          onSubmit={() => {
            handleDelete();
          }}
        />
        <div style={{ display: "none" }}>
          <div ref={componentRef}>
            <Stack
              sx={{
                // display:'none',
                width: "100%",
                minWidth: { xs: "300px", sm: "360px", md: "400px" },
                gap: "1.5rem",
                paddingTop: 2,
              }}
            >
              {
                columns.map((column: any) => <RenderFields key={column.id} column={column} isPrint={true} currentMode={currentMode} values={rowData[0]} submit={submit} setValues={setValues} setDateValue={setDateValue} setTimeValue={setTimeValue} translations={translations} />)}
            </Stack>
          </div>
        </div>
      </DialogActions>
    </Drawer>
  );
};

const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView
});

const mapDispatchToProps = {
  setFlashMessage,
  setReadContent,
  removeReadContent
};

export default connect(mapStateToProps, mapDispatchToProps)(RowFormPanel);
