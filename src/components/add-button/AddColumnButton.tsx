import { useTheme } from '@mui/material/styles';
import {
  Box
} from '@mui/material';

interface Props {
  modalHandle: (value: boolean) => void;
}
  
export default function AddColumnButton ({
  modalHandle
}: Props) {
  const theme = useTheme();
  
  return (
    <Box
      component="span"
      className="svg-color"
      sx={{
        width: 18,
        height: 18,
        display: 'inline-block',
        bgcolor: theme.palette.palette_style.text.primary,
        mask: `url(/assets/icons/table/plus.svg) no-repeat center / contain`,
        WebkitMask: `url(/assets/icons/table/plus.svg) no-repeat center / contain`,
        cursor: 'pointer'
      }}
      onClick={() => modalHandle(true)}
    />
  );
};