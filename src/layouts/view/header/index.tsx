import { styled, useTheme } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, IconButton } from "@mui/material";
import Logo from "../../../components/logo";
import DarkLogo from "src/components/dark-logo/";
import NotificationsPopover from "../../NotificationsPopover";
import SearchBarContainer from "../../../components/search-bar/SearchBarContainer";
import SearchBarMin from "../../../components/search-bar/SearchBarMin";
import useResponsive from "../../../hooks/useResponsive";
import Link from "next/link";
import { connect } from "react-redux";
import AccountPopover from "src/layouts/AccountPopover";
import LanguagePopover from "src/layouts/LanguagePopover";
import MenuIcon from "@mui/icons-material/Menu";
import { TranslationText } from "src/models/SharedModels";
import { AuthValidate } from "src/models/AuthValidate";

const HEADER_MOBILE = 48;
const HEADER_DESKTOP = 48;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.palette_style.background.default,
  boxShadow: "none",
  borderBottom: "1px",
  borderBottomStyle: "solid",
  borderColor: theme.palette.palette_style.border.default,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    height: HEADER_MOBILE,
    padding: theme.spacing(1, 1),
  },
  [theme.breakpoints.up("lg")]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(1, 2),
  },
  minHeight: "inherit !important",
}));

type HeaderProps = {
  translations: TranslationText[];
  onOpenNav: (value: any) => void;
  authValidate: AuthValidate
};

export function Header({
  translations,
  onOpenNav,
  authValidate
}: HeaderProps) {
  const theme = useTheme();
  const isMobile = useResponsive("down", "sm");

  return (
    <StyledRoot>
      <StyledToolbar>
        <Box onClick={onOpenNav} sx={{ cursor: "pointer" }}>
          <MenuIcon
            sx={{
              color: theme.palette.palette_style.primary.main,
            }}
          />
        </Box>

        {/* <IconButton
          onClick={onOpenNav}
          sx={{
            mr: { md: 1 },
            color: theme.palette.palette_style.text.primary,
          }}
        >
          <MenuIcon
            sx={{
              color: theme.palette.palette_style.primary.main,
            }}
          />
          <Box
            component="span"
            className="svg-color"
            sx={{
              width: 24,
              height: 24,
              display: "inline-block",
              bgcolor: "#54A6FB",
              mask: `url(/assets/icons/navbar/menu.svg) no-repeat center / contain`,
              WebkitMask: `url(/assets/icons/navbar/menu.svg) no-repeat center / contain`,
            }}
          />
        </IconButton> */}

        <Link style={{ display: "flex" }} href="/">
          <Box
            sx={{
              px: { xs: 1, md: 2.5 },
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {theme.palette.mode === "light" ? <Logo /> : <DarkLogo />}
          </Box>
        </Link>
        {
          authValidate.isUserValidated && (
            <>
            {isMobile ? <SearchBarContainer /> : <SearchBarMin />}
            </>
          )
        }
        

        <Box sx={{ flexGrow: 1 }} />
        {/* <LanguagePopover /> */}
        {(
          <Stack
            direction="row"
            alignItems="center"
            spacing={{
              xs: 0.5,
              sm: 1,
            }}
          >
            {/* <NotificationsPopover /> */}
            {
              authValidate.isUserValidated && (
                <AccountPopover translations={translations} />
              )
            }
           
          </Stack>
        )}
      </StyledToolbar>
    </StyledRoot>
  );
}
const mapStateToProps = (state: any) => ({
  authValidate: state.admin.authValidate
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
