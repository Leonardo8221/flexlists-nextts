import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { connect } from "react-redux";
import { fetchRows, setCurrentView } from "../../redux/actions/viewActions";
import useResponsive from "../../hooks/useResponsive";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import { FieldType, SearchType } from "src/enums/SharedEnums";
import { FlatWhere, Query, Sort, View } from "src/models/SharedModels";
import { getColumn, getDefaultFieldIcon } from "src/utils/flexlistHelper";

type SortProps = {
  currentView: View;
  setCurrentView: (view: View) => void;
  columns: any;
  open: boolean;
  handleClose: () => void;
  fetchRows: () => void;
};

const SortPage = ({
  columns,
  currentView,
  setCurrentView,
  open,
  handleClose,
  fetchRows,
}: SortProps) => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const handleSorts = (index: number, key: string, value: string) => {
    let newCurrentView: View = Object.assign({}, currentView);
    newCurrentView.order = currentView.order?.map((sort: any, i: number) => {
      if (index === i) sort[key] = value;
      return sort;
    });
    setCurrentView(newCurrentView);
  };

  const removeSort = (index: number) => {
    let newCurrentView: View = Object.assign({}, currentView);
    newCurrentView.order = currentView.order?.filter(
      (sort: any, i: number) => i !== index
    );
    setCurrentView(newCurrentView);
  };
  
  const getSorDirections = (sort: any): { key: string; value: string }[] => {
    var column = getColumn(sort.fieldId,columns);
    var directions: { key: string; value: string }[] = [
      {
        key: "asc",
        value: "First-Last",
      },
      {
        key: "desc",
        value: "Last-First",
      },
    ];
    switch (column?.type) {
      case FieldType.Text:
        directions = [
          {
            key: "asc",
            value: "A-Z",
          },
          {
            key: "desc",
            value: "Z-A",
          },
        ];
        break;
      default:
        break;
    }
    return directions;
  };
  const addSort = () => {
    if (columns.length == 0) {
      return;
    }
    let newCurrentView: View = Object.assign({}, currentView);
    if (newCurrentView.order) {
      newCurrentView.order.push({
        fieldId: columns[0].id,
        direction: "asc",
      });
    } else {
      newCurrentView.order = [
        {
          fieldId: columns[0].id,
          direction: "asc",
        },
      ];
    }
    setCurrentView(newCurrentView);
  };
  const onsubmit = async () => {
    fetchRows();
    handleClose();
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "100%", md: "450px" },
    backgroundColor: "white",
    py: 2,
    px: { xs: 0.5, md: 2 },
    boxShadow: "0 0 10px 10px rgba(0, 0, 0, 0.05)",
    borderRadius: "5px",
    border: "none",
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            borderBottom: `1px solid ${theme.palette.palette_style.border.default}`,
            paddingBottom: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle2">Sort by</Typography>
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
            }}
            onClick={handleClose}
          />
        </Box>
        {currentView.order && currentView.order.length > 0 && (
          <Box
            sx={{
              borderBottom: `1px solid ${theme.palette.palette_style.border.default}`,
              py: 2,
              maxHeight: `${windowHeight - 100}px`,
              overflow: "auto",
            }}
          >
            {currentView.order.length &&
              currentView.order.map((sort: any, index: number) => (
                <Box
                  key={sort.column}
                  sx={{ marginBottom: 1, display: "flex" }}
                >
                  <Select
                    value={sort.fieldId}
                    onChange={(e) => {
                      handleSorts(index, "fieldId", e.target.value);
                    }}
                    size="small"
                    sx={{ width: { md: "168px" }, textTransform: "capitalize" }}
                    className="sort_column"
                  >
                    {columns.map((column: any) => {
                      let coloumIcon =
                      column.icon ?? getDefaultFieldIcon(column.uiField);
                      return (
                      <MenuItem
                        key={column.id}
                        value={column.id}
                        sx={{ display: "flex" }}
                      >
                        <Box
                          component="span"
                          className="svg-color"
                          sx={{
                            width: 14,
                            height: 14,
                            display: "inline-block",
                            bgcolor: theme.palette.palette_style.text.primary,
                            mask: `url(/assets/icons/table/column/${coloumIcon}.svg) no-repeat center / contain`,
                            WebkitMask: `url(/assets/icons/table/column/${coloumIcon}.svg) no-repeat center / contain`,
                            marginRight: 1,
                          }}
                        />
                        <Box>{column.name}</Box>
                      </MenuItem>
                    )})}
                  </Select>
                  <Select
                    value={sort.direction}
                    onChange={(e) => {
                      handleSorts(index, "direction", e.target.value);
                    }}
                    size="small"
                    sx={{
                      width: { md: "168px" },
                      marginLeft: { xs: "8px", md: "30px" },
                    }}
                  >
                    {getSorDirections(sort).map((direction: any) => (
                      <MenuItem key={direction.key} value={direction.key}>
                        {direction.value}
                      </MenuItem>
                    ))}
                  </Select>
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
                      marginTop: 1.4,
                      marginLeft: { xs: "8px", md: "30px" },
                    }}
                    onClick={() => {
                      removeSort(index);
                    }}
                  />
                </Box>
              ))}
          </Box>
        )}

        <Box
          sx={{
            paddingTop: 2,
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="span"
              className="svg-color"
              sx={{
                width: 14,
                height: 14,
                display: "inline-block",
                bgcolor: theme.palette.palette_style.text.selected,
                mask: `url(/assets/icons/table/plus.svg) no-repeat center / contain`,
                WebkitMask: `url(/assets/icons/table/plus.svg) no-repeat center / contain`,
                cursor: "pointer",
                marginRight: 1,
              }}
            />
            <Box
              sx={{ color: theme.palette.palette_style.text.selected }}
              onClick={addSort}
            >
              Add another sort
            </Box>
          </Box>
          <Button
            sx={{ ml: 10 }}
            variant="contained"
            onClick={() => onsubmit()}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.view.columns,
  currentView: state.view.currentView,
});

const mapDispatchToProps = {
  setCurrentView,
  fetchRows,
};

export default connect(mapStateToProps, mapDispatchToProps)(SortPage);
