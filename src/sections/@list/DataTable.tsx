import { useMemo, useState, useEffect, useRef, useReducer } from "react";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MaterialReactTable, {
  MRT_ToggleFiltersButton,
  MRT_TableInstance,
} from "material-react-table";
import Pagination from "@mui/material/Pagination";
import RowFormPanel from "./RowFormPanel";
import ColumnFormPanel from "./ColumnFormPanel";
import AddColumnButton from "../../components/add-button/AddColumnButton";
import AddRowButton from "../../components/add-button/AddRowButton";
import useResponsive from "../../hooks/useResponsive";
import { connect } from "react-redux";
import { fetchColumns, setColumns } from "../../redux/actions/listFieldActions";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { setRows, fetchRows } from "src/redux/actions/listContentActions";
import { Field, Query, Sort, View } from "src/models/SharedModels";
import { FieldType, SearchType } from "src/enums/SharedEnums";
import { useRouter } from "next/router";
import { ViewField } from "src/models/ViewField";
import { isInteger } from "src/utils/validateUtils";
import { convertToNumber } from "src/utils/convertUtils";

type DataTableProps = {
  tab: boolean;
  currentView : View,
  columns: ViewField[];
  rows: any[];
  setColumns: (columns: any) => void;
  setRows: (columns: any) => void;
  fetchColumns: (viewId:number) => void;
  fetchRows: (type?:SearchType,viewId?:number,page?:number,limit?:number,order?:Sort[],query?:Query) => void;
};

const DataTable = ({ tab,currentView, columns, rows, setColumns, setRows, fetchColumns, fetchRows }: DataTableProps) => {
  const theme = useTheme();
  const router = useRouter();
  const isDesktop = useResponsive("up", "lg");
  const newColumn : ViewField = {id:0,listId:0,name:'',ordering:0,required:false,type:FieldType.Text,description:'',
                detailsOnly:false,maximum:undefined,minimum:undefined,icon:'',config:undefined,viewFieldVisible: true }
  const [visibleAddRowPanel, setVisibleAddRowPanel] = useState(false);
  const [visibleAddColumnPanel, setVisibleAddColumnPanel] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const [updatingTable, setUpdatingTable] = useState(false);
  const tableInstanceRef = useRef<MRT_TableInstance<any>>(null);
  const rerender = useReducer(() => ({}), {})[1];
  const [windowHeight, setWindowHeight] = useState(0);
  const [selectedColumn,setSelectedColumn] = useState<Field>(newColumn)

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

  useEffect(() => {
    if(router.isReady && router.query.viewId && isInteger(router.query.viewId))
    {
      fetchColumns(convertToNumber(router.query.viewId));
    }
    
  }, [router.isReady]);

  useEffect(() => {
    if(router.isReady && router.query.viewId && isInteger(router.query.viewId) )
    {
      fetchRows(SearchType.View,convertToNumber(router.query.viewId));
    }
   
  }, [router.isReady]);
  useEffect(() => {
    if(currentView)
    {
      var newColumn = Object.assign({},selectedColumn);
      newColumn.listId =  currentView.listId
      setSelectedColumn(newColumn)
    }
  }, [currentView]);
  const getColumnKey = (column:any) : string=>
  {
    if(column.system)
    {
      return column.name
    }
    return column.id;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getColumns = (dataColumns: any[]) => {
    return dataColumns.map((dataColumn: any) => {
      var dataColumnType = dataColumn.type;
      return {
        accessorKey: `${getColumnKey(dataColumn)}`,
        header: dataColumn.name,
        Header: ({ column }: any) => (
          <Box sx={{ display: "flex" }} key={column.id}>
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
            <div>{column.columnDef.header}</div>
          </Box>
        ),
        Cell: ({ renderedCellValue, row }: any) => {
          let value_color = { bg: "#333", fill: "white" };
          let font = "inherit";

          dataColumns.forEach((item: any) => {
            if (item.type === FieldType.Choice) {
              item.config.forEach((choice: any) => {
                if (choice.name === renderedCellValue) {
                  value_color = choice.color;
                  font = choice.font;
                }
              });
            }
          });

          return (dataColumnType !== FieldType.Choice && dataColumnType !=='Avatar' ) ? (
            <Box
              key={row.id}
              sx={{
                minWidth: "100px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {renderedCellValue}
            </Box>
          ) : dataColumn.type === "Avatar" ? (
            <Box
              key={row.id}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                alt="avatar"
                height={24}
                src="/assets/images/avatars/avatar_1.jpg"
                loading="lazy"
                style={{ borderRadius: "50%" }}
              />
              <div style={{ marginLeft: "5px" }}>{renderedCellValue}</div>
            </Box>
          ) : dataColumnType === FieldType.Choice ? (
            <Box
              key={row.id}
              sx={{
                textAlign: "center",
                bgcolor: value_color.bg,
                borderRadius: "20px",
                color: value_color.fill,
                fontFamily: font,
                px: 1.5,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {renderedCellValue}
            </Box>
          ) : (
            <></>
          );
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
    return getColumns(columns.filter((column: any) => column.viewFieldVisible));
  }, [columns]);

  useEffect(() => {
    setUpdatingTable(false);
  }, [columnsTable]);

  const handleRowAction = (values: any, action: string) => {
    if (action === "create" || action === "clone") {
      rows.push(values);
      setRows([...rows]);
    } else if (action === "update") {
      setRows(rows.map((row: any) => (row.id === values.id ? values : row)));
    } else if (action === "delete")
    {
      console.log(rows)
      console.log(values)
      setRows(rows.filter((row: any) => row.id !== values.id));
    }
      
    else {
    }
  };

  const handleNewColumn = (value: any) => {
    columns.push(value);
    console.log(columns);
    setColumns([...columns]);
    // setRows(rows.map((task: any) => ({ ...task, [value.name]: "" })));
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPagination({
      ...pagination,
      pageIndex: value - 1,
    });
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setPagination({
      pageIndex: 0,
      pageSize: parseInt(event.target.value, 10),
    });
  };

  const handleNewRowPanel = () => {
    setVisibleAddRowPanel(true);
    setSelectedRowData(null);
    setRowSelection({});
  };

  const editRow = (row: any) => {
    setSelectedRowData(rows[row.index]);
    setVisibleAddRowPanel(true);
  };
  const handleAddColumn = (isOpenModal:boolean) =>{
    var column = Object.assign({},newColumn);
    column.ordering = 0
    setSelectedColumn(column)
    setVisibleAddColumnPanel(isOpenModal)
    
  }
  const handleCloseColumnPanel = () =>
  {
     setVisibleAddColumnPanel(false);
     setSelectedColumn(newColumn);
  }
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
          top: isDesktop ? "153px" : "",
          right: 8,
          zIndex: 3,
          textAlign: "center",
          paddingTop: "10px",
          height: "39px",
          width: "40px",
          backgroundColor:
            theme.palette.palette_style.background.table_header_footer,
        }}
      >
        <AddColumnButton modalHandle={handleAddColumn} />
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
              width: { lg: "calc(100vw - 100px)" },
              minHeight: "300px",
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
          backgroundColor: {
            xs: theme.palette.palette_style.background.default,
            md: "transparent",
          },
          flexDirection: "inherit",
        }}
      >
        <AddRowButton modalHandle={handleNewRowPanel} />
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
            count={Math.ceil(rows.length / pagination.pageSize)}
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
        comment={false}
      />
      {
        currentView && 
        <ColumnFormPanel
        viewId={currentView.id}
        column={selectedColumn}
        onAdd={handleNewColumn}
        onUpdate={(updateColumn)=>{}}
        onDelete={(id)=>{}}
        open={visibleAddColumnPanel}
        onClose={() => handleCloseColumnPanel()}
      />
      }
      
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.fieldDefinition.columns,
  rows: state.listContent.rows,
  currentView : state.view.currentView
});

const mapDispatchToProps = {
  setColumns,
  setRows,
  fetchColumns,
  fetchRows,
};
// const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
//     setColumns:(columns: any) => dispatch(setColumns(columns)),
//     setRows:(rows: any) => dispatch(setRows(rows)),
//     fetchColumns: () => dispatch(fetchColumns()),
// });
export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
