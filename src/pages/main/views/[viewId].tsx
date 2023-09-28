import { useTheme } from "@mui/material/styles";
import useResponsive from "src/hooks/useResponsive";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import MainLayout from "src/layouts/view/MainLayout";
import Header from "src/sections/@list/Header";
import MenuBar from "src/sections/@list/MenuBar";
import DataTable from "src/sections/@list/DataTable";
import { useRouter } from "next/router";
import { View } from "src/models/SharedModels";
import { connect } from "react-redux";
import {
  fetchColumns,
  fetchRowsByPage,
  getCurrentView,
  getViewUsers,
  setCurrentView
} from "src/redux/actions/viewActions";
import { isInteger } from "src/utils/validateUtils";
import { convertToNumber } from "src/utils/convertUtils";
import { ViewType } from "src/enums/SharedEnums";
import CalendarView from "src/sections/@calendar/CalendarView";
import { ViewField } from "src/models/ViewField";
import KanbanView from "src/sections/@kanban/KanbanView";
import GalleryView from "src/sections/@gallery/GalleryView";
import TimelineView from "src/sections/@timeline/TimelineView";
import GanttView from "src/sections/@gantt/GanttView";
import MapView from "src/sections/@map/MapView";
import { GetServerSideProps } from "next";
import { getTranslations } from "src/utils/i18n";
import { TranslationText } from "src/models/SharedModels";

type ListProps = {
  translations: TranslationText[];
  currentView: View;
  getCurrentView: (viewId: number) => void;
  columns: ViewField[];
  fetchColumns: (viewId: number) => void;
  fetchRowsByPage: (page?: number, limit?: number) => void;
  users:any[],
  getViewUsers: (viewId: number) => void;
  setCurrentView: (view: View) => void;
};

export const ViewDetail = ({
  currentView,
  getCurrentView,
  columns,
  fetchColumns,
  fetchRowsByPage,
  translations,
  users,
  getViewUsers,
  setCurrentView
}: ListProps) => {
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (
      router.isReady &&
      router.query.viewId &&
      getCurrentView &&
      isInteger(router.query.viewId)
    ) {
      //console.log(translations, 'flap', test)
      getCurrentView(convertToNumber(router.query.viewId));
      if(users.length===0)
      {
        getViewUsers(convertToNumber(router.query.viewId));
      }
    }
  }, [router.isReady]);

  useEffect(() => {
    if (
      router.isReady &&
      currentView &&
      router.query.viewId &&
      isInteger(router.query.viewId)
    ) {
      fetchColumns(convertToNumber(router.query.viewId));

      if (router.query.cpid) {
        const cpids = typeof router.query.cpid === 'string' ? router.query.cpid.split('-') : router.query.cpid;
        let newView: View = Object.assign({}, currentView);

        newView.parentViewId = parseInt(cpids[0]);
        newView.parentFieldId = parseInt(cpids[1]);
        newView.parentContentId = parseInt(cpids[2]);

        setCurrentView(newView);
      }
    }
  }, [router.isReady, currentView?.id]);
  // useEffect(() => {
  //   if(router.query.viewId)
  //   {
  //     const handleRouteChange = (url:string) => {
  //       router.reload();
  //     };

  //     router.events.on('routeChangeComplete', handleRouteChange);

  //     return () => {
  //       router.events.off('routeChangeComplete', handleRouteChange);
  //     };
  //   }

  // }, [router.query.viewId]);
  return (
    <MainLayout translations={translations}>
      {
        currentView && columns && columns.length > 0 && users.length>0 ?
        (
          <Box
        sx={{
          backgroundColor: theme.palette.palette_style.background.default,
          boxShadow: "none",
          width: "100%",
          height: { xs: "100%", md: "100%" },
          overflow: "hidden",
        }}
      >
        <Header translations={translations} />
        <MenuBar search="" translations={translations} />

        {/* {!isDesktop && <ToolBar open={open} onOpen={setOpen} />} */}
        {currentView.type === ViewType.List && <DataTable tab={open} translations={translations} />}
        {currentView.type === ViewType.Calendar && <CalendarView open={open} translations={translations} />}
        {currentView.type === ViewType.KanBan && <KanbanView open={open} translations={translations} />}
        {currentView.type === ViewType.Gallery && <GalleryView open={open} translations={translations} />}
        {currentView.type === ViewType.TimeLine && <TimelineView open={open} translations={translations} />}
        {currentView.type === ViewType.Gantt && <GanttView open={open} translations={translations} />}
        {currentView.type === ViewType.Map && <MapView open={open} translations={translations} />}
      </Box>
        ):
        (<></>)

      }
      
    </MainLayout>)
}
const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
  columns: state.view.columns,
  users: state.view.users,
});

const mapDispatchToProps = {
  getCurrentView,
  fetchColumns,
  fetchRowsByPage,
  getViewUsers,
  setCurrentView
};

// TODO: make this work, there is an access issue, so probably it's not passing the JWT token to the request 
// when requesting from the server side. 
// -> not sure if it's even possible 
export const getServerSideProps: GetServerSideProps = async (context) => {
  // const token = getCookieToken(context.req, context.res);
  // var id = context.query.viewId;
  // try {
  //   const response = await listViewService.getView(convertToNumber(id), {
  //     headers: {
  //       Cookie: `token=${token};`
  //     }
  //   });
  //   console.log('response', response)
  // } catch (e: any) {
  //   console.log(e)
  // }

  // const result = {
  //   props: {
  //     //currentView: response.data!,
  //   },
  // }

  return await getTranslations("lists views", context);
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewDetail);
