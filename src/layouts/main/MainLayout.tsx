import { ReactNode, useState } from "react";
// @mui
import { styled } from "@mui/material/styles";
//
import MainNavbar from "./MainNavbar";
import { TranslationText } from "src/models/SharedModels";
import LoadingPage from "src/pages/LoadingPage";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 4;
const APP_BAR_DESKTOP = 32;

const StyledRoot = styled("div")({
  // display: 'flex',
  // minHeight: '100%',
  // overflow: 'hidden',
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "hidden",
  minHeight: "100%",
  // paddingTop: APP_BAR_MOBILE + 24,
  // paddingBottom: theme.spacing(10),
  position: "relative",
  [theme.breakpoints.up("lg")]: {
    // paddingTop: APP_BAR_DESKTOP + 24,
  },
}));

// ----------------------------------------------------------------------
type MainLayoutProps = {
  children: ReactNode;
  translations: TranslationText[];
};
export default function MainLayout({
  children,
  translations,
}: MainLayoutProps) {
  const [open, setOpen] = useState(false);

  return (
      <StyledRoot>
        <MainNavbar translations={translations} />
        <Main>
          <div>{children}</div>
        </Main>
      </StyledRoot>
  );
}
