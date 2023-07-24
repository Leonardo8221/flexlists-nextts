import { useState, useEffect } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Drawer,
  Box,
  FormControlLabel,
  Checkbox,
  Alert,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import InputLabel from "@mui/material/InputLabel";
import { FormControl } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { connect } from "react-redux";
import { ViewField } from "src/models/ViewField";
import { FieldUiTypeEnum } from "src/enums/SharedEnums";
import { listContentService } from "src/services/listContent.service";
import { FlexlistsError, isErr, isSucc } from "src/models/ApiResponse";
import { filter } from "lodash";
import { ErrorConsts } from "src/constants/errorConstants";
import ChatForm from "./chat/ChatForm";
import { ChatType } from "src/enums/ChatType";
import { DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { getChoiceField, getDataColumnId } from "src/utils/flexlistHelper";
import { ChoiceModel } from "src/models/ChoiceModel";
import ReactMarkdown from "react-markdown";
import WysiwygEditor from "src/components/wysiwyg/wysiwygEditor";
import { marked } from "marked";
import TurndownService from "turndown";
import MarkdownEditor from "src/components/wysiwyg/markdownEditor";
// -----ICONS------
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArchiveIcon from "@mui/icons-material/Archive";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import { FlashMessageModel } from "src/models/FlashMessageModel";
import { setFlashMessage } from "src/redux/actions/authAction";

interface RowFormProps {
  currentView: ViewField;
  rowData: any;
  columns: any[];
  open: boolean;
  mode: "view" | "create" | "update" | "comment";
  onClose: () => void;
  onSubmit: (values: any, action: string) => void;
  setFlashMessage: (message: FlashMessageModel | undefined) => void;
}

const actions = [
  {
    title: "Resize",
    icon: <FullscreenIcon />,
    action: "resize",
  },
  {
    title: "Clone",
    icon: <ContentCopyIcon />,
    action: "clone",
  },
  {
    title: "Archive",
    icon: <ArchiveIcon />,
    action: "archive",
  },
  {
    title: "Print",
    icon: <PrintIcon />,
    action: "print",
  },
  {
    title: "Delete",
    icon: <DeleteIcon />,
    action: "delete",
    color: "#c92929",
  },
];

const RowFormPanel = ({
  currentView,
  rowData,
  open,
  columns,
  mode,
  onClose,
  onSubmit,
  setFlashMessage
}: RowFormProps) => {
  const theme = useTheme();
  const [values, setValues] = useState(rowData);
  const [submit, setSubmit] = useState(false);
  const [currentMode, setCurrentMode] = useState<
    "view" | "create" | "update" | "comment"
  >(mode);
  const [windowHeight, setWindowHeight] = useState(0);
  const [error, setError] = useState<string>("");
  const [panelWidth, setPanelWidth] = useState("500px");

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    setValues(rowData);
    setSubmit(false);
    setError("");
    setCurrentMode(mode);
  }, [open, rowData, mode]);

  const handleSubmit = async () => {
    setSubmit(true);
    if (!values) setValues({ submit: true });

    let validator = true;

    if (values) {
      columns.forEach((column) => {
        if (!column.system && column.required && !values[column.id])
          validator = false;
      });
      if (validator) {
        //update row data
        if (rowData && rowData.id) {
          var updateRowRespone = await listContentService.updateContent(
            currentView.id,
            values
          );
          if (isSucc(updateRowRespone)) {
            onSubmit(values, "update");
          } else {
            setError(ErrorConsts.InternalServerError);
            return;
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
            onSubmit(values, "create");
          } else {
            setError(ErrorConsts.InternalServerError);
            return;
          }
        }

        onClose();
      }
    }
  };

  const handleAction = async (action: string) => {
    let newValues = Object.assign({}, values);
    if (action === "delete") {
      var deleteContentResponse = await listContentService.deleteContent(
        currentView.id,
        newValues.id
      );
      if (isErr(deleteContentResponse)) {
        setError(ErrorConsts.InternalServerError);
        return;
      }
    } else if (action === "resize") {
      if (panelWidth.includes("%")) {
        setPanelWidth("500px");
      } else {
        setPanelWidth("100%");
      }
      return;
    }
    else if (action === 'clone') {
      var createRowResponse = await listContentService.createContent(
        currentView.id,
        newValues
      );
      if (
        isSucc(createRowResponse) &&
        createRowResponse.data &&
        createRowResponse.data.content &&
        createRowResponse.data.content.length > 0
      ) {
        newValues.id = createRowResponse.data.content[0].id;
        newValues.createdAt = new Date().toISOString();
        newValues.updatedAt = new Date().toISOString();
      }
      else {
        setFlashMessage({ type: 'error', message: (createRowResponse as FlexlistsError).message })
        return;
      }
    }
    else if (action === 'archive') {
      var archiveField = columns.find(
        (x) => x.system && x.name === "___archived"
      );
      if (archiveField) {
        newValues[archiveField.id] = true;
      }
      var updateRowRespone = await listContentService.updateContent(
        currentView.id,
        newValues
      );
      if (isSucc(updateRowRespone)) {
        onSubmit(newValues, "update");
        onClose();
        return;
      } else {
        setFlashMessage({ type: 'error', message: (updateRowRespone as FlexlistsError).message })
        return;
      }
    }
    onSubmit(newValues, action);
    onClose();
  };

  const setDateValue = (columnId: number, date: Dayjs | Date | null) => {
    if (date == null) {
      return;
    }
    if (typeof date === "string") {
      setValues({ ...values, [columnId]: date });
      return;
    }
    setValues({ ...values, [columnId]: date.toISOString() });
  };
  const setTimeValue = (columnId: number, time: Dayjs | null) => {
    if (time == null) {
      return;
    }
    setValues({ ...values, [columnId]: time });
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
  const renderField = (column: ViewField) => {
    switch (column.uiField) {
      case FieldUiTypeEnum.Text:
        return currentMode !== "view" ? (
          <TextField
            key={column.id}
            label={column.name}
            name={`${column.id}`}
            size="small"
            type={"text"}
            onChange={(e) => {
              setValues({ ...values, [column.id]: e.target.value });
            }}
            value={values ? values[column.id] : ""}
            rows={4}
            // multiline={column.type === "textarea"}
            required={column.required}
            error={submit && column.required && !values[column.id]}
          />
        ) : (
          <div key={column.id}>
            <Typography variant="subtitle2" sx={{ textTransform: "uppercase" }}>
              {column.name}{" "}
              {/* <InfoOutlinedIcon sx={{ color: "#999", fontSize: 16 }} /> */}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
              {values ? values[column.id]?.toString() : ""}
            </Typography>
          </div>
        );
      case FieldUiTypeEnum.LongText:
        // return (<>
        //   <FormControl>
        //     <InputLabel sx={{ top: '-50px' }}>{column.name}</InputLabel>
        //     <TextareaAutosize
        //       minRows={5}
        //       key={column.id}
        //       name={`${column.id}`}
        //       aria-label={column.name}
        //       //label={column.name}
        //       value={values ? values[column.id] : ''}
        //       onChange={(e) => {
        //         setValues({ ...values, [column.id]: e.target.value })
        //       }}
        //       required={column.required}
        //     // error={submit && column.required && !values[column.id]}
        //     />
        //   </FormControl>
        // </>)
        // return <TextareaAutosize
        //   minRows={5}
        //   key={column.id}
        //   name={`${column.id}`}
        //   aria-label={column.name}
        //   //label={column.name}
        //   value={values ? values[column.id] : ''}
        //   onChange={(e) => {
        //     setValues({ ...values, [column.id]: e.target.value })
        //   }}
        //   required={column.required}
        // // error={submit && column.required && !values[column.id]}
        // />
        return currentMode !== "view" ? (
          <TextField
            key={column.id}
            label={column.name}
            name={`${column.id}`}
            size="small"
            type={"text"}
            onChange={(e) => {
              setValues({ ...values, [column.id]: e.target.value });
            }}
            value={values ? values[column.id] : ""}
            // rows={4}
            minRows={4}
            maxRows={Infinity}
            multiline={true}
            required={column.required}
            error={submit && column.required && !values[column.id]}
          />
        ) : (
          <div key={column.id}>
            <Typography variant="subtitle2" sx={{ textTransform: "uppercase" }}>
              {column.name}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
              {values ? values[column.id] : ""}
            </Typography>
          </div>
        );
      case FieldUiTypeEnum.Integer:
      case FieldUiTypeEnum.Double:
      case FieldUiTypeEnum.Decimal:
      case FieldUiTypeEnum.Float:
      //TODO : will use this for
      case FieldUiTypeEnum.Percentage:
      case FieldUiTypeEnum.Money:
        return currentMode !== "view" ? (
          <TextField
            key={column.id}
            label={column.name}
            name={`${column.id}`}
            size="small"
            type={"number"}
            onChange={(e) =>
              setValues({ ...values, [column.id]: e.target.value })
            }
            value={values[column.id]}
            rows={4}
            // multiline={column.type === "textarea"}
            required={column.required}
            error={submit && column.required && !values[column.id]}
          />
        ) : (
          <div key={column.id}>
            <Typography variant="subtitle2" sx={{ textTransform: "uppercase" }}>
              {column.name}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
              {values ? values[getDataColumnId(column.id, columns)] : ""}
            </Typography>
          </div>
        );
      case FieldUiTypeEnum.DateTime:
        return currentMode !== "view" ? (
          <LocalizationProvider dateAdapter={AdapterDayjs} key={column.id}>
            <DateTimePicker
              value={dayjs(values[column.id])}
              label={column.name}
              onChange={(x) => {
                setDateValue(column.id, x);
              }}
              className={
                submit && column.required && !values[column.id]
                  ? "Mui-error"
                  : ""
              }
            />
          </LocalizationProvider>
        ) : (
          <div key={column.id}>
            <Typography variant="subtitle1">{column.name}</Typography>
            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
              {values && values[getDataColumnId(column.id, columns)]
                ? new Date(
                  values[getDataColumnId(column.id, columns)]
                ).toLocaleString()
                : ""}
            </Typography>
          </div>
        );
      case FieldUiTypeEnum.Date:
        return currentMode !== "view" ? (
          <LocalizationProvider dateAdapter={AdapterDayjs} key={column.id}>
            <DatePicker
              value={dayjs(values[column.id])}
              label={column.name}
              onChange={(x) => {
                setDateValue(column.id, x);
              }}
              className={
                submit && column.required && !values[column.id]
                  ? "Mui-error"
                  : ""
              }
            />
          </LocalizationProvider>
        ) : (
          <div key={column.id}>
            <Typography variant="subtitle1">{column.name}</Typography>
            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
              {values && values[getDataColumnId(column.id, columns)]
                ? new Date(
                  values[getDataColumnId(column.id, columns)]
                ).toLocaleDateString()
                : ""}
            </Typography>
          </div>
        );
      case FieldUiTypeEnum.Time:
        return currentMode !== "view" ? (
          <LocalizationProvider dateAdapter={AdapterDayjs} key={column.id}>
            <TimePicker
              value={dayjs(values[column.id])}
              label={column.name}
              onChange={(x) => {
                setTimeValue(column.id, x);
              }}
              className={
                submit && column.required && !values[column.id]
                  ? "Mui-error"
                  : ""
              }
            />
          </LocalizationProvider>
        ) : (
          <div key={column.id}>
            <Typography variant="subtitle2" sx={{ textTransform: "uppercase" }}>
              {column.name}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
              {values && values[getDataColumnId(column.id, columns)]
                ? new Date(
                  values[getDataColumnId(column.id, columns)]
                ).toLocaleDateString()
                : "null"}
            </Typography>
          </div>
        );
      case FieldUiTypeEnum.Choice:
        if (currentMode !== "view") {
          return (
            <FormControl key={column.id} required={column.required}>
              <InputLabel id={`${column.id}`} sx={{ top: "-5px" }}>
                {column.name}
              </InputLabel>
              <Select
                key={column.id}
                label={column.name}
                id={`${column.id}`}
                value={values[column.id]}
                onChange={(e) =>
                  setValues({ ...values, [column.id]: e.target.value })
                }
                size="small"
                error={submit && column.required && !values[column.id]}
              >
                {column?.config?.values &&
                  column.config.values.map((choice: any) => (
                    <MenuItem
                      key={choice.id}
                      value={choice.id}
                      sx={{
                        backgroundColor: choice.color?.bg ?? "white",
                        color: choice.color?.fill ?? "black",
                        "&:hover": {
                          backgroundColor: choice.color?.bg ?? "white",
                        },
                      }}
                    >
                      {choice.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          );
        } else {
          const choice = getChoiceField(values[column.id], column);
          return (
            <div key={column.id}>
              <Typography
                variant="subtitle2"
                sx={{ textTransform: "uppercase" }}
              >
                {column.name}
              </Typography>
              <Box
                key={column.id}
                sx={{
                  // textAlign: "center",
                  bgcolor: choice?.color.bg,
                  borderRadius: "20px",
                  color: choice?.color.fill,
                  // fontFamily: choice?.font,
                  px: 1,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  width: "fit-content",
                  textOverflow: "ellipsis",
                }}
              >
                {choice?.label}
              </Box>
            </div>
          );
        }
      case FieldUiTypeEnum.Boolean:
        return currentMode !== "view" ? (
          <FormControlLabel
            key={column.id}
            control={
              <Checkbox
                checked={values[column.id]}
                onChange={(e) =>
                  setValues({ ...values, [column.id]: e.target.checked })
                }
              />
            }
            label={column.name}
          />
        ) : (
          <div key={column.id}>
            <Typography variant="subtitle2" sx={{ textTransform: "uppercase" }}>
              {column.name}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
              {(values && values[column.id]?.toString() === 'true') ? "yes" : "no"}
            </Typography>
          </div>
        );
      case FieldUiTypeEnum.Markdown:
        return currentMode !== "view" ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              position: "relative",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                textTransform: "capitalize",
                color: "rgba(0, 0, 0, 0.6)",
                fontSize: "12px",
                position: "absolute",
                top: "-10px",
                left: "12px",
                background: "#fff",
              }}
            >
              {column.name}
            </Typography>
            <MarkdownEditor
              markdown={values[column.id]}
              setMarkdown={(newValue) => {
                setValues({ ...values, [column.id]: newValue });
              }}
            />
          </Box>
        ) : (
          <div key={column.id}>
            <Typography variant="subtitle2" sx={{ textTransform: "uppercase" }}>
              {column.name}
            </Typography>
            <ReactMarkdown>{values[column.id]}</ReactMarkdown>
          </div>
        );
      case FieldUiTypeEnum.HTML:
        return currentMode !== "view" ? (
          <></>
        ) : (
          <div key={column.id}>
            <Typography variant="subtitle2" sx={{ textTransform: "uppercase" }}>
              {column.name}
            </Typography>
            <div
              dangerouslySetInnerHTML={{
                __html: values[column.id]?.toString(),
              }}
            />
          </div>
        );
      default:
        return <div key={column.id}></div>;
    }
  };
  const handleCloseModal = () => {
    setCurrentMode("view");
    onClose();
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
          height: `${windowHeight}px`,
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
          Create New Row
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
          {actions.map((action: any) => (
            <Box
              key={action.title}
              sx={{
                display: "flex",
                cursor: "pointer",
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
                      action.color || theme.palette.palette_style.text.primary,
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
                      action.color || theme.palette.palette_style.text.primary,
                  }}
                >
                  {action.title}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      <DialogContent>
        {currentMode !== "comment" && (
          <form onSubmit={(e) => e.preventDefault()} id="new_row_form">
            <Stack>
              <Box>{error && <Alert severity="error">{error}</Alert>}</Box>
            </Stack>
            <Stack
              sx={{
                width: "100%",
                minWidth: { xs: "300px", sm: "360px", md: "400px" },
                gap: "1.5rem",
                paddingTop: 2,
              }}
            >
              {currentMode !== "view" &&
                values &&
                filter(columns, (x) => !x.system).map((column: any) =>
                  renderField(column)
                )}
              {currentMode === "view" &&
                values &&
                columns.map((column: any) => renderField(column))}
            </Stack>
          </form>
        )}
        {currentMode == "comment" && (
          <ChatForm chatType={ChatType.RowData} id={rowData.id} />
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
              marginRight: { xs: 1.5, md: 4 },
            }}
            onClick={() => {
              setCurrentMode("comment");
            }}
          />
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

        <Box sx={{ display: "flex" }}>
          <Button onClick={handleCloseModal}>Cancel</Button>
          {(currentMode === "update" || currentMode === "create") && (
            <Button
              color="primary"
              onClick={handleSubmit}
              variant="contained"
              type="submit"
            >
              {rowData && rowData.id ? "Update Row" : "Create New Row"}
            </Button>
          )}
          {currentMode === "view" && (
            <Button
              color="primary"
              onClick={handleEditRow}
              variant="contained"
              type="submit"
            >
              Edit
            </Button>
          )}
        </Box>
      </DialogActions>
    </Drawer>
  );
};

const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
});

const mapDispatchToProps = {
  setFlashMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(RowFormPanel);
