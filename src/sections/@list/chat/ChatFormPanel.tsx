import { useState, useEffect } from 'react';
import {
  DialogContent,
  Drawer,
  Box
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import ChatForm from './ChatForm';

interface ChatFormPanelProps {
  open: boolean;
  onClose: () => void;
}

const ChatFormPanel = ({ open, onClose } : ChatFormPanelProps) => {
  const theme = useTheme();
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: {xs: '100%', lg: '500px'},
          border: 'none',
          height: `${windowHeight}px`,
          backgroundColor: theme.palette.palette_style.background.default,
        },
      }}
    >
      {/* <Box sx={{ display: 'flex', width: '100%', px: {xs: 1, md: 3}, marginTop: 4, paddingBottom: 2, borderBottom: `1px solid ${theme.palette.palette_style.border.default}` }}>
        <Box
          component="span"
          className="svg-color"
          sx={{
            width: 22,
            height: 22,
            display: 'inline-block',
            bgcolor: theme.palette.palette_style.text.primary,
            mask: `url(/assets/icons/arrow_back.svg) no-repeat center / contain`,
            WebkitMask: `url(/assets/icons/arrow_back.svg) no-repeat center / contain`,
            cursor: 'pointer',
            marginRight: {xs: 1.5, md: 4}
          }}
          onClick={() => {  }}
        />
      </Box>  */}
      <DialogContent>
        <ChatForm />
      </DialogContent>
    </Drawer>
  );
};

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatFormPanel);