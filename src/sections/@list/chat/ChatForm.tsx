import { useState, useEffect } from 'react';
import {
  DialogContent,
  TextField,
  Drawer,
  Box
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { setMessages } from '../../../redux/actions/messageActions';

interface ChatFormProps {
  messages: any;
  setMessages: (columns: any) => void;
}

const ChatForm = ({ messages, setMessages }: ChatFormProps) => {
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);



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
        </Box>
  );
};

const mapStateToProps = (state: any) => ({
  messages: state.message.messages
});

const mapDispatchToProps = {
  setMessages
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);