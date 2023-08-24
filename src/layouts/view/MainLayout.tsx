import { useState, ReactNode, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Header from "./header";
import Nav from "./nav";
import Footer from "./footer";
import { getAvailableFieldUiTypes } from "src/redux/actions/viewActions";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { getSearchTypes } from "src/redux/actions/adminAction";
import { View } from "src/models/SharedModels";
import { ApiResponseStatus } from "src/enums/ApiResponseStatus";
import Error from 'src/sections/Error'
import { getDateFormat } from "src/redux/actions/dateFormatAction";

const APP_BAR_MOBILE = 48;
const APP_BAR_DESKTOP = 48;

const StyledRoot = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100vh",
  backgroundColor: theme.palette.palette_style.background.default,
  color: theme.palette.palette_style.text.primary,
  overflow: "hidden",
}));

const Content = styled("div")(
  ({ theme, disableOverflow }: { theme: any; disableOverflow: boolean }) => ({
    width: "100%",
    overflow: disableOverflow ? "hidden" : "auto",

    // [theme.breakpoints.up('lg')]: {
    //   paddingLeft: theme.spacing(1),
    //   paddingRight: theme.spacing(1),
    //   paddingBottom: theme.spacing(1)
    // },
    // paddingTop: theme.spacing(1)
  })
);

type MainLayoutProps = {
  children: ReactNode;
  removeFooter?: boolean;
  disableOverflow?: boolean;
  currentView: View;
  apiResponseStatus: ApiResponseStatus;
  getAvailableFieldUiTypes: () => void;
  getSearchTypes: () => void;
  getDateFormat: () => void;
};

const MainLayout = ({
  children,
  removeFooter = false,
  disableOverflow = false,
  currentView,
  apiResponseStatus,
  getAvailableFieldUiTypes,
  getSearchTypes,
  getDateFormat
}: MainLayoutProps) => {
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    if (router.isReady) {
      getAvailableFieldUiTypes();
      getSearchTypes();
      getDateFormat();
    }
  }, [router.isReady]);

  const Main = styled("div")(({ theme }) => ({
    flexGrow: 1,
    paddingTop: APP_BAR_MOBILE,
    paddingBottom: 0,
    display: "flex",
    height: `${windowHeight - 40}px`,
    overflow: "hidden",
    [theme.breakpoints.up("md")]: {
      height: "calc(100vh - 40px)",
      overflow: "hidden",
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: APP_BAR_DESKTOP,
      paddingBottom: 0,
      overflow: "hidden",
    },
  }));

  return apiResponseStatus === ApiResponseStatus.Success ?(
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Main>
        <Nav openNav={open} onCloseNav={() => setOpen(false)} />
        <Content theme={theme} disableOverflow={disableOverflow}>
          {children}
        </Content>
      </Main>
      {removeFooter == true && currentView && <Footer />}
    </StyledRoot>
  ):
  (
    <>
    <Error errorStatus={apiResponseStatus} />
    </>
  )
};

const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
  apiResponseStatus: state.admin.apiResponseStatus
});

const mapDispatchToProps = {
  getAvailableFieldUiTypes,
  getSearchTypes,
  getDateFormat
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
