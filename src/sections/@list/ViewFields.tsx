import { useState, useEffect } from "react";
import { Box, TextField, Divider, Typography, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";
import { connect } from "react-redux";
import {
  fetchColumns,
  setColumns,
  setCurrentView,
} from "../../redux/actions/viewActions";
import Checkbox from "@mui/material/Checkbox";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from "@mui/material/Modal";
import ViewFieldForm from "./ViewFieldForm";
import { ViewField } from "src/models/ViewField";
import { filter } from "lodash";
import { View, ViewFieldConfig } from "src/models/SharedModels";
import AddColumnButton from "src/components/add-button/AddColumnButton";
import ListFields from "./ListFields";
import { reorderViewFields } from "src/services/field.service";
import { getDefaultFieldIcon } from "src/utils/flexlistHelper";
import { getFieldIcons } from "src/utils/flexlistHelper";

type ViewFieldsProps = {
  currentView: View;
  setCurrentView: (view: View) => void;
  columns: ViewField[];
  open: boolean;
  setColumns: (columns: any) => void;
  handleClose: () => void;
  fetchColumns: (viewId: number) => void;
};

const ViewFields = ({
  currentView,
  setCurrentView,
  columns,
  open,
  setColumns,
  handleClose,
  fetchColumns,
}: ViewFieldsProps) => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");

  const [searchText, setSearchText] = useState("");
  const [modalHeight, setModalHeight] = useState(0);
  const [fieldListMode, setFieldListMode] = useState<boolean>(true);
  const [selectedField, setSelectedField] = useState<ViewField>();
  const [filterColumns, setFilterColumns] = useState<ViewField[]>(columns);
  useEffect(() => {
    setSearchText("");
    searchField("");
    setTimeout(checkModalHeight, 1);
  }, [open]);

  useEffect(() => {
    // searchField("");
    checkModalHeight();
    let filterCols = filter(columns, (column) => {
      return (
        (searchText && column.name.includes(searchText)) || searchText === ""
      );
    });
    setFilterColumns(filterCols);
  }, [columns]);

  const checkModalHeight = () => {
    const modalObj = document.getElementById("fields_wrap") as HTMLDivElement;

    if (modalObj) setModalHeight(modalObj.offsetHeight);
  };

  const searchField = (search: string) => {
    var newColumns = filter(columns, (column) => {
      return (search && column.name.includes(search)) || search === "";
    });
    setFilterColumns(newColumns);
  };

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.index === source.index) {
      return;
    }
    let newColumns = Object.assign([], columns);
    const [removedColumns] = newColumns.splice(source.index, 1);
    newColumns.splice(destination.index, 0, removedColumns);
    await reorderViewFields(
      currentView.id,
      newColumns.map((x: any) => x.id)
    );
    fetchColumns(currentView.id);
  };

  const handleVisible = (value: boolean) => {
    setColumns(
      columns.map((column: any) => {
        column.viewFieldVisible = value;
        return column;
      })
    );
  };

  const changeVisible = (index: number) => {
    setColumns(
      columns.map((column: any, i: number) => {
        if (index === i) column.viewFieldVisible = !column.viewFieldVisible;
        return column;
      })
    );
  };

  const changeDetailsOnly = (index: number) => {
    let newColumns = columns.map((column: any, i: number) => {
      if (index === i)
        column.viewFieldDetailsOnly = !column.viewFieldDetailsOnly;
      return column;
    });
    setColumns(newColumns);
    let field = newColumns[index];
    if (field) {
      updateViewFieldConfig(field);
    }
  };

  const handleSearchColumns = (e: any) => {
    setSearchText(e.target.value);
    searchField(e.target.value);
  };
  const handleSelectField = (field: ViewField) => {
    setFieldListMode(false);
    setSelectedField(field);
  };
  const updateField = (field: ViewField) => {
    var newColumns = columns.map((x) => {
      return x.id === field.id ? field : x;
    });
    setColumns(newColumns);
    var newFileteColumns = filter(newColumns, (column) => {
      return (
        (searchText && column.name.includes(searchText)) || searchText === ""
      );
    });
    setFilterColumns(newFileteColumns);
    updateViewFieldConfig(field);
  };
  const updateViewFieldConfig = (field: ViewField) => {
    let newView: View = Object.assign({}, currentView);
    let viewFieldConfig: ViewFieldConfig = {
      id: field.id,
      visible: field.viewFieldVisible,
      color: field.viewFieldColor,
      name: field.viewFieldName,
      detailsOnly: field.viewFieldDetailsOnly,
      ordering: field.viewFieldOrdering,
      default: field.defaultValue,
    };
    if (newView.fields) {
      var currentViewFieldIndex = newView.fields.findIndex(
        (x) => x.id === viewFieldConfig.id
      );
      if (currentViewFieldIndex >= 0) {
        newView.fields[currentViewFieldIndex] = viewFieldConfig;
      } else {
        newView.fields.push(viewFieldConfig);
      }
    } else {
      newView.fields = [viewFieldConfig];
    }
    setCurrentView(newView);
  };
  const handleCloseModal = () => {
    setFieldListMode(true);
    handleClose();
  };
  const style = {
    position: "absolute",
    // top: `calc(50% - ${modalHeight / 2}px)`,
    top: "50%",
    transform: "translateY(-50%)",
    left: { xs: 0, md: "calc(50% - 179px)" },
    width: { xs: "100%", md: "357px" },
    backgroundColor: "white",
    py: 2,
    px: { xs: 0.5, md: 2 },
    boxShadow: "0 0 10px 10px rgba(0, 0, 0, 0.05)",
    borderRadius: "5px",
    border: "none",
    maxHeight: "95vh",
    overflow: "hidden",
  };

  const handleOpenFieldManagementPanel = () => {
    setVisibleFieldManagementPanel(true);
    handleCloseModal();
  };
  const handleCloseFieldManagementPanel = () => {
    setVisibleFieldManagementPanel(false);
  };
  const [visibleFieldManagementPanel, setVisibleFieldManagementPanel] =
    useState<boolean>(false);

  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} id="fields_wrap">
          {!fieldListMode ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
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
                    setFieldListMode(true);
                  }}
                />
              </Box>
              <Divider
                sx={{
                  my: 2,
                }}
              />
            </>
          ) : (
            <></>
          )}

          {fieldListMode ? (
            <>
              <AddColumnButton modalHandle={handleOpenFieldManagementPanel} />
              <Divider
                light
                sx={{
                  my: 2,
                }}
              />
              <Box
                sx={{
                  borderBottom: `1px solid ${theme.palette.palette_style.border.default}`,
                  paddingBottom: 1,
                  paddingTop: 0,
                  display: "flex",
                  justifyContent: "space-between",
                }}
                id="search_column_list"
              >
                <TextField
                  label="Search a field"
                  size="small"
                  type="text"
                  onChange={handleSearchColumns}
                  value={searchText}
                  sx={{ border: "none" }}
                />
                <Box
                  component="span"
                  className="svg-color add_choice"
                  sx={{
                    width: 18,
                    height: 18,
                    display: "inline-block",
                    bgcolor: theme.palette.palette_style.text.primary,
                    mask: `url(/assets/icons/table/close.svg) no-repeat center / contain`,
                    WebkitMask: `url(/assets/icons/table/close.svg) no-repeat center / contain`,
                    cursor: "pointer",
                    marginTop: 1,
                  }}
                  onClick={handleClose}
                />
              </Box>
              <Box>
                <Tooltip title="Field is visible">
                  <Box
                    component="span"
                    className="svg-color"
                    sx={{
                      width: 18,
                      height: 18,
                      display: "inline-block",
                      bgcolor: theme.palette.palette_style.text.primary,
                      //mask: `url(/assets/icons/toolbar/${action.icon}.svg) no-repeat center / contain`,
                      WebkitMask: `url(/assets/icons/toolbar/visible.svg) no-repeat center / contain`,
                      ml: 0.5,
                      mt: 2,
                    }}
                  />
                </Tooltip>
                <Tooltip title="Visible on main view, not details">
                  <Box
                    component="span"
                    className="svg-color"
                    sx={{
                      width: 18,
                      height: 18,
                      display: "inline-block",
                      bgcolor: theme.palette.palette_style.text.primary,
                      //mask: `url(/assets/icons/toolbar/${action.icon}.svg) no-repeat center / contain`,
                      WebkitMask: `url(/assets/icons/toolbar/detailsOnly.svg) no-repeat center / contain`,
                      ml: 2,
                      mt: 2,
                    }}
                  />
                </Tooltip>
              </Box>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="field_list">
                  {(provided: any) => (
                    <Box
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      sx={{
                        borderBottom: `1px solid ${theme.palette.palette_style.border.default}`,
                        py: 2,
                        maxHeight: {
                          xs: `${window.innerHeight - 320}px`,
                          // md: `${window.innerHeight - 140}px`,
                        },
                        overflow: "auto",
                      }}
                    >
                      {filterColumns.map((column: any, index: number) => {
                        let columnIcon =
                          column.icon ?? getDefaultFieldIcon(column.uiField);
                        return (
                          <Draggable
                            key={`${column.id}`}
                            draggableId={`${column.id}`}
                            index={index}
                          >
                            {(provided: any) => (
                              <Box
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  cursor: "pointer",
                                  py: 1,
                                  pr: 1,
                                }}
                              >
                                <Box
                                  flexGrow={2}
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <Checkbox
                                    checked={column.viewFieldVisible}
                                    sx={{
                                      color: "#CCCCCC",
                                      "&.Mui-checked": {
                                        color: "#54A6FB",
                                      },
                                      p: 0,
                                      marginRight: 1,
                                    }}
                                    onChange={() => {
                                      changeVisible(index);
                                    }}
                                  />
                                  <Checkbox
                                    checked={!column.viewFieldDetailsOnly}
                                    sx={{
                                      color: "#CCCCCC",
                                      "&.Mui-checked": {
                                        color: "#54A6FB",
                                      },
                                      p: 0,
                                      marginRight: 1,
                                    }}
                                    onChange={() => {
                                      changeDetailsOnly(index);
                                    }}
                                  />
                                  <Box
                                    component="span"
                                    className="svg-color"
                                    sx={{
                                      width: 18,
                                      height: 18,
                                      bgcolor: "#666",
                                      display: "inline-block",
                                      mask: `url(/assets/icons/table/${columnIcon}.svg) no-repeat center / contain`,
                                      WebkitMask: `url(/assets/icons/table/${columnIcon}.svg) no-repeat center / contain`,
                                      marginRight: 1,
                                      // marginTop: 0.5,
                                    }}
                                  />

                                  <Box
                                    sx={{ cursor: "pointer" }}
                                    flexGrow={2}
                                    onClick={() => handleSelectField(column)}
                                  >
                                    {column.viewFieldName}
                                  </Box>
                                </Box>
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
                              </Box>
                            )}
                          </Draggable>
                        );
                      })}
                    </Box>
                  )}
                </Droppable>
              </DragDropContext>
              <Box
                sx={{
                  paddingTop: 2,
                  textAlign: "center",
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "8px",
                }}
              >
                <Box
                  sx={{
                    py: 1,
                    border: `1px solid ${theme.palette.palette_style.border.default}`,
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleVisible(true);
                  }}
                >
                  Show all
                </Box>
                <Box
                  sx={{
                    py: 1,
                    border: `1px solid ${theme.palette.palette_style.border.default}`,
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleVisible(false);
                  }}
                >
                  Hide all
                </Box>
              </Box>
            </>
          ) : (
            <>
              {selectedField && (
                <ViewFieldForm
                  currentView={currentView}
                  field={selectedField}
                  onUpdate={(field) => updateField(field)}
                  onClose={() => setFieldListMode(true)}
                />
              )}
            </>
          )}
        </Box>
      </Modal>
      <ListFields
        open={visibleFieldManagementPanel}
        onClose={() => handleCloseFieldManagementPanel()}
      />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.view.columns,
  currentView: state.view.currentView,
});

const mapDispatchToProps = {
  setColumns,
  setCurrentView,
  fetchColumns,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewFields);
