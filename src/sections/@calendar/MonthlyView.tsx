import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';
import { format, isSameMonth, isSameDay } from 'date-fns';

type Props = {
  days: any[];
  currentDate: Date;
  cycleStart: Date;
  getData: (date: Date, flag: string) => any[];
  handleData: (data: any, date: any) => void;
  getTitle:(data:any) =>string
};

const MonthlyView = ({ days, currentDate, getData, handleData, cycleStart ,getTitle}: Props) => {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');

  return (
    <Box sx={{ height: '100%', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridTemplateRows: 'repeat(6, 1fr)' }}>
      {days.map((day: any, index: number) => (
        <Box
          key={`${index}-month`}
          sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', border: '1px solid rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', px: 2, borderColor: isSameDay(day, currentDate) ? theme.palette.palette_style.text.selected : '', backgroundColor: getData(new Date(format(day, 'MM/dd/yyyy')), 'day').length ? theme.palette.palette_style.background.selected : '', borderLeft: getData(new Date(format(day, 'MM/dd/yyyy')), 'day').length ? `4px solid #FFB7B7` : '', height: {xs: '54px', md: 'inherit'}, cursor: 'pointer' }}
          onClick={(e: any) => { if(!e.target.classList.contains('edit_row')) handleData({date: `${format(day, 'MM/dd/yyyy')} 00:00:00`}, day) }}
        >
          <Box sx={{ opacity: isSameMonth(day, cycleStart) ? 1 : 0.3 }}>
            <Box sx={{ color: isSameDay(day, currentDate) ? theme.palette.palette_style.text.selected : '', marginRight: 1 }}>{format(day, 'd')}</Box>
            {getData(new Date(format(day, 'MM/dd/yyyy')), 'day').map((data: any) => (
              <Box key={`${data.id}-month`} sx={{ display: 'flex', cursor: 'pointer', '&:hover': { color: theme.palette.palette_style.text.selected } }} onClick={() => handleData(data, day)} className="edit_row">
                {isDesktop && <Box sx={{ marginLeft: 0.5 }} className="edit_row">{getTitle(data)}</Box>}
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default MonthlyView;
