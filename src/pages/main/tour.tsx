import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useState } from 'react';
import MainLayout from 'src/layouts/view/MainLayout';
import TourView from 'src/sections/@tour/TourView';

export default function TourPage() {
  const theme = useTheme();

  return (
    <MainLayout>
      <Box
        sx={{
          backgroundColor: theme.palette.palette_style.background.default,
          boxShadow: '0 0 10px 10px rgba(0, 0, 0, 0.05)',
          width: '100%',
          height: {xs: 'calc(100% - 8px)', lg: '100%'},
          overflow: 'hidden'
        }}
      >
        <TourView />
      </Box>
    </MainLayout>
  );
}
