import { useState, useEffect } from "react";
import {
  DialogContent,
  Drawer,
  Box,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { fetchFields, setFields } from "src/redux/actions/listActions";
import { Field, FlatWhere, Sort, View } from "src/models/SharedModels";
import FieldFormPanel from "./FieldFormPanel";
import { FieldType, SearchType } from "src/enums/SharedEnums";
import { fieldService } from "src/services/field.service";
import { isErr } from "src/models/ApiResponse";
import { ErrorConsts } from "src/constants/errorConstants";
import { filter } from "lodash";
import { fetchColumns, fetchRows } from "src/redux/actions/viewActions";
interface ListFieldsProps {
  currentView: View;
  fields: Field[];
  filters: FlatWhere[];
  sorts: Sort[];
  page?: number;
  limit?: number;
  fetchColumns: (viewId: number) => void;
  fetchRows: (
    type: SearchType,
    viewId?: number,
    page?: number,
    limit?: number,
    conditions?: FlatWhere[],
    sorts?: Sort[],
    query?: Query
  ) => void;
  setFields: (fields: Field[]) => void;
  fetchFields: (viewId: number) => void;
  open: boolean;
  onClose: () => void;
}

const ListFields = ({
  currentView,
  fields,
  setFields,
  fetchFields,
  open,
  onClose,
  filters,
  sorts,
  page,
  limit,
  fetchColumns,
  fetchRows,
}: ListFieldsProps) => {
  const theme = useTheme();
  const [fieldManagementMode, setFieldManagementMode] = useState<boolean>(true);
  const [windowHeight, setWindowHeight] = useState(0);
  const newField: Field = {
    id: 0,
    listId: currentView.listId,
    name: "",
    ordering: 0,
    required: false,
    type: FieldType.Text,
    description: "",
    detailsOnly: false,
    maximum: undefined,
    minimum: undefined,
    icon: "",
    config: {},
    system: false,
    deleted: false,
    indexed: false,
    defaultValue: "",
  };
  const [selectedField, setSelectedField] = useState<Field>(newField);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    if (open) {
      fetchFields(currentView.id);
    }
  }, [open]);

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.index === result.source.index) {
      return;
    }
    var newFields = reorder(fields, source.index, destination.index);
    setFields(newFields);
    // const [removed] = fields.splice(source.index, 1);
    // fields.splice(destination.index, 0, removed);
    // setFields(fields);

    // const [removedColumns] = fields.splice(source.index, 1);
    // fields.splice(destination.index, 0, removedColumns);
    // setFields([...fields]);
  };
  const reloadViewData = () => {
    fetchColumns(currentView.id);
    fetchRows(SearchType.View, currentView.id, page, limit, filters, sorts);
  };
  const handleAddField = () => {
    setSelectedField({ ...newField, listId: currentView.listId });
    setFieldManagementMode(false);
  };
  const addField = (field: Field) => {
    setFields([...fields, field]);
    reloadViewData();
  };
  const handleUpdateField = (field: Field) => {
    setSelectedField(field);
    setFieldManagementMode(false);
  };
  const updateField = (field: Field) => {
    setFields(
      fields.map((x) => {
        return x.id === field.id ? field : x;
      })
    );
    reloadViewData();
  };
  const handleDeleteField = async (fieldId: number) => {
    var deleteFieldResponse = await fieldService.deleteField(
      currentView.id,
      fieldId
    );
    if (isErr(deleteFieldResponse)) {
      setError(ErrorConsts.InternalServerError);
      return;
    }
    setFields(fields.filter((field: any) => field.id !== fieldId));
    reloadViewData();
  };
  const handleCloseModal = () => {
    setFieldManagementMode(true);
    onClose();
  };
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleCloseModal}
      PaperProps={{
        sx: {
          width: { xs: "100%", lg: "500px" },
          border: "none",
          height: `${windowHeight}px`,
          backgroundColor: theme.palette.palette_style.background.default,
          p: 2,
          minHeight: "100%",
        },
      }}
    >
      {!fieldManagementMode ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            component="span"
            className="svg-color"
            sx={{
              width: 18,
              height: 18,
              display: "inline-block",
              bgcolor: theme.palette.palette_style.text.primary,
              mask: `url(/assets/icons/arrow_back.svg) no-repeat center / contain`,
              WebkitMask: `url(/assets/icons/arrow_back.svg) no-repeat center / contain`,
              cursor: "pointer",
            }}
            onClick={() => {
              setFieldManagementMode(true);
            }}
          />
          <Typography variant="h6" component={"div"}>
            {selectedField.id ? "Update Field" : "Create Field"}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component={"div"}>
            Manage fields
          </Typography>
          <Button variant="contained" onClick={() => handleAddField()}>
            New Field
          </Button>
        </Box>
      )}

      <Divider sx={{ my: 2 }}></Divider>
      <DialogContent
        sx={{ p: 0, maxHeight: { xs: "calc(100vh - 136px)", md: "auto" } }}
      >
        {fieldManagementMode ? (
          <>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="field_list">
                {(provided: any) => (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{
                      py: 2,
                      maxHeight: `${window.innerHeight - 140}px`,
                      overflow: "hidden",
                      minHeight: "360px",
                    }}
                  >
                    {filter(fields, (x) => !x.system).map(
                      (field: any, index: number) => (
                        <Draggable
                          key={field.id}
                          draggableId={`${field.id}`}
                          index={index}
                        >
                          {(provided: any) => (
                            <Box
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: { xs: 1, md: 2 },
                                cursor: "pointer",
                                py: 2,
                                px: 1,
                                "&:hover": {
                                  backgroundColor: "#fafafa",
                                },
                              }}
                            >
                              <Box
                                component="span"
                                className="svg-color"
                                sx={{
                                  width: 14,
                                  height: 14,
                                  display: "inline-block",
                                  bgcolor:
                                    theme.palette.palette_style.text.primary,
                                  mask: `url(/assets/icons/toolbar/drag_indicator.svg) no-repeat center / contain`,
                                  WebkitMask: `url(/assets/icons/toolbar/drag_indicator.svg) no-repeat center / contain`,
                                }}
                              />
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  width: "100%",
                                  alignItems: "center",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Box
                                    component="span"
                                    className="svg-color"
                                    sx={{
                                      width: 15,
                                      height: 15,
                                      display: "inline-block",
                                      bgcolor:
                                        theme.palette.palette_style.text
                                          .primary,
                                      mask: `url(/assets/icons/table/${field.icon}.svg) no-repeat center / contain`,
                                      WebkitMask: `url(/assets/icons/table/${field.icon}.svg) no-repeat center / contain`,
                                      marginRight: 1,
                                    }}
                                  />
                                  <Box
                                    component={"span"}
                                    sx={{
                                      fontFamily: "Poppins",
                                      maxWidth: { xs: "150px", md: "200px" },
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {field.name}
                                  </Box>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: { xs: 1, md: 3 },
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      cursor: "pointer",
                                      fontWeight: 500,
                                      color: "primary.main",
                                    }}
                                    onClick={() => handleUpdateField(field)}
                                  >
                                    <EditIcon />
                                    <Typography
                                      variant="subtitle2"
                                      component={"span"}
                                      sx={{
                                        display: {
                                          xs: "none",
                                          md: "block",
                                        },
                                      }}
                                    >
                                      Edit
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      gap: 1,
                                      alignItems: "center",
                                      cursor: "pointer",
                                      color: "#eb2027",
                                      fontWeight: 500,
                                    }}
                                    onClick={() => handleDeleteField(field.id)}
                                  >
                                    <DeleteIcon />
                                    <Typography
                                      variant="subtitle2"
                                      component={"span"}
                                      sx={{
                                        display: {
                                          xs: "none",
                                          md: "block",
                                        },
                                      }}
                                    >
                                      Delete
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          )}
                        </Draggable>
                      )
                    )}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
          </>
        ) : (
          <FieldFormPanel
            viewId={currentView.id}
            field={selectedField}
            onAdd={(field) => addField(field)}
            onUpdate={(field) => updateField(field)}
            onDelete={(id) => handleDeleteField(id)}
            onClose={() => setFieldManagementMode(true)}
          />
        )}
      </DialogContent>
      {!fieldManagementMode ? (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            px: { xs: 1, md: 3 },
            marginTop: 4,
            paddingBottom: 2,
            borderBottom: `1px solid ${theme.palette.palette_style.border.default}`,
          }}
        ></Box>
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button variant="outlined" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="contained" onClick={() => handleAddField()}>
              New Field
            </Button>
          </Box>
        </>
      )}
    </Drawer>
  );
};

const mapStateToProps = (state: any) => ({
  fields: state.list.fields,
  currentView: state.view.currentView,
  filters: state.view.filters,
  sorts: state.view.sorts,
  page: state.view.page,
  limit: state.view.limit,
});

const mapDispatchToProps = {
  setFields,
  fetchFields,
  fetchRows,
  fetchColumns,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListFields);
