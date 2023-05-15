import { useState, useEffect } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Drawer,
  Box
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

interface Props {
  rowData: any;
  columns: any[];
  open: boolean;
  messages: any;
  comment: boolean;
  onClose: () => void;
  onSubmit: (values: any, action: string) => void;
  setMessages: (columns: any) => void;
}

const actions = [
  {
    title: 'Clone',
    icon: 'menu/calendar',
    action: 'clone'
  },
  {
    title: 'Archive',
    icon: 'menu/calendar',
    action: 'archive'
  },
  {
    title: 'Print',
    icon: 'menu/calendar',
    action: 'print'
  },
  {
    title: 'Delete',
    icon: 'footer/delete_list',
    action: 'delete',
    color: '#c92929'
  }
];

const AddRowPanel = (props: Props) => {
  const { rowData, open, columns, messages, comment, onClose, onSubmit, setMessages } = props;
  const theme = useTheme();

  const [date, setDate] = useState<Dayjs | null>();
  const [values, setValues] = useState(rowData);
  const [submit, setSubmit] = useState(false);;
  const [commentMode, setCommentMode] = useState(comment);
  const [message, setMessage] = useState('');
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    setDate(dayjs(rowData && rowData.date, "MM/DD/YYYY HH:mm:ss"));
    setValues(rowData);
    setSubmit(false);
  }, [open, rowData]);

  const handleSubmit = () => {
    setSubmit(true);

    if (!values) setValues({ submit: true });
    
    let validator = true;

    if (values) {
      columns.forEach(column => {
        if (column.name !== 'id' && !values[column.name]) validator = false;
      });

      if (validator) {
        if (!values.id) values.id = Math.floor(Math.random() * (99999 - 10000 + 1) ) + 10000;
        
        onSubmit(values, rowData && rowData.id ? "update" : "create");
        onClose();
      }
    }
  };

  const handleAction = (action: string) => {
    onSubmit(values, action);
    onClose();
  };

  const formatNumber = (num: number) => num < 10 ? `0${num}` : num;

  const handleMessage = () => {
    const today = new Date();

    messages.push({
      id: Math.floor(Math.random() * (99999 - 10000 + 1) ) + 10000,
      content: message,
      user: 'me',
      avatar: '/assets/images/avatars/avatar_1.jpg',
      time: `${formatNumber(today.getMonth() + 1)}/${formatNumber(today.getDate())}/${formatNumber(today.getFullYear())} ${formatNumber(today.getHours())}:${formatNumber(today.getMinutes())}:${formatNumber(today.getSeconds())}`
    });
    setMessages([...messages]);
    setMessage('');
  };

  const handleMessageOver = (id: number, value: boolean) => {
    setMessages(messages.map((message: any) => {
      if (message.id === id) message.over = value;
      return message;
    }
    ));
  };

  const getDifference = (time: string) => {
    const now = dayjs();
    const difference = now.diff(dayjs(time), 'second');
    const min = Math.floor(difference/60);
    const hour = Math.floor(min/60);
    const date = Math.floor(hour/24);

    return difference < 60 ? 'just now' : date ? `${date} day${date > 1 ? 's' : ''} ago` : hour ? `${hour} hour${hour > 1 ? 's' : ''} ago` : `${min} min${min > 1 ? 's' : ''} ago`;
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
      rowData ?
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', px: {xs: 1, md: 3}, marginTop: 4, paddingBottom: 2, borderBottom: `1px solid ${theme.palette.palette_style.border.default}` }}>
          {actions.map((action: any) => (
            <Box
              key={action.title}
              sx={{
                display: 'flex',
                cursor: 'pointer'
              }}
              onClick={() => { handleAction(action.action); }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Box
                  sx={{
                    fontSize: '16px',
                    color: action.color || theme.palette.palette_style.text.primary
                  }}
                >
                  {action.title}
                </Box>
              </Box>
              <Box
                component="span"
                className="svg-color"
                sx={{
                  width: 18,
                  height: 18,
                  display: 'inline-block',
                  bgcolor: action.color || theme.palette.palette_style.text.primary,
                  mask: `url(/assets/icons/toolbar/${action.icon}.svg) no-repeat center / contain`,
                  WebkitMask: `url(/assets/icons/${action.icon}.svg) no-repeat center / contain`,
                  marginLeft: {xs: 0.2, md: 1},
                  marginTop: 0.2
                }}
              />
            </Box>
          ))}
        </Box> : 
        <DialogTitle textAlign="center" sx={{ borderBottom: `1px solid ${theme.palette.palette_style.border.default}` }}>Create New Row</DialogTitle>
      }
      <DialogContent>
        {!commentMode ? <form onSubmit={(e) => e.preventDefault()} id="new_row_form">
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
              paddingTop: 2
            }}
          >
            {columns.map((column: any) =>
              column.type === "other_text_field" || column.type === "textarea" || column.type === "integers" || column.type === "floating" || column.type === "avatar" ?
              <TextField
                key={column.id}
                label={column.name}
                name={column.id}
                size="small"
                type={column.type === "integers" || column.type === "floating" ? 'number' : ''}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                defaultValue={rowData ? rowData[column.name] : ''}
                rows={4}
                multiline={column.type === "textarea"}
                required
                error={submit && !values[column.name]}
              /> : column.type === "date" ?
              <LocalizationProvider dateAdapter={AdapterDayjs} key={column.name}>
                <DateTimePicker
                    value={date}
                    label={column.label}
                    onChange={(x: any) => {
                      setDate(x);
                      setValues({ ...values, [column.name]: x && x.format('MM/DD/YYYY HH:mm:ss') })
                    }
                    }
                    className={submit && !values[column.name] ? 'Mui-error' : ''}
                  />
              </LocalizationProvider> : column.type === "choice" ?
              <FormControl key={column.name} required>
                <InputLabel id={column.name} sx={{ top: '-5px' }}>{column.label}</InputLabel>
                <Select
                  label={column.label}
                  id={column.name}
                  defaultValue={rowData ? rowData[column.name] : ''}
                  onChange={(e) =>
                      setValues({ ...values, [column.name]: e.target.value })
                  }
                  size="small"
                  error={submit && !values[column.name]}
                >
                  {column.choices.map((choice: any) => <MenuItem key={choice.name} value={choice.name} sx={{ backgroundColor: choice.color.bg, color: choice.color.fill, '&:hover': { backgroundColor: choice.color.bg } }}>{choice.label}</MenuItem>)}
                </Select>
              </FormControl>
              : <div key={column.name}></div>
            )}
          </Stack>
        </form> :
        <Box sx={{  }}>
          <Box sx={{ fontWeight: '900', marginBottom: 1 }}>Comments</Box>
          <Box sx={{ border: `1px solid ${theme.palette.palette_style.border.default}`, borderRadius: '5px' }}>
            {messages.map((message: any) => (
              <Box key={`${message.id}-message`} sx={{ display: 'flex', justifyContent: message.user === 'me' ? 'right' : 'left', p: 2, '&:hover': { backgroundColor: '#EEF7FF' }, position: 'relative' }} onMouseOver={() => { handleMessageOver(message.id, true); }} onMouseOut={() => { handleMessageOver(message.id, false); }} >
                <Box sx={{ width: '82%' }}>
                  {message.user !== 'me' && <Box sx={{ display: 'flex' }}>
                    <Box
                      component="img"
                      src={message.avatar}
                      sx={{ width: 24, height: 24, borderRadius: 50, marginRight: 1 }}
                    />
                    <Box sx={{ marginTop: 0.2 }}>{message.user}</Box>
                  </Box>}
                  <Box sx={{ marginTop: 1, borderRadius: '10px', backgroundColor: message.user === 'me' ? '#54A6FB' : '#003249', color: 'white', p: 1.2 }}>{message.content}</Box>
                  <Box sx={{ marginTop: 1, color: 'rgba(102, 102, 102, 0.4)', fontSize: '12px', textTransform: 'uppercase', textAlign: message.user === 'me' ? 'right' : 'left' }}>{getDifference(message.time)}</Box>
                </Box>
                {message.over && <Box sx={{ position: 'absolute', top: 6, right: 24, display: 'flex', justifyContent: 'right' }}>
                  <Box
                    component="span"
                    className="svg-color"
                    sx={{
                      width: 12,
                      height: 12,
                      display: 'inline-block',
                      bgcolor: theme.palette.palette_style.text.primary,
                      mask: `url(/assets/icons/reply.svg) no-repeat center / contain`,
                      WebkitMask: `url(/assets/icons/reply.svg) no-repeat center / contain`,
                      cursor: 'pointer',
                      marginRight: 1
                    }}
                  />
                  <Box
                    component="span"
                    className="svg-color"
                    sx={{
                      width: 12,
                      height: 12,
                      display: 'inline-block',
                      bgcolor: theme.palette.palette_style.text.primary,
                      mask: `url(/assets/icons/check_circle.svg) no-repeat center / contain`,
                      WebkitMask: `url(/assets/icons/check_circle.svg) no-repeat center / contain`,
                      cursor: 'pointer',
                      marginRight: 1
                    }}
                  />
                  <Box
                    component="span"
                    className="svg-color"
                    sx={{
                      width: 12,
                      height: 12,
                      display: 'inline-block',
                      bgcolor: theme.palette.palette_style.text.primary,
                      mask: `url(/assets/icons/footer/delete_list.svg) no-repeat center / contain`,
                      WebkitMask: `url(/assets/icons/footer/delete_list.svg) no-repeat center / contain`,
                      cursor: 'pointer'
                    }}
                  />
                </Box>}
              </Box>
            ))}
            <Box sx={{ display: 'flex', p: 1.5, borderTop: `1px solid ${theme.palette.palette_style.border.default}`, position: 'relative', marginTop: 3 }}>
              <Box
                component="img"
                src='/assets/images/avatars/avatar_9.jpg'
                sx={{ width: 40, height: 40, borderRadius: 50, marginRight: 1, marginTop: 1 }}
              />
              <form onSubmit={(e) => e.preventDefault()} id="new_message_form">
                <TextField
                  label='Reply...'
                  name='message'
                  value={message}
                  size="medium"
                  onChange={(e) => { setMessage(e.target.value); }}
                  fullWidth
                />
                <Box sx={{ borderRadius: 50, backgroundColor: '#54A6FB', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', width: 32, height: 32, top: 24, right: 22, cursor: 'pointer' }}>
                  <Box
                    component="span"
                    className="svg-color"
                    sx={{
                      width: 16,
                      height: 16,
                      display: 'inline-block',
                      bgcolor: 'white',
                      mask: `url(/assets/icons/send.svg) no-repeat center / contain`,
                      WebkitMask: `url(/assets/icons/send.svg) no-repeat center / contain`
                    }}
                    onClick={handleMessage}
                  />
                </Box>
              </form>
            </Box>
          </Box>
        </Box>}
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
            {rowData ? "Update Row" : "Create New Row"}
          </Button>
        </Box>
      </DialogActions>
    </Drawer>
  );
};

const mapStateToProps = (state: any) => ({
  messages: state.message.messages
});

const mapDispatchToProps = {
  setMessages
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRowPanel);