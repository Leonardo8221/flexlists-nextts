import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useState } from 'react';
import MainLayout from 'src/layouts/view/MainLayout';
import AddList from 'src/sections/@addList/AddList';

export default function TourPage() {
  const theme = useTheme();

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
        <AddList />
      </Box>
    </MainLayout>
  );
}
