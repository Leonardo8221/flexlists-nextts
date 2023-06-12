import { useState, ReactNode, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Header from "./header";
import Nav from "./nav";
import Footer from "./footer";
import { getAvailableFieldUiTypes } from "src/redux/actions/viewActions";
import { connect } from 'react-redux';
import { useRouter } from "next/router";

const APP_BAR_MOBILE = 48;
const APP_BAR_DESKTOP = 48;

const StyledRoot = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  backgroundColor: theme.palette.palette_style.background.default,
  color: theme.palette.palette_style.text.primary,
}));

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  paddingTop: APP_BAR_MOBILE,
  paddingBottom: 0,
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP,
    paddingBottom: 0,
  },
  display: "flex",
  height: "calc(100% - 40px)",
  overflow: "hidden",
  [theme.breakpoints.up("md")]: {
    height: "calc(100vh - 40px)",
  },
}));

const Content = styled("div")(
  ({ theme, disableOverflow }: { theme: any; disableOverflow: boolean }) => ({
    backgroundColor: "#fafafa",
    width: "100%",
    overflow: disableOverflow ? "hidden" : "scroll",

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
  getAvailableFieldUiTypes: ()=>void;
};

 const MainLayout = ({
  children,
  removeFooter = false,
  disableOverflow = false,
  getAvailableFieldUiTypes
}: MainLayoutProps) => {
  const theme = useTheme();
  const router = useRouter()
  const [open, setOpen] = useState(false);
  useEffect(()=>{
     if(router.isReady)
     {
       getAvailableFieldUiTypes();
     }
  },[router.isReady])
  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Main>
        <Nav openNav={open} onCloseNav={() => setOpen(false)} />
        <Content theme={theme} disableOverflow={disableOverflow}>{children}</Content>
      </Main>
      {removeFooter == false && <Footer />}
    </StyledRoot>
  );
}
const mapStateToProps = (state: any) => ({
 
});

const mapDispatchToProps = {
  getAvailableFieldUiTypes
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
