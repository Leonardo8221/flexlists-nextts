import { useState, useEffect } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Drawer,
  Box,
  FormControlLabel,
  Checkbox,
  Alert
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import { FormControl } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { connect } from 'react-redux';
import { setMessages } from '../../redux/actions/messageActions';
import { ViewField } from 'src/models/ViewField';
import { FieldType } from 'src/enums/SharedEnums';
import { listContentService } from 'src/services/listContent.service';
import { isErr, isSucc } from 'src/models/ApiResponse';
import { CreateContentOutputDto } from 'src/models/ApiOutputModels';
import { filter } from 'lodash';
import { ErrorConsts } from 'src/constants/errorConstants';

interface ListFieldsProps {
  currentView: ViewField;
  open: boolean;
  onClose: () => void;
}


const ListFields = ({currentView, open, onClose}: ListFieldsProps) => {
  const theme = useTheme(); 
  const [commentMode,setCommentMode] = useState<boolean>(true)
  const [windowHeight, setWindowHeight] = useState(0);
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
  }, [open]);

  const handleSubmit = async() => {
   
  };
  
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
      {commentMode ?
      <Box sx={{ display: 'flex', width: '100%', px: {xs: 1, md: 3}, marginTop: 4, paddingBottom: 2, borderBottom: `1px solid ${theme.palette.palette_style.border.default}` }}>
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
          onClick={() => { setCommentMode(false); }}
        />
      </Box> :
        <></>
      }
      <DialogContent>
        {!commentMode ? <></> :
        <></>}
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem', borderTop: `1px solid ${theme.palette.palette_style.border.default}`, justifyContent: 'space-between' }}>
        <Box
          component="span"
          className="svg-color"
          sx={{
            width: 16,
            height: 16,
            display: 'inline-block',
            bgcolor: theme.palette.palette_style.text.primary,
            mask: `url(/assets/icons/header/chat.svg) no-repeat center / contain`,
            WebkitMask: `url(/assets/icons/header/chat.svg) no-repeat center / contain`,
            cursor: 'pointer',
            marginRight: {xs: 1.5, md: 4}
          }}
          onClick={() => { setCommentMode(true); }}
        />
        <Box sx={{ display: 'flex' }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="secondary" onClick={handleSubmit} variant="contained" type="submit">
            {rowData && rowData.id ? "Update Row" : "Create New Row"}
          </Button>
        </Box>
      </DialogActions>
    </Drawer>
  );
};

const mapStateToProps = (state: any) => ({
  messages: state.message.messages,
  currentView : state.view.currentView
});

const mapDispatchToProps = {
  setMessages
};

export default connect(mapStateToProps, mapDispatchToProps)(ListFields);