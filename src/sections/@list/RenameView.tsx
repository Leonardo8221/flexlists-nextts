import { useEffect, useState } from 'react';
import { Box, DialogTitle, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';
import Modal from '@mui/material/Modal';
import { DialogAnimate } from 'src/components/animate';
import CentralModal from 'src/components/modal/CentralModal';


type RenameViewProps = {
  open: boolean;
  handleClose: () => void;
};

const RenameView = ({ open, handleClose }: RenameViewProps) => {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  return (
     <CentralModal open={open} handleClose={handleClose}>
        <Box sx={{ borderBottom: `1px solid ${theme.palette.palette_style.border.default}`, paddingBottom: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Box>Rename View</Box>
        </Box>
        <Box >
        <TextField
            label="Name"
            size="small"
            type="text"
            onChange={()=>{}}
            value={""}
            sx={{ border: 'none' }}
          />
        </Box>
        <Box sx={{ paddingTop: 2, textAlign: 'center', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          <Box sx={{ py: 1, border: `1px solid ${theme.palette.palette_style.border.default}`, borderRadius: '5px', cursor: 'pointer' }} onClick={() => {  }}>Save</Box>
        </Box>
     </CentralModal>
     );
};

export default RenameView;
