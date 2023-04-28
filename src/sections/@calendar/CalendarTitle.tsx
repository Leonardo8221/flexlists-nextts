import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type Props = {
  current: string;
  handlePageDays: (flag: number) => void;
};

const CalendarTitle = (props: Props) => {
  const { handlePageDays, current } = props;
  const theme = useTheme();

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '56px', px: 2, backgroundColor: theme.palette.palette_style.background.selected }}
    >
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
        onClick={() => { handlePageDays(-1) }}
      />
      <Box>{current}</Box>
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
        onClick={() => handlePageDays(1)}
      />
    </Box>
  );
};

export default CalendarTitle;
