import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import useResponsive from 'src/hooks/useResponsive';
import { useState } from 'react';
import { Box } from '@mui/material';
import MainLayout from 'src/layouts/view/MainLayout';
import Header from 'src/sections/@list/Header';
import MenuBar from 'src/sections/@list/MenuBar';
import ToolBar from 'src/sections/@list/ToolBar';
import DataTable from 'src/sections/@list/DataTable';

export default function List() {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'lg');
  const [open, setOpen] = useState(false);

  return (
    <MainLayout>
      <Box
        sx={{
          backgroundColor: theme.palette.palette_style.background.default,
          boxShadow: 'none',
          width: '100%',
          height: {xs: 'calc(100% - 8px)', md: '100%'},
          overflow: 'hidden'
        }}
      >
        <Header />      
        <MenuBar search="" />
        {!isDesktop && <ToolBar open={open} onOpen={setOpen} />}
        <DataTable tab={open} />
      </Box>
    </MainLayout>
  );
}
