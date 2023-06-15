import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';
import { format } from 'date-fns';

type Props = {
  hours: string[];
  currentDate: Date;
  getData: (date: Date, flag: string) => any[];
  handleData: (data: any, date: any) => void;
  getTitle:(data:any) =>string
};

const DailyView = ({ hours, currentDate, getData, handleData,getTitle }: Props) => {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');

  const getColorByImportance = (importance: string) => {
    return importance === 'Very important' ? '#FFB7B7' : '#FFEBB7';
  };

  const getCurrentDateString = (date: Date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <Box sx={{ height: '100%', display: 'grid', gridTemplateColumns: `${isDesktop ? '64px' : '24px'} repeat(1, 1fr)`, overflowY: 'auto' }}>
      <Box sx={{ width: {xs: '24px', md: '64px'}, fontSize: {xs: '12px', md: '16px'} }}>
        <Box sx={{ height: {xs: '60px', md: '98px'}, p: 1, textAlign: 'right', marginBottom: 0.8 }}></Box>
        {hours.map((hour: string) => (
          <Box key={`${hour}-left`} sx={{ height: {xs: '88px', md: '98px'}, p: {xs: 0.5, md: 1}, textAlign: 'right' }}>{isDesktop ? hour : hour.split(':')[0]}</Box>
        ))}
      </Box>
      <Box sx={{  }}>
        <Box sx={{ fontSize: {xs: '18px', md: '24px'}, height: {xs: '60px', md: '98px'}, px: 2, display: 'flex', alignItems: 'center', border: '1px solid rgba(0, 0, 0, 0.1)', marginBottom: 0.8 }}>
          <Box sx={{ backgroundColor: theme.palette.palette_style.text.selected, color: 'white', py: 0.8, px: 1, borderRadius: '8px' }}>{format(currentDate, 'd')}</Box>
          <Box sx={{ mx: 2 }}>{format(currentDate, 'EEEE')}</Box>
        </Box>
        {hours.map((hour: string) => (
          <Box key={`${hour}-right`} sx={{ height: {xs: '88px', md: '98px'}, border: '1px solid rgba(0, 0, 0, 0.1)', px: {xs: 0.3, md: 1}, py: 0.5, cursor: 'pointer' }} onClick={(e: any) => { if(!e.target.classList.contains('edit_row')) handleData({date: getCurrentDateString(currentDate) + ' ' + hour + ':00'}, currentDate) }}>
            {getData(new Date(getCurrentDateString(currentDate) + ' ' + hour + ':00'), 'hour').map((data: any) => (
              <Box key={`${data.id}-week`} className="edit_row" sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: {xs: '100px', lg: '150px'}, display: 'flex', cursor: 'pointer', '&:hover': { color: theme.palette.palette_style.text.selected }, borderRadius: '20px', backgroundColor: getColorByImportance(data.importance), px: {xs: 0.5, md: 1.5}, marginBottom: {xs: '2px', md: '5px'}, fontSize: '12px' }} onClick={() => handleData(data, currentDate)}>
                {getTitle(data)}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DailyView;
