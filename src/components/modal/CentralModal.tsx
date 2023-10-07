
import { Box, Modal } from "@mui/material";

type CentralModalProps = {
    open: boolean;
    handleClose: () => void;
    children?: any,
    zIndex?: number
};
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
export default function CentralModal({open,handleClose, children ,zIndex}: CentralModalProps) {
  return (
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{zIndex: (theme) => zIndex?zIndex:theme.zIndex.drawer}}
        >
        <Box sx={style}>
            {children}            
        </Box>
     </Modal>
);
}
