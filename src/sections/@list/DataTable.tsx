import { useMemo, useState, useEffect, useRef, useReducer } from "react";
import { Box, Stack, Fab } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MaterialReactTable, {
  MRT_ToggleFiltersButton,
  MRT_TableInstance,
} from "material-react-table";
import Pagination from "@mui/material/Pagination";
import RowFormPanel from "./RowFormPanel";
import AddColumnButton from "../../components/add-button/AddColumnButton";
import AddRowButton from "../../components/add-button/AddRowButton";
import useResponsive from "../../hooks/useResponsive";
import { connect } from "react-redux";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  fetchRowsByPage,
  setCurrentView,
  setRows,
} from "src/redux/actions/viewActions";
import { View } from "src/models/SharedModels";
import { FieldType } from "src/enums/SharedEnums";
import { useRouter } from "next/router";
import { ViewField } from "src/models/ViewField";
import { filter } from "lodash";
import ListFields from "./ListFields";
import { ChoiceModel } from "src/models/ChoiceModel";
import { getChoiceField } from "src/utils/flexlistHelper";
import AddIcon from "@mui/icons-material/Add";

type DataTableProps = {
  tab: boolean;
  currentView: View;
  columns: ViewField[];
  rows: any[];
  setRows: (columns: any) => void;
  count: number;
  fetchRowsByPage: (page?: number, limit?: number) => void;
  setCurrentView: (view: View) => void;
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
}: DataTableProps) => {
  const theme = useTheme();
  const router = useRouter();
  const isDesktop = useResponsive("up", "lg");

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
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    if (Object.keys(rowSelection).length) {
      setSelectedRowData(
        rows[parseInt(Object.keys(rowSelection).pop() || "0")]
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
          function renderFieldData(columnType: FieldType, cellValue: any) {
            switch (columnType) {
              case FieldType.Integer:
              case FieldType.Float:
              case FieldType.Decimal:
              case FieldType.Double:
              case FieldType.Money:
              case FieldType.Percentage:
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

              case FieldType.DateTime:
              case FieldType.Time:
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
                    {new Date(cellValue).toLocaleString()}
                  </Box>
                );
              case FieldType.Date:
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
                    {new Date(cellValue).toLocaleDateString()}
                  </Box>
                );
              case FieldType.Text:
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
              case FieldType.Choice:
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
              case FieldType.Boolean:
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
                    {cellValue?.toString() === "true" ? "yes" : "no"}
                  </Box>
                );
              default:
                return <></>;
            }
          }
          return renderFieldData(dataColumnType, renderedCellValue);
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
    if (action === "create" || action === "clone") {
      var newRows = Object.assign([], rows);
      newRows.push(values);
      setRows(newRows);
    } else if (action === "update") {
      setRows(rows.map((row: any) => (row.id === values.id ? values : row)));
    } else if (action === "delete") {
      setRows(rows.filter((row: any) => row.id !== values.id));
    } else {
    }
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
  return (
    <Box
      sx={{
        width: { xs: "100vw", lg: "100%" },
        overFlow: "auto",
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
      <Box
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
      </Box>
      {!updatingTable && (
        <MaterialReactTable
          tableInstanceRef={tableInstanceRef}
          columns={columnsTable}
          data={rows}
          enableStickyHeader={true}
          muiTableContainerProps={{
            sx: {
              scrollBehavior: "smooth !important",
              height: {
                xs: `${windowHeight - (!tab ? 255 : 301)}px`,
                lg: "calc(100vh - 204px)",
              },
              width: { lg: "100vw" },
              minHeight: "300px",
              "& .MuiTableHead-root": {
                width: "calc(100% - 40px)",
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
          enableRowVirtualization
          // enableMultiRowSelection={false}
          muiSelectCheckboxProps={{
            color: "secondary",
          }}
          muiTableBodyRowProps={({ row }: any) => ({
            onClick: () => {
              editRow(row);
            },
            sx: { cursor: "pointer" },
          })}
          onPaginationChange={setPagination}
          state={{ pagination, rowSelection, showColumnFilters }}
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
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: {
            xs: theme.palette.palette_style.background.default,
            md: "transparent",
          },
          flexDirection: "inherit",
        }}
      >
        <Fab
          onClick={handleNewRowPanel}
          sx={{
            position: "absolute",
            top: -80,
            left: 80,
            backgroundColor: theme.palette.palette_style.primary.main,
            color: theme.palette.palette_style.text.white,
            "&:hover": {
              backgroundColor: theme.palette.palette_style.primary.dark,
            },
          }}
          variant="extended"
        >
          <AddIcon />
          Add new row
        </Fab>
        {/* <AddRowButton modalHandle={handleNewRowPanel} /> */}
        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: { xs: "none", md: "block" }, py: 0.5 }}>
            Row per page
          </Box>
          <Select
            id="per_page"
            value={pagination.pageSize.toString()}
            onChange={handleChangeRowsPerPage}
            size="small"
            sx={{
              boxShadow: "none",
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
              fontSize: "14px",
            }}
          >
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="25">25</MenuItem>
            <MenuItem value="50">50</MenuItem>
            <MenuItem value="100">100</MenuItem>
          </Select>
          <Pagination
            count={Math.ceil(count / pagination.pageSize)}
            page={pagination.pageIndex + 1}
            onChange={handleChange}
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
};
export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
