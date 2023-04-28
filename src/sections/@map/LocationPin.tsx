import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { setColumns, setRows } from '../../redux/store';
import useResponsive from '../../hooks/useResponsive';
import DetailBoard from './DetailBoard';

type Props = {
  columns: any;
  rows: any;
  lat: number;
  lng: number;
  row: any;
  setColumns: (columns: any) => void;
  setRows: (columns: any) => void;
  setLocation: (location: any) => void;
};

const LocationPin = (props: Props) => {
  const { columns, rows, lat, lng, row, setRows, setLocation } = props;
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');

  useEffect(() => {
    // const closePopup = (e: any) => {
    //   if (!e.target.classList.contains('detail_board')) {
    //     setRows(rows.map((row: any) => {
    //         return { ...row, mapVisible: false };
    //     }));
    //   }
    // };

    // document.body.addEventListener('click', closePopup);
  }, []);

  const handleClick = () => {
    setRows(rows.map((item: any) => {
      if (row.id === item.id) item.mapVisible = !item.mapVisible;
      else item.mapVisible = false;

      return item;
    }));

    setLocation(row.location);
  };

  const handleClose = () => {
    setRows(rows.map((row: any) => {
      return { ...row, mapVisible: false };
    }));
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        component="span"
        className="svg-color detail_board"
        sx={{
            width: 60,
            height: 60,
            display: 'inline-block',
            bgcolor: '#C92929',
            mask: `url(/assets/icons/map/pin.svg) no-repeat center / contain`,
            WebkitMask: `url(/assets/icons/map/pin.svg) no-repeat center / contain`,
            cursor: 'pointer'
        }}
        onClick={handleClick}
      />

      {row.mapVisible && <DetailBoard row={row} handleClose={handleClose} />}
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.columns,
  rows: state.rows
});

const mapDispatchToProps = {
  setColumns,
  setRows
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationPin);
