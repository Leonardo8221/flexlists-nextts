import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';
import { format } from 'date-fns';

type Props = {
  days: Date[];
  currentDate: Date;
  getData: (date: Date, flag: string) => any[];
  handleData: (data: any, date: any) => void;
  getTitle:(data:any) =>string
};

const DailyView = ({ days, currentDate, getData, handleData,getTitle }: Props) => {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');

  const getColorByImportance = (importance: string) => {
    return importance === 'Very important' ? '#FFB7B7' : '#FFEBB7';
  };

  return (
    <Box sx={{ height: '100%', overflowY: 'auto' }}>
      <Box sx={{ fontSize: {xs: '18px', md: '24px'}, height: {xs: '60px', md: '98px'}, px: 2, display: 'flex', alignItems: 'center', border: '1px solid rgba(0, 0, 0, 0.1)', marginBottom: 0.8, textTransform: 'uppercase' }}>
        <Box sx={{ backgroundColor: theme.palette.palette_style.text.selected, color: 'white', py: 0.8, px: 1, borderRadius: '8px' }}>{format(currentDate, 'd')}</Box>
        <Box sx={{ mx: 2 }}>{format(currentDate, 'MMM')}, </Box>
        <Box>{format(currentDate, 'iii')}</Box>
      </Box>
      {days.map((day: any) => (
        getData(day, 'day').length ? <Box key={`${day}-right`} sx={{ border: '1px solid rgba(0, 0, 0, 0.1)', px: {xs: 0.3, md: 1}, py: 0.5, display: 'flex' }}>
          <Box sx={{ display: 'flex', ml: 1 }}>
            <Box sx={{ fontSize: '24px', fontWeight: 900 }}>{format(day, 'd')}</Box>
            <Box sx={{ ml: 1, mt: 1 }}>{format(day, 'MMM')}, {format(day, 'iii')}</Box>            
          </Box>
          <Box sx={{ ml: 4 }}>
            {getData(day, 'day').map((data: any) => (
              <Box key={`${data.id}-week`} className="edit_row" sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: {xs: '100px', lg: '150px'}, display: 'flex', cursor: 'pointer', '&:hover': { color: theme.palette.palette_style.text.selected }, borderRadius: '20px', backgroundColor: getColorByImportance(data.importance), px: {xs: 0.5, md: 1.5}, marginBottom: {xs: '2px', md: '5px'}, fontSize: '12px' }} onClick={() => handleData(data, currentDate)}>
                {getTitle(data)}
              </Box>
            ))}
          </Box>
        </Box> : <></>
      ))}
    </Box>
  );
};

export default DailyView;
