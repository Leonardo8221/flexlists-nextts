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
import { FlatWhere, Query, Sort, View } from "src/models/SharedModels";
import { connect } from 'react-redux';
import { fetchColumns, fetchRows, fetchRowsByPage, getCurrentView } from 'src/redux/actions/viewActions';
import { isInteger } from 'src/utils/validateUtils';
import { convertToNumber } from 'src/utils/convertUtils';
import { ViewType } from 'src/enums/SharedEnums';
import CalendarView from 'src/sections/@calendar/CalendarView';
import { ViewField } from 'src/models/ViewField';
import KanbanView from 'src/sections/@kanban/KanbanView';

type ListProps = {
   currentView: View,
   getCurrentView : (viewId:number)=>void;
   columns:ViewField[];
   fetchColumns: (viewId:number) => void;
   fetchRowsByPage: (page?:number,limit?:number) => void;
}
export  function ListDetail({currentView,getCurrentView,columns,fetchColumns,fetchRowsByPage}:ListProps) {
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


  useEffect(() => {
    if(router.isReady && currentView && router.query.viewId  && isInteger(router.query.viewId) )
    {
      fetchColumns(convertToNumber(router.query.viewId));
      fetchRowsByPage(0,currentView.limit??25);
    }
  }, [router.isReady,currentView?.id]);
  useEffect(() => {
    if(router.query.viewId)
    {
      const handleRouteChange = (url:string) => {
        router.reload();
      };
  
      router.events.on('routeChangeComplete', handleRouteChange);
  
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
   
  }, [router.query.viewId]);
  return (
        currentView && columns && columns.length>0 ?
        (
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
        {
          currentView.type === ViewType.List &&
          <DataTable tab={open} />
        }
        {
          currentView.type === ViewType.Calendar &&
          <CalendarView open={open} />
        }
        {
          currentView.type === ViewType.KanBan &&
          <KanbanView open={open} />
        }
        
      </Box>
      </MainLayout>
        ):
        (<></>)
  );
}
const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
  columns: state.view.columns
});

const mapDispatchToProps = {
  getCurrentView,
  fetchColumns,
  fetchRowsByPage
};
export default connect(mapStateToProps, mapDispatchToProps)(ListDetail);

