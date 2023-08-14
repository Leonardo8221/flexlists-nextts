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
import { TranslationText } from "src/models/SharedModels";
import { getTranslations, getTranslation } from "src/utils/i18n";

type ListProps = {
  currentView: View;
  getCurrentView: (viewId: number) => void;
  columns: ViewField[];
  fetchColumns: (viewId: number) => void;
  fetchRowsByPage: (page?: number, limit?: number) => void;
};

export function DefaultListViewDetail({
  currentView,
  getCurrentView,
  columns,
  fetchColumns,
  fetchRowsByPage,
  translations,
  //test
}: ListProps & { translations?: TranslationText[]/*, test?: string */ }) {
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = useState(false);


  useEffect(() => {
    if (
      router.isReady &&
      router.query.defaultListViewId &&
      getCurrentView &&
      isInteger(router.query.defaultListViewId)
    ) {
      getCurrentView(convertToNumber(router.query.defaultListViewId));
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
      fetchRowsByPage(0, currentView.limit ?? 25);
    }
  }, [router.isReady, currentView?.id]);
  return  (
    <MainLayout>
      {
         currentView && columns && columns.length > 0 ? 
         (<Box
          sx={{
            backgroundColor: theme.palette.palette_style.background.default,
            boxShadow: "none",
            width: "100%",
            height: { xs: "100%", md: "100%" },
            overflow: "hidden",
          }}
        >
          <Header />
          <MenuBar search="" />
  
          {/* {!isDesktop && <ToolBar open={open} onOpen={setOpen} />} */}
          {currentView.type === ViewType.List && <DataTable tab={open} />}
          {currentView.type === ViewType.Calendar && <CalendarView open={open} />}
          {currentView.type === ViewType.KanBan && <KanbanView open={open} />}
          {currentView.type === ViewType.Gallery && <GalleryView open={open} />}
          {currentView.type === ViewType.TimeLine && <TimelineView open={open} />}
          {currentView.type === ViewType.Gantt && <GanttView open={open} />}
          {currentView.type === ViewType.Map && <MapView open={open} />}
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
});

const mapDispatchToProps = {
  getCurrentView,
  fetchColumns,
  fetchRowsByPage,
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const translations = await getTranslations("existing landing page", context)


  return { props: { translations: translations/*, test: 'abrikoos'*/ } }
}
export default connect(mapStateToProps, mapDispatchToProps)(DefaultListViewDetail);
