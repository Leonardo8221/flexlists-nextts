import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';
import { useState } from 'react';
import { Box } from '@mui/material';
import MainLayout from 'src/layouts/view/MainLayout';
import Header from '../../sections/@list/Header';
import MenuBar from '../../sections/@list/MenuBar';
import ToolBar from '../../sections/@list/ToolBar';
import ChartView from '../../sections/@chart/ChartView';

export default function Chart() {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'lg');
  const [open, setOpen] = useState(false);

  return (
    <MainLayout>
      <Box
        sx={{
          backgroundColor: theme.palette.palette_style.background.default,
          width: '100%',
          height: {xs: 'calc(100% - 8px)', lg: '100%'},
          overflow: 'hidden'
        }}
      >
        <Header />
        <MenuBar search="" />
        {!isDesktop && <ToolBar open={open} onOpen={setOpen} />}
        <ChartView open={open} />
      </Box>
    </MainLayout>
  );
}
