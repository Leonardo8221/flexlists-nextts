import { ReactNode } from "react";
import { Stack, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { setColumns } from '../../redux/actions/listFieldActions';
import {  setRows } from '../../redux/actions/listContentActions';
import AddRowButton from "../../components/add-button/AddRowButton";
import AddRowPanel from "../../components/right-panel/AddRowPanel";

type Props = {
  columns: any;
  rows: any;
  rowData: any;
  visibleAddRowPanel: boolean;
  setColumns: (columns: any) => void;
  setRows: (columns: any) => void;
  setVisibleAddRowPanel: (visibleAddRowPanel: boolean) => void;
  setRowData: (rowData: any) => void;
  children?: ReactNode;
};

const ViewFooter = (props: Props) => {
  const { columns, rows, visibleAddRowPanel, rowData, setRows, setVisibleAddRowPanel, setRowData, children } = props;
  const theme = useTheme();

  const handleNewRowPanel = () => {
    setRowData(null);
    setVisibleAddRowPanel(true);
  };

  const handleNewRow = (values: any, action: string) => {
    if (action === 'create' || action === 'clone') {
      rows.push(values);
      setRows([...rows]);
    }
    else if (action === 'update') setRows(rows.map(((row: any) => row.id === values.id ? values : row)));
    else if (action === 'delete') setRows(rows.filter((row: any) => row.id !== values.id));
    else {}
  };

  return (
    <Box sx={{  }}>
      <Stack
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          py: 0.5,
          px: 1,
          height: 40,
          left: 0,
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: {xs: theme.palette.palette_style.background.default, md: 'transparent'},
          flexDirection: 'inherit'
        }}
      >
        <AddRowButton modalHandle={handleNewRowPanel} />
        {children}
      </Stack>

      <AddRowPanel
        rowData={rowData}
        columns={columns}
        onSubmit={handleNewRow}
        open={visibleAddRowPanel}
        onClose={() => setVisibleAddRowPanel(false)}
        comment={false}
      />
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.fieldDefinition.columns,
  rows: state.listContent.rows
});

const mapDispatchToProps = {
  setColumns,
  setRows
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewFooter);
