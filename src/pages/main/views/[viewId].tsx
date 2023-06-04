import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import useResponsive from 'src/hooks/useResponsive';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import MainLayout from 'src/layouts/view/MainLayout';
import Header from 'src/sections/@list/Header';
import MenuBar from 'src/sections/@list/MenuBar';
import ToolBar from 'src/sections/@list/ToolBar';
import DataTable from 'src/sections/@list/DataTable';
import { useRouter } from 'next/router';
import { View } from "src/models/SharedModels";
import { connect } from 'react-redux';
import { getCurrentView } from 'src/redux/actions/viewActions';
import { isInteger } from 'src/utils/validateUtils';
import { convertToNumber } from 'src/utils/convertUtils';

type ListProps = {
   currentView: View,
   getCurrentView : (viewId:number)=>void
}
export  function ListDetail({currentView,getCurrentView}:ListProps) {
  const router = useRouter();
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'lg');
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
     if(router.isReady && router.query.viewId && isInteger(router.query.viewId))
     {
       getCurrentView(convertToNumber(router.query.viewId));
     }
     
  }, [router.isReady]);
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
const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
});

const mapDispatchToProps = {
  getCurrentView
};
export default connect(mapStateToProps, mapDispatchToProps)(ListDetail);

