import { useMemo, useState, useEffect, useRef, useReducer } from "react";
import {
  Box,
  Stack,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MaterialReactTable, {
  MRT_ToggleFiltersButton,
  MRT_TableInstance,
  MRT_Virtualizer,
} from "material-react-table";
import Pagination from "@mui/material/Pagination";
import RowFormPanel from "./RowFormPanel";
import useResponsive from "../../hooks/useResponsive";
import { connect } from "react-redux";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  fetchColumns,
  fetchRowsByPage,
  setCurrentView,
  setRows,
} from "src/redux/actions/viewActions";
import { View } from "src/models/SharedModels";
import { FieldType, FieldUiTypeEnum } from "src/enums/SharedEnums";
import { useRouter } from "next/router";
import { ViewField } from "src/models/ViewField";
import { filter } from "lodash";
import ListFields from "./ListFields";
import { downloadFileUrl, getChoiceField } from "src/utils/flexlistHelper";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";

import PrintIcon from "@mui/icons-material/Print";

import DeleteIcon from "@mui/icons-material/Delete";
import { hasPermission } from "src/utils/permissionHelper";
import {
  archiveBulkContents,
  cloneContent,
  createContent,
  deleteBulkContents,
  unarchiveBulkContents,
} from "src/services/listContent.service";
import { FlexlistsError, isErr, isSucc } from "src/models/ApiResponse";
import { FlashMessageModel } from "src/models/FlashMessageModel";
import { setFlashMessage } from "src/redux/actions/authAction";
import YesNoDialog from "src/components/dialog/YesNoDialog";
import { useReactToPrint } from "react-to-print";
import PrintDataTable from "./PrintDataTable";
import sanitizeHtml from "sanitize-html";

type DataTableProps = {
  tab: boolean;
  currentView: View;
  columns: ViewField[];
  rows: any[];
  setRows: (columns: any) => void;
  count: number;
  fetchRowsByPage: (page?: number, limit?: number) => void;
  setCurrentView: (view: View) => void;
  setFlashMessage: (message: FlashMessageModel) => void;
};

const DataTable = ({
  tab,
  currentView,
  columns,
  rows,
  setRows,
  count,
  fetchRowsByPage,
  setCurrentView,
  setFlashMessage,
}: DataTableProps) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const router = useRouter();
  const isDesktop = useResponsive("up", "lg");
  const isMobile = useResponsive("down", "md");
  const [visibleAddRowPanel, setVisibleAddRowPanel] = useState(false);
  const [visibleFieldManagementPanel, setVisibleFieldManagementPanel] =
    useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: currentView.limit ?? 25,
  });
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const [updatingTable, setUpdatingTable] = useState(false);
  const tableInstanceRef = useRef<MRT_TableInstance<any>>(null);
  const rerender = useReducer(() => ({}), {})[1];
  const [windowHeight, setWindowHeight] = useState(0);
  const [mode, setMode] = useState<"view" | "create" | "update" | "comment">(
    "view"
  );
  const [openBulkDeleteDialog, setOpenBulkDeleteDialog] = useState(false);
  const [printRows, setPrintRows] = useState<any[]>([]);
  const bulkActions = [
    {
      title: "Clone",
      icon: <ContentCopyIcon sx={{ width: { xs: 16, lg: 20 } }} />,
      action: "clone",
      allowed: hasPermission(currentView?.role, "Update"),
    },
    {
      title: "Archive",
      icon: <ArchiveIcon sx={{ width: { xs: 16, lg: 20 } }} />,
      action: "archive",
      allowed: hasPermission(currentView?.role, "Update"),
    },
    {
      title: "Unarchive",
      icon: <UnarchiveIcon sx={{ width: { xs: 16, lg: 20 } }} />,
      action: "unarchive",
      allowed: hasPermission(currentView?.role, "Update"),
    },
    {
      title: "Print",
      icon: <PrintIcon sx={{ width: { xs: 16, lg: 20 } }} />,
      action: "print",
      allowed: hasPermission(currentView?.role, "Read"),
    },
    {
      title: "Delete",
      icon: <DeleteIcon sx={{ width: { xs: 16, lg: 20 } }} />,
      action: "delete",
      color: "#c92929",
      allowed: hasPermission(currentView?.role, "Delete"),
    },
  ];

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    if (Object.keys(rowSelection).length) {
      // setSelectedRowData(
      //   rows[parseInt(Object.keys(rowSelection).pop() || "0")]
      // );
      setPrintRows(
        Object.keys(rowSelection).map((key: any) => {
          let row = rows.find((row) => row.id === parseInt(key));
          if (row) {
            return row;
          }
        })
      );
    }
  }, [rows, rowSelection]);

  const getColumnKey = (column: any): string => {
    if (
      column.system &&
      (column.name === "id" ||
        column.name === "createdAt" ||
        column.name === "updatedAt")
    ) {
      return column.name;
    }
    return column.id;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getColumns = (dataColumns: any[]) => {
    return dataColumns.map((dataColumn: any) => {
      var dataColumnType = dataColumn.type;
      let uiFieldType = dataColumn.uiField;
      return {
        accessorKey: `${getColumnKey(dataColumn)}`,
        header: dataColumn.viewFieldName,
        Header: ({ column }: any) => (
          <Box sx={{ display: "flex" }} key={column.id}>
            {dataColumn.icon && (
              <Box
                component="span"
                className="svg-color"
                sx={{
                  width: 16,
                  height: 16,
                  display: "inline-block",
                  bgcolor: theme.palette.palette_style.text.primary,
                  mask: `url(/assets/icons/table/column/${dataColumn.icon}.svg) no-repeat center / contain`,
                  WebkitMask: `url(/assets/icons/table/column/${dataColumn.icon}.svg) no-repeat center / contain`,
                  marginTop: 0.5,
                  marginRight: 1,
                }}
              />
            )}

            <Box
              sx={{
                minWidth: "100px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {column.columnDef.header}
            </Box>
          </Box>
        ),
        Cell: ({ renderedCellValue, row }: any) => {
          function renderFieldData(
            columnType: FieldUiTypeEnum,
            cellValue: any
          ) {
            switch (columnType) {
              case FieldUiTypeEnum.Integer:
              case FieldUiTypeEnum.Float:
              case FieldUiTypeEnum.Decimal:
              case FieldUiTypeEnum.Double:
              case FieldUiTypeEnum.Money:
              case FieldUiTypeEnum.Percentage:
                return (
                  <Box
                    key={row.id}
                    sx={{
                      minWidth: "100px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {cellValue}
                  </Box>
                );

              case FieldUiTypeEnum.DateTime:
                return (
                  <Box
                    key={row.id}
                    sx={{
                      minWidth: "100px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {cellValue && cellValue != null
                      ? new Date(cellValue).toLocaleString()
                      : ""}
                  </Box>
                );
              case FieldUiTypeEnum.Date:
                return (
                  <Box
                    key={row.id}
                    sx={{
                      minWidth: "100px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {cellValue && cellValue != null
                      ? new Date(cellValue).toLocaleDateString()
                      : ""}
                  </Box>
                );
              case FieldUiTypeEnum.Time:
                return (
                  <Box
                    key={row.id}
                    sx={{
                      minWidth: "100px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {cellValue && cellValue != null
                      ? new Date(cellValue).toLocaleString()
                      : ""}
                  </Box>
                );
              case FieldUiTypeEnum.Text:
              case FieldUiTypeEnum.LongText:
              case FieldUiTypeEnum.HTML:
                return (
                  <Box
                    key={row.id}
                    sx={{
                      minWidth: "100px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {sanitizeHtml(cellValue.replace(/</g, " <"), {
                      allowedTags: [],
                    })}
                  </Box>
                );
              case FieldUiTypeEnum.Markdown:
                return (
                  <Box
                    key={row.id}
                    sx={{
                      minWidth: "100px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {cellValue}
                  </Box>
                );
              case FieldUiTypeEnum.Choice:
                const choice = getChoiceField(cellValue, dataColumn);
                return (
                  <Box
                    key={row.id}
                    sx={{
                      textAlign: "center",
                      bgcolor: choice?.color?.bg,
                      borderRadius: "20px",
                      color: choice?.color?.fill,
                      fontFamily: choice?.font,
                      px: 1.5,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {choice?.label}
                  </Box>
                );
              case FieldUiTypeEnum.Boolean:
                return (
                  <Box
                    key={row.id}
                    sx={{
                      minWidth: "100px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {/* {cellValue?.toString() === "true" ? "yes" : "no"} */}
                    <FormGroup>
                      <FormControlLabel
                        disabled
                        control={<Switch checked={cellValue} />}
                        label={cellValue?.toString() === "true" ? "Yes" : "No"}
                      />
                    </FormGroup>
                  </Box>
                );
              case FieldUiTypeEnum.Image:
                return (
                  <Box
                    component="img"
                    sx={{
                      // height: 100,
                      width: 100,
                      // maxHeight: { xs: 233, md: 167 },
                      // maxWidth: { xs: 350, md: 250 },
                    }}
                    alt=""
                    src={
                      cellValue && cellValue.fileId
                        ? downloadFileUrl(cellValue.fileId)
                        : ""
                    }
                  />
                );
              case FieldUiTypeEnum.Video:
                return (
                  <Box
                    component="video"
                    sx={{
                      // height: 100,
                      width: 100,
                      // maxHeight: { xs: 233, md: 167 },
                      // maxWidth: { xs: 350, md: 250 },
                    }}
                    src={
                      cellValue && cellValue.fileId
                        ? downloadFileUrl(cellValue.fileId)
                        : ""
                    }
                  />
                );
              case FieldUiTypeEnum.Document:
                return (
                  <Box
                    key={row.id}
                    sx={{
                      minWidth: "100px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {cellValue?.fileName}
                  </Box>
                );
              // return cellValue? (
              //   <Link href={downloadFileUrl(cellValue.fileId)}>{cellValue.fileName}</Link>
              // ):(<></>)
              default:
                return <></>;
            }
          }
          return renderFieldData(uiFieldType, renderedCellValue);
        },
        minSize: dataColumn.type === "id" ? 100 : 150,
        maxSize: dataColumn.type === "id" ? 100 : 400,
        size: dataColumn.type === "id" ? 100 : 200,
        filterFn: (row: any, id: number, filterValue: string) =>
          row.getValue(id).toLowerCase().includes(filterValue.toLowerCase()),
      };
    });
  };

  const columnsTable = useMemo<any>(() => {
    setUpdatingTable(true);

    const shouldShowField = (column: any) => {
      return (
        (column.viewFieldVisible === true ||
          column.viewFieldVisible === undefined) &&
        ((!column.detailsOnly && column.viewFieldDetailsOnly === undefined) ||
          column.viewFieldDetailsOnly === false)
      );
    };

    return getColumns(columns.filter((column: any) => shouldShowField(column)));
  }, [columns]);

  useEffect(() => {
    setUpdatingTable(false);
  }, [columnsTable]);

  const handleRowAction = (values: any, action: string) => {
    fetchColumns(currentView.id);
    fetchRowsByPage(currentView.page, currentView.limit ?? 25);
    return;
    // if (action === "create" || action === "clone") {
    //   var newRows = Object.assign([], rows);
    //   newRows.push(values);
    //   setRows(newRows);
    // } else if (action === "update") {
    //   setRows(rows.map((row: any) => (row.id === values.id ? values : row)));
    // } else if (action === "delete") {
    //   setRows(rows.filter((row: any) => row.id !== values.id));
    // } else {
    // }
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPagination({
      ...pagination,
      pageIndex: value - 1,
    });
    var newView: View = Object.assign({}, currentView);
    newView.page = value - 1;
    setCurrentView(newView);
    fetchRowsByPage(newView.page, newView.limit ?? 25);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setPagination({
      pageIndex: 0,
      pageSize: parseInt(event.target.value, 10),
    });
    var newView: View = Object.assign({}, currentView);
    newView.page = 0;
    newView.limit = parseInt(event.target.value, 10);
    setCurrentView(newView);
    fetchRowsByPage(0, newView.limit);
  };

  const handleNewRowPanel = () => {
    var newValues: any = {};
    setMode("create");
    for (const column of filter(columns, (x) => !x.system)) {
      var defaultValue: any = "";
      switch (column.type) {
        case FieldType.Date:
        case FieldType.DateTime:
        case FieldType.Time:
          defaultValue = new Date().toISOString();
          break;
        case FieldType.Choice:
          defaultValue = column.config?.values[0]?.label;
          break;
        case FieldType.Boolean:
          defaultValue = false;
          break;
        default:
          break;
      }
      newValues[column.id] = defaultValue;
    }
    setVisibleAddRowPanel(true);
    setSelectedRowData(newValues);
    setRowSelection({});
  };

  const editRow = (row: any) => {
    setMode("view");
    setSelectedRowData(rows[row.index]);
    setVisibleAddRowPanel(true);
  };
  const handleOpenFieldManagementPanel = () => {
    setVisibleFieldManagementPanel(true);
  };
  const handleCloseFieldManagementPanel = () => {
    setVisibleFieldManagementPanel(false);
  };
  const rowVirtualizerInstanceRef =
    useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);

  const handleBulkAction = async (action: string) => {
    switch (action) {
      case "clone":
        let cloneResponse = await cloneContent(
          currentView.id,
          Object.keys(rowSelection).map((key: any) => {
            let row = rows.find((row) => row.id === parseInt(key));
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
        if (isSucc(cloneResponse)) {
          setFlashMessage({ message: "Cloned successfully", type: "success" });
          setRowSelection({});
        } else {
          setFlashMessage({
            message: (cloneResponse as FlexlistsError).message,
            type: "error",
          });
          setRowSelection({});
          return;
        }
        break;
      case "archive":
        let archiveResponse = await archiveBulkContents(
          currentView.id,
          Object.keys(rowSelection).map((key: any) => parseInt(key))
        );
        if (isSucc(archiveResponse)) {
          setFlashMessage({
            message: "Archived successfully",
            type: "success",
          });
          setRowSelection({});
        } else {
          setFlashMessage({
            message: (archiveResponse as FlexlistsError).message,
            type: "error",
          });
          setRowSelection({});
          return;
        }
        break;
      case "unarchive":
        let unarchiveResponse = await unarchiveBulkContents(
          currentView.id,
          Object.keys(rowSelection).map((key: any) => parseInt(key))
        );
        if (isSucc(unarchiveResponse)) {
          setFlashMessage({
            message: "Unarchived successfully",
            type: "success",
          });
          setRowSelection({});
        } else {
          setFlashMessage({
            message: (unarchiveResponse as FlexlistsError).message,
            type: "error",
          });
          setRowSelection({});
          return;
        }
        break;
      case "print":
        handlePrint();
        return;
      case "delete":
        setOpenBulkDeleteDialog(true);
        return;
      default:
        break;
    }
    fetchRowsByPage(currentView.page, currentView.limit ?? 25);
  };
  const handleBulkDelete = async () => {
    let deleteResponse = await deleteBulkContents(
      currentView.id,
      Object.keys(rowSelection).map((key: any) => parseInt(key))
    );
    if (isSucc(deleteResponse)) {
      setFlashMessage({ message: "Deleted successfully", type: "success" });
      setRowSelection({});
    } else {
      setFlashMessage({
        message: (deleteResponse as FlexlistsError).message,
        type: "error",
      });
      setRowSelection({});
      return;
    }

    fetchRowsByPage(currentView.page, currentView.limit ?? 25);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <Box
        sx={{
          width: { xs: "100vw", lg: "100%" },
          overFlow: "scroll",
          height: {
            xs: "calc(100vh - 234px)",
            md: "inherit",
          },
        }}
        id="datatable_wrap"
      >
        {tableInstanceRef.current && showColumnFilters && (
          <MRT_ToggleFiltersButton
            table={tableInstanceRef.current}
            sx={{
              position: "absolute",
              zIndex: 3,
              top: isDesktop ? "195px" : tab ? "303px" : "257px",
              left: { xs: 0, md: "100px" },
              backgroundColor:
                theme.palette.palette_style.background.table_header_footer,
              borderRadius: 0,
              paddingLeft: "15px",
              "&:hover": {
                backgroundColor:
                  theme.palette.palette_style.background.table_header_footer,
              },
            }}
          />
        )}
        {/* <Box
        sx={{
          position: "absolute",
          right: 0,
          zIndex: 3,
          textAlign: "center",
          paddingTop: "10px",
          height: "40px",
          width: "40px",
          backgroundColor:
            theme.palette.palette_style.background.table_header_footer,
          borderBottom: "1px solid",
          borderColor: theme.palette.palette_style.border.default,
          borderTop: "none",
        }}
      >
        <AddColumnButton modalHandle={handleOpenFieldManagementPanel} />
      </Box> */}
        {!updatingTable && (
          <MaterialReactTable
            tableInstanceRef={tableInstanceRef}
            columns={columnsTable}
            data={rows}
            enableStickyHeader={true}
            muiTableContainerProps={{
              sx: {
                height: {
                  // xs: `${windowHeight - (!tab ? 255 : 301)}px`,
                  xs: "calc(100vh - 236px)",
                  md: "calc(100vh - 200px)",
                  lg: "calc(100vh - 188px)",
                },
                width: { lg: "100vw" },
                minHeight: "300px",
                "& .MuiTableHead-root": {
                  width: "100%",
                },
                "& .MuiTableRow-root": {
                  boxShadow: "none",
                },
              },
            }}
            enableRowSelection={true}
            enableTopToolbar={false}
            enableBottomToolbar={false}
            enablePagination={true}
            enableColumnResizing
            // enableRowNumbers
            //enableRowVirtualization
            //enableColumnVirtualization
            // enableMultiRowSelection={false}
            rowVirtualizerInstanceRef={rowVirtualizerInstanceRef}
            rowVirtualizerProps={{ overscan: 5 }}
            columnVirtualizerProps={{ overscan: 10 }}
            muiSelectCheckboxProps={{
              color: "primary",
            }}
            muiTableBodyRowProps={({ row }: any) => ({
              onClick: () => {
                editRow(row);
              },
              sx: { cursor: "pointer" },
            })}
            onPaginationChange={setPagination}
            state={{ pagination, rowSelection, showColumnFilters }}
            getRowId={(row) => row.id}
            onRowSelectionChange={setRowSelection}
            onShowColumnFiltersChange={(updater: any) => {
              setShowColumnFilters((prev) =>
                updater instanceof Function ? updater(prev) : updater
              );
              queueMicrotask(rerender);
            }}
            muiTableHeadCellProps={{
              sx: (theme: any) => ({
                color: theme.palette.palette_style.text.primary,
                backgroundColor:
                  theme.palette.palette_style.background.table_header_footer,
                py: 0.7,
                height: showColumnFilters ? 84 : 40,
                borderColor: theme.palette.palette_style.border.default,
              }),
            }}
            muiTableFooterCellProps={{
              sx: (theme: any) => ({
                color: theme.palette.palette_style.text.primary,
                backgroundColor:
                  theme.palette.palette_style.background.table_header_footer,
                p: 0,
              }),
            }}
            muiTableBodyCellProps={{
              sx: (theme: any) => ({
                color: theme.palette.palette_style.text.primary,
                backgroundColor:
                  theme.palette.palette_style.background.table_body,
                py: 0,
                height: 32,
              }),
            }}
            muiBottomToolbarProps={{
              sx: () => ({
                height: "55px",
                backgroundColor:
                  theme.palette.palette_style.background.table_header_footer,
              }),
            }}
            muiTableHeadCellFilterTextFieldProps={{
              sx: {
                color: theme.palette.palette_style.text.primary,
                backgroundColor:
                  theme.palette.palette_style.background.table_header_footer,
                px: 1,
                height: 40,
                marginTop: "12px",
              },
            }}
          />
        )}
        <Stack
          sx={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            py: 0.5,
            px: 1,
            height: 40,
            left: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: { xs: 0.25, md: "inherit" },
            backgroundColor: {
              xs: theme.palette.palette_style.background.default,
              md: "transparent",
            },
            flexDirection: "inherit",
          }}
        >
          <Box
            sx={{
              display: "flex",
              px: { xs: 0, md: 2 },
              gap: { xs: 1, md: 4 },
            }}
          >
            {hasPermission(currentView?.role, "Create") && (
              <Button
                variant="contained"
                onClick={handleNewRowPanel}
                sx={{
                  // position: "absolute",
                  // top: -80,
                  // left: 80,
                  flex: { md: 1 },
                  backgroundColor: theme.palette.palette_style.primary.main,
                  color: theme.palette.palette_style.text.white,
                  // opacity: 0.2,
                  px: { xs: 1, md: "inherit" },
                  height: 32,
                  "&:hover": {
                    backgroundColor: theme.palette.palette_style.primary.dark,
                    // opacity: 1,
                  },
                }}
              >
                <AddIcon sx={{ mr: 0.5 }} />
                {isDesktop ? "add new row" : "new row"}
                {/* Add new row */}
              </Button>
            )}
            {rowSelection && Object.keys(rowSelection).length > 0 && (
              <Button
                variant="outlined"
                // onClick={handleNewRowPanel}
                sx={{
                  display: isMobile ? "flex" : "none",
                  px: { xs: 1, md: "inherit" },
                  border: 2,
                  height: 32,
                  justifyContent: "space-between",
                  alignItems: "center",
                  "&:hover": {
                    border: 2,
                  },
                }}
              >
                List actions
                <KeyboardArrowDownIcon />
              </Button>
            )}
            <Box
              sx={{
                backgroundColor: theme.palette.palette_style.background.paper,
                display: "flex",
                // flexDirection: { xs: "column", md: "row" },
                position: { xs: "absolute", md: "relative" },
                bottom: { xs: 80, md: "unset" },
                left: { xs: "50%", md: "unset" },
                transform: { xs: "translateX(-50%)", md: "unset" },
                width: { xs: "90%", md: "auto" },
                // justifyContent: "space-between",
                // alignItems: "center",
                zIndex: 11,
                flexWrap: { xs: "wrap", md: "nowrap" },
                // px: { xs: 1, md: 3 },
                // marginTop: 4,
                // paddingBottom: 2,
                // borderBottom: `1px solid ${theme.palette.palette_style.border.default}`,
                gap: { xs: 0, md: 2 },
                boxShadow: { xs: "0 0 12px 0 rgba(0,0,0,.1)", md: "none" },
              }}
            >
              {rowSelection &&
                Object.keys(rowSelection).length > 0 &&
                bulkActions.map(
                  (action: any) =>
                    action.allowed && (
                      <Box
                        key={action.title}
                        sx={{
                          display: "flex",
                          cursor: "pointer",
                          width: { xs: "50%", sm: "33.33%", md: "100%" },
                        }}
                        onClick={() => {
                          handleBulkAction(action.action);
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            justifyContent: "center",
                            alignItems: "center",
                            borderBottom: { xs: "1px solid #eee", md: "none" },
                            py: { xs: 2, md: 0 },
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
          </Box>

          {/* <AddRowButton modalHandle={handleNewRowPanel} /> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: { xs: 0, md: 1 },
              width: "auto",
            }}
          >
            <Typography
              variant="caption"
              sx={{ display: { xs: "none", lg: "block" } }}
            >
              {pagination.pageIndex * pagination.pageSize + 1}-
              {(pagination.pageIndex + 1) * pagination.pageSize} of {count}, per
              page:
            </Typography>
            <Select
              id="per_page"
              value={pagination.pageSize.toString()}
              onChange={handleChangeRowsPerPage}
              size="small"
              sx={{
                // flex: 1,
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                fontSize: "14px",
                "& .MuiSelect-select": {
                  pr: 4,
                },
              }}
            >
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="10">10</MenuItem>
              <MenuItem value="25">25</MenuItem>
              <MenuItem value="50">50</MenuItem>
              <MenuItem value="100">100</MenuItem>
              {/* <MenuItem value="500">500</MenuItem>
              <MenuItem value="1000">1000</MenuItem> */}
            </Select>
            <Pagination
              count={Math.ceil(count / pagination.pageSize)}
              page={pagination.pageIndex + 1}
              onChange={handleChange}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                // flex: 1,
              }}
            />
          </Box>
        </Stack>

        <RowFormPanel
          rowData={selectedRowData}
          columns={columns}
          onSubmit={handleRowAction}
          open={visibleAddRowPanel}
          onClose={() => setVisibleAddRowPanel(false)}
          mode={mode}
        />
        {currentView && (
          <ListFields
            open={visibleFieldManagementPanel}
            onClose={() => handleCloseFieldManagementPanel()}
          />
        )}
      </Box>
      <YesNoDialog
        message="Are you sure you want to selected rows?"
        open={openBulkDeleteDialog}
        handleClose={() => setOpenBulkDeleteDialog(false)}
        onSubmit={() => {
          handleBulkDelete();
        }}
      />
      <div style={{ display: "none" }}>
        <div
          ref={componentRef}
          hidden={false}
          style={{ maxWidth: "0px", maxHeight: "0px" }}
        >
          <PrintDataTable columns={columns} rows={printRows} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.view.columns,
  rows: state.view.rows,
  currentView: state.view.currentView,
  count: state.view.count,
});

const mapDispatchToProps = {
  setRows,
  fetchRowsByPage,
  setCurrentView,
  setFlashMessage,
};
export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
