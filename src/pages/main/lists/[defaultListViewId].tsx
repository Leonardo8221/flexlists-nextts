import { useTheme } from "@mui/material/styles";
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
  getCurrentView,
  getViewUsers,
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
  columns: ViewField[];
  users:any[],
  getCurrentView: (viewId: number) => void;
  fetchColumns: (viewId: number) => void;
  getViewUsers: (viewId: number) => void;
};

export const DefaultListViewDetail = ({
  currentView,
  columns,
  translations,
  users,
  getCurrentView,
  fetchColumns,
  getViewUsers
}: ListProps) => {
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (
      router.isReady &&
      router.query.defaultListViewId &&
      getCurrentView &&
      isInteger(router.query.defaultListViewId)
    ) {
      getCurrentView(convertToNumber(router.query.defaultListViewId));
      if(users.length===0)
      {
        getViewUsers(convertToNumber(router.query.defaultListViewId));
      }
      
    }
  }, [router.isReady]);

  useEffect(() => {
    if (
      router.isReady &&
      currentView &&
      router.query.defaultListViewId &&
      isInteger(router.query.defaultListViewId)
    ) {
      fetchColumns(convertToNumber(router.query.defaultListViewId));
    }
  }, [router.isReady, currentView?.id]);

  const handleRefresh = () => {
    setRefresh(true);
  };

  const clearRefresh = () => {
    setRefresh(false);
  };

  return  (
    <MainLayout translations={translations}>
      {
         currentView && columns && columns.length > 0 && users.length>0 ? 
         (<Box
          sx={{
            backgroundColor: theme.palette.palette_style.background.default,
            boxShadow: "none",
            width: "100%",
            height: { xs: "100%", md: "100%" },
            overflow: "hidden",
          }}
        >
          <Header translations={translations} handleRefresh={handleRefresh} />
          <MenuBar search="" translations={translations} />
  
          {/* {!isDesktop && <ToolBar open={open} onOpen={setOpen} />} */}
          {currentView.type === ViewType.List && <DataTable tab={open} translations={translations} refresh={refresh} clearRefresh={clearRefresh} />}
          {currentView.type === ViewType.Calendar && <CalendarView open={open} translations={translations} refresh={refresh} clearRefresh={clearRefresh} />}
          {currentView.type === ViewType.KanBan && <KanbanView open={open} translations={translations} refresh={refresh} clearRefresh={clearRefresh} />}
          {currentView.type === ViewType.Gallery && <GalleryView open={open} translations={translations} refresh={refresh} clearRefresh={clearRefresh} />}
          {currentView.type === ViewType.TimeLine && <TimelineView open={open} translations={translations} refresh={refresh} clearRefresh={clearRefresh} />}
          {currentView.type === ViewType.Gantt && <GanttView open={open} translations={translations} refresh={refresh} clearRefresh={clearRefresh} />}
          {currentView.type === ViewType.Map && <MapView open={open} translations={translations} refresh={refresh} clearRefresh={clearRefresh} />}
        </Box>):
        (
          <></>
        )
      }
      
    </MainLayout>
  )
}
const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
  columns: state.view.columns,
  users: state.view.users,
});

const mapDispatchToProps = {
  getCurrentView,
  fetchColumns,
  getViewUsers
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await getTranslations("lists views", context);
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultListViewDetail);
