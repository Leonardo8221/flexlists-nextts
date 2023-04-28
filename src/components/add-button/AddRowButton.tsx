import { useTheme } from '@mui/material/styles';
import {
  Box
} from '@mui/material';
import useResponsive from '../../hooks/useResponsive';

interface Props {
  modalHandle: (value: boolean) => void;
}
  
export default function AddRowButton ({
  modalHandle
}: Props) {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'lg');
  
  return (
    <Box sx={{ display: 'flex', cursor: 'pointer' }} onClick={() => { modalHandle(true) }}>
      <Box
        sx={{
          backgroundColor: theme.palette.palette_style.background.table_header_footer,
          px: 1,
          borderRadius: '5px',
          width: 45,
          height: 24,
          textAlign: 'center',
          paddingTop: '3px',
          marginTop: '5px',
          marginLeft: {xs: 0, md: '10px'}
        }}
      >
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
      </Box>
      {isDesktop && <Box sx={{ my: 0.7, mx: 2, paddingRight: 4, borderRight: `1px solid ${theme.palette.palette_style.border.default}` }}>
        Add new row
      </Box>}
    </Box>
  );
};