import { Helmet } from "react-helmet-async";
import { useTheme } from "@mui/material/styles";
import useResponsive from "src/hooks/useResponsive";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import MainLayout from "src/layouts/view/MainLayout";
import Header from "src/sections/@list/Header";
import MenuBar from "src/sections/@list/MenuBar";
import ToolBar from "src/sections/@list/ToolBar";
import DataTable from "src/sections/@list/DataTable";
import { useRouter } from "next/router";
import { FlatWhere, Query, Sort, View } from "src/models/SharedModels";
import { connect } from "react-redux";
import {
  fetchColumns,
  fetchRows,
  fetchRowsByPage,
  getCurrentView,
} from "src/redux/actions/viewActions";
import { isInteger } from "src/utils/validateUtils";
import { convertToNumber } from "src/utils/convertUtils";
import { ViewType } from "src/enums/SharedEnums";
import CalendarView from "src/sections/@calendar/CalendarView";
import { ViewField } from "src/models/ViewField";
import KanbanView from "src/sections/@kanban/KanbanView";
import { GetServerSideProps } from "next";
import { listViewService } from "src/services/listView.service";
import { TranslationText } from "src/models/SharedModels";
import { getTranslations, getTranslation } from "src/utils/i18n";
import { getCookieRefreshToken, getCookieToken, removeCookie, setCookieToken } from "src/utils/cookieUtils";



type ListProps = {
  currentView: View;
  getCurrentView: (viewId: number) => void;
  columns: ViewField[];
  fetchColumns: (viewId: number) => void;
  fetchRowsByPage: (page?: number, limit?: number) => void;
};

export function ListDetail({
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
  const isDesktop = useResponsive("up", "lg");
  const [open, setOpen] = useState(false);

  const t = (key: string): string => {
    if (!translations) return key
    return getTranslation(key, translations)
  }

  useEffect(() => {
    if (
      router.isReady &&
      router.query.viewId &&
      getCurrentView &&
      isInteger(router.query.viewId)
    ) {
      //console.log(translations, 'flap', test)
      getCurrentView(convertToNumber(router.query.viewId));
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
      fetchRowsByPage(0, currentView.limit ?? 25);
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
  return currentView && columns && columns.length > 0 ? (
    <MainLayout>
      <Box
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
      </Box>
    </MainLayout>
  ) : (
    <></>
  );
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

  const translations = await getTranslations("existing landing page", context)


  return { props: { translations: translations/*, test: 'abrikoos'*/ } }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListDetail);
