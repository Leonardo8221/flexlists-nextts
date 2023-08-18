import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';
import { format, isSameDay } from 'date-fns';

type Props = {
  hours: string[];
  days: any[];
  currentDate: Date;
  getData: (date: Date, flag: string) => any[];
  handleData: (data: any, date: any) => void;
  getFieldData: (data: any, field: string) => string;
  getDataStatus: (item: any, data: any, field: string) => string;
};

const WeeklyView = ({ hours, days, currentDate, getData, handleData, getFieldData, getDataStatus }: Props) => {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');

  return (
    <Box sx={{ height: '100%', display: 'grid', gridTemplateColumns: `${isDesktop ? '64px' : '24px'} repeat(7, 1fr)`, overflowY: 'auto' }}>
      <Box sx={{ width: {xs: '24px', md: '64px'}, fontSize: {xs: '12px', md: '16px'} }}>
        <Box sx={{ height: {xs: '60px', md: '98px'}, p: 1, textAlign: 'right' }}></Box>
        {hours.map((hour: string) => (
          <Box key={`${hour}-left`} sx={{ height: {xs: '88px', md: '98px'}, p: {xs: 0.5, md: 1}, textAlign: 'right' }}>{isDesktop ? hour : hour.split(':')[0]}</Box>
        ))}
      </Box>
      {days.map((day: any, index: number) => (
        <Box key={`${index}-week`}>
          <Box sx={{ px: {md: 2}, display: 'flex', alignItems: 'center', justifyContent: {xs: 'center', md: 'inherit'}, textAlign: {xs: 'center', md: 'left'}, height: {xs: '60px', md: '98px'}, overflowY: 'hidden', border: '1px solid rgba(0, 0, 0, 0.1)', color: isSameDay(day, currentDate) ? theme.palette.palette_style.text.selected : '' }}>{format(day, 'd')}</Box>
          {hours.map((hour: string) => (
            <Box key={`${hour}-right`} sx={{ height: {xs: '88px', md: '98px'}, border: '1px solid rgba(0, 0, 0, 0.1)', px: {xs: 0.3, md: 1}, py: 0.5, cursor: 'pointer' }} onClick={(e: any) => { if(!e.target.classList.contains('edit_row')) handleData({date: format(day, 'MM/dd/yyyy') + ' ' + hour + ':00'}, day) }}>
              {getData(new Date(format(day, 'MM/dd/yyyy') + ' ' + hour + ':00'), 'hour').map((data: any) => (
                <Box key={`${data.id}-week`} className="edit_row" sx={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', display: 'flex', cursor: 'pointer', '&:hover': { color: theme.palette.palette_style.text.selected }, borderRadius: '20px', backgroundColor: '#FFB7B7', marginBottom: {xs: '2px', md: '5px'}, fontSize: '12px' }} onClick={() => handleData(data, day)}>
                  <Box sx={{ display: 'flex', width: '100%', px: 1, py: 0.2, borderRadius: 1.5, textTransform: 'capitalize', backgroundColor: theme.palette.palette_style.background.selected }} className="edit_row">
                    <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: getFieldData(data, 'color') || '#FFB7B7', marginTop: 0.5, marginRight: 0.5 }} className="edit_row"></Box>
                    <Box className="edit_row">{getDataStatus(data, new Date(format(day, 'MM/dd/yyyy') + ' ' + hour + ':00'), 'hour') === 'begin' ? getFieldData(data, 'begin') : hour}</Box>
                    <Box sx={{ marginLeft: 0.5 }} className="edit_row">{getFieldData(data, 'title')}</Box>
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default WeeklyView;
