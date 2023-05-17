import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { setColumns } from '../../redux/actions/listFieldActions';
import {  setRows } from '../../redux/actions/listContentActions';
import useResponsive from '../../hooks/useResponsive';
import { styled } from '@mui/material/styles';

type Props = {
  columns: any;
  rows: any;
  setColumns: (columns: any) => void;
  setRows: (columns: any) => void;
  handleClose: () => void;
  row: any;
};

const DetailBoard = (props: Props) => {
  const { columns, rows, setRows, row, handleClose } = props;
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');

  const Container = styled('div')(({ theme }) => ({
    position: 'absolute',
    bottom: '93px',
    left: '-70px',
    width: '200px',
    height: '108px',
    backgroundColor: 'white',
    borderRadius: '5px',
    padding: '12px',
    zIndex: 1,
    boxShadow: '0 0 5px 5px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      width: 0,
      height: 0,
      border: '26px solid transparent',
      borderTopColor: 'white',
      borderBottom: 0,
      marginLeft: '-26px',
      marginBottom: '-26px'
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      width: 0,
      height: 0,
      border: '30px solid transparent',
      borderTopColor: 'rgba(0, 0, 0, 0.1)',
      borderBottom: 0,
      marginLeft: '-30px',
      marginBottom: '-30px'
    }
  }));

  return (
    <Container className="detail_board">
      <Box
        component="span"
        className="svg-color add_choice"
        sx={{
          width: 14,
          height: 14,
          display: 'inline-block',
          bgcolor: theme.palette.palette_style.text.primary,
          mask: `url(/assets/icons/table/close.svg) no-repeat center / contain`,
          WebkitMask: `url(/assets/icons/table/close.svg) no-repeat center / contain`,
          cursor: 'pointer',
          position: 'absolute',
          right: 8
        }}
        onClick={handleClose}
      />
      <Box sx={{ fontSize: '14px', marginBottom: '4px' }}>{row.task_name}</Box>
      <Box sx={{ marginTop: '8px', marginBottom: '4px' }}>
        <img
          alt="avatar"
          height={24}
          src='/assets/images/avatars/avatar_1.jpg'
          loading="lazy"
          style={{ borderRadius: '50%' }}
        />
      </Box>
      <Box sx={{ fontSize: '12px', width: '184px', height: '16px', overflow: 'hidden' }}>{row.description}</Box>
      <Box sx={{ textAlign: 'right', fontSize: '12px', marginTop: '4px' }}>
        <Box>{row.date.split(' ')[0]}</Box>
      </Box>
    </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailBoard);
