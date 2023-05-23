import { useState, ReactNode } from "react";
import { styled } from "@mui/material/styles";
import Header from "./header";
import Nav from "./nav";
import Footer from "./footer";

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

const Content = styled("div")(({ theme }) => ({
  backgroundColor: "#fafafa",
  width: "100%",
  // [theme.breakpoints.up('lg')]: {
  //   paddingLeft: theme.spacing(1),
  //   paddingRight: theme.spacing(1),
  //   paddingBottom: theme.spacing(1)
  // },
  // paddingTop: theme.spacing(1)
}));

type MainLayoutProps = {
  children: ReactNode;
  removeFooter?: boolean;
};

export default function MainLayout({
  children,
  removeFooter = false,
}: MainLayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Main>
        <Nav openNav={open} onCloseNav={() => setOpen(false)} />
        <Content>{children}</Content>
      </Main>
      {removeFooter == false && <Footer />}
    </StyledRoot>
  );
}
