import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { format, addYears } from 'date-fns';

type Props = {
  mode: string;
  current: Date;
  handleFirstPageer: (flag: number) => void;
  handleSecondPageer: (flag: number) => void;
};

const CalendarTitle = (props: Props) => {
  const { handleFirstPageer, handleSecondPageer, current, mode } = props;
  const theme = useTheme();

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '56px', px: 2, backgroundColor: theme.palette.palette_style.background.selected }}
    >
      <Box sx={{ paddingTop: 1 }}>
        <Box
          component="span"
          className="svg-color"
          sx={{
            width: 24,
            height: 24,
            display: 'inline-block',
            bgcolor: theme.palette.palette_style.text.primary,
            mask: `url(/assets/icons/angle_double_left.svg) no-repeat center / contain`,
            WebkitMask: `url(/assets/icons/angle_double_left.svg) no-repeat center / contain`,
            cursor: 'pointer'
          }}
          onClick={() => { handleSecondPageer(-1) }}
        />
        <Box
          component="span"
          className="svg-color"
          sx={{
            width: 24,
            height: 24,
            display: 'inline-block',
            bgcolor: theme.palette.palette_style.text.primary,
            mask: `url(/assets/icons/angle_left.svg) no-repeat center / contain`,
            WebkitMask: `url(/assets/icons/angle_left.svg) no-repeat center / contain`,
            cursor: 'pointer'
          }}
          onClick={() => { handleFirstPageer(-1) }}
        />
      </Box>
      <Box>
        {format(current, 'MMMM yyyy')}
        {mode === 'list' && <span> - {format(addYears(current, 1), 'MMMM yyyy')}</span>}
      </Box>
      <Box sx={{ paddingTop: 1 }}>
        <Box
          component="span"
          className="svg-color"
          sx={{
            width: 24,
            height: 24,
            display: 'inline-block',
            bgcolor: theme.palette.palette_style.text.primary,
            mask: `url(/assets/icons/angle_right.svg) no-repeat center / contain`,
            WebkitMask: `url(/assets/icons/angle_right.svg) no-repeat center / contain`,
            cursor: 'pointer'
          }}
          onClick={() => handleFirstPageer(1)}
        />
        <Box
          component="span"
          className="svg-color"
          sx={{
            width: 24,
            height: 24,
            display: 'inline-block',
            bgcolor: theme.palette.palette_style.text.primary,
            mask: `url(/assets/icons/angle_double_right.svg) no-repeat center / contain`,
            WebkitMask: `url(/assets/icons/angle_double_right.svg) no-repeat center / contain`,
            cursor: 'pointer'
          }}
          onClick={() => handleSecondPageer(1)}
        />
      </Box>
    </Box>
  );
};

export default CalendarTitle;
