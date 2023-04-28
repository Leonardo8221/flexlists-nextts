import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';

type Props = {
  mode: string;
};

const WeekBar = (props: Props) => {
  const { mode } = props;
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');

  const weeks = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', backgroundColor: theme.palette.palette_style.text.selected, color: 'white', paddingRight: mode === 'month' ? 'inherit' : {md: '5px'} }}>
      {weeks.map((week) => (
        <Box key={week} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '56px', border: '1px solid rgba(0, 0, 0, 0.1)' }}>{isDesktop ? week : week.charAt(0)}</Box>
      ))}
    </Box>
  );
};

export default WeekBar;
