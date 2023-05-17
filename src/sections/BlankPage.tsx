import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { setColumns, setRows } from '../redux/store';
import useResponsive from '../hooks/useResponsive';

type Props = {
  columns: any;
  rows: any;
  setColumns: (columns: any) => void;
  setRows: (columns: any) => void;
  open: boolean;
};

const BlankPage = (props: Props) => {
  const { columns, rows, setRows, open } = props;
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');

  return (
    <Box sx={{}}>
      
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.fieldDefinition.columns,
  rows: state.listContent.columns
});

const mapDispatchToProps = {
  setColumns,
  setRows
};

export default connect(mapStateToProps, mapDispatchToProps)(BlankPage);
