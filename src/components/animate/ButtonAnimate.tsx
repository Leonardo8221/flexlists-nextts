import { motion } from 'framer-motion';
// material
import { Box } from '@mui/material';
//
import { varSmallClick, varMediumClick } from './variants';

// ----------------------------------------------------------------------

type ButtonAnimateProps = {
  mediumClick?: boolean,
  children?: any,
  sx?: object
};

export default function ButtonAnimate({ mediumClick = false, children, sx, ...other }: ButtonAnimateProps) {
  return (
    <Box
      component={motion.div}
      whileTap="tap"
      whileHover="hover"
      variants={mediumClick ? varMediumClick : varSmallClick}
      sx={{ display: 'inline-flex', ...sx }}
      {...other}
    >
      {children}
    </Box>
  );
}
