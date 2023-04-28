import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';
import Modal from '@mui/material/Modal';

const exports_all = [
  {
    label: 'CSV',
    icon: 'toolbar/csv'
  },
  {
    label: 'Google Sheets',
    icon: 'toolbar/google_sheets'
  },
  {
    label: 'Microsoft Excel',
    icon: 'toolbar/microsoft_excel'
  },
  {
    label: 'Jira',
    icon: 'toolbar/jira'
  }
];

const exports_selected = [
  {
    label: 'CSV',
    icon: 'toolbar/csv'
  },
  {
    label: 'Microsoft Excel',
    icon: 'toolbar/microsoft_excel'
  }
];

type Props = {
  open: boolean;
  handleClose: () => void;
};

const Export = (props: Props) => {
  const { open, handleClose } = props;
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: '100%', md: '480px'},
    backgroundColor: 'white',
    py: 2,
    px: {xs: 0.5, md: 2},
    boxShadow: '0 0 10px 10px rgba(0, 0, 0, 0.05)',
    borderRadius: '5px',
    border: 'none'
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ borderBottom: `1px solid ${theme.palette.palette_style.border.default}`, paddingBottom: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Box>Export</Box>
          <Box
            component="span"
            className="svg-color add_choice"
            sx={{
              width: 18,
              height: 18,
              display: 'inline-block',
              bgcolor: theme.palette.palette_style.text.primary,
              mask: `url(/assets/icons/table/close.svg) no-repeat center / contain`,
              WebkitMask: `url(/assets/icons/table/close.svg) no-repeat center / contain`,
              cursor: 'pointer'
            }}
            onClick={handleClose}
          />
        </Box>
        <Box sx={{ maxHeight: `${windowHeight - 100}px`, overflow: 'auto' }}>
          <Box sx={{ borderBottom: `1px solid ${theme.palette.palette_style.border.default}` }}>
            <Box sx={{ paddingTop: 2 }}>All data to:</Box>
            <Box sx={{ py: 2, display: 'grid', gridTemplateColumns: {xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)'}, gap: '30px', rowGap: '12px' }}>
              {exports_all.map((item: any) => (
                <Box key={item} sx={{ display: 'flex', border: `1px solid ${theme.palette.palette_style.border.default}`, borderRadius: '5px', px: 2, py: 1, cursor: 'pointer' }}>
                  <Box
                    component="img"
                    src={`/assets/icons/${item.icon}.svg`}
                    sx={{ width: 18, height: 18, marginRight: 1, marginTop: 0.3 }}
                  />
                  <Box>{item.label}</Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ py: 2, cursor: 'pointer', textAlign: 'center', color: '#54A6FB' }}>View more options</Box>
          </Box>
          <Box sx={{  }}>
            <Box sx={{ paddingTop: 2 }}>Selected:</Box>
            <Box sx={{ py: 2, display: 'grid', gridTemplateColumns: {xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)'}, gap: '30px', rowGap: '12px' }}>
              {exports_selected.map((item: any) => (
                <Box key={item} sx={{ display: 'flex', border: `1px solid ${theme.palette.palette_style.border.default}`, borderRadius: '5px', px: 2, py: 1, cursor: 'pointer' }}>
                  <Box
                    component="img"
                    src={`/assets/icons/${item.icon}.svg`}
                    sx={{ width: 18, height: 18, marginRight: 1, marginTop: 0.3 }}
                  />
                  <Box>{item.label}</Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ py: 2, cursor: 'pointer', textAlign: 'center', color: '#54A6FB' }}>View more options</Box>
          </Box>
        </Box>
      </Box>
      
    </Modal>
  );
};

export default Export;
