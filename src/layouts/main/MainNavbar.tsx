import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  AppBar,
  Toolbar,
  Container,
  Typography,
  Link,
} from "@mui/material";
import useOffSetTop from "src/hooks/useOffSetTop";
import Logo from "src/components/logo";
import { MHidden } from "src/components/@material-extend";
import MenuDesktop from "./MenuDesktop";
// import navConfig from "./MenuConfig";
import { useRouter } from "next/router";
import LanguagePopover from "../LanguagePopover";
import { TranslationText } from "src/models/SharedModels";
import { getTranslations, getTranslation } from "src/utils/i18n";
import MenuMobile from "./MenuMobile";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Icon } from "@iconify/react";
import homeFill from "@iconify/icons-eva/home-fill";
import fileFill from "@iconify/icons-eva/file-fill";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(["height", "background-color"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("md")]: {
    height: APP_BAR_DESKTOP,
  },
}));

const ToolbarShadowStyle = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: "auto",
  borderRadius: "50%",
  position: "absolute",
  width: `calc(100% - 48px)`,
  boxShadow: theme.shadows[8],
}));

const LogoStyle = styled("span")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  fontFamily: "system-ui",
  gap: 2,
  fontWeight: 600,
  fontSize: "30px",
  lineHeight: "40px",
  color: "#333333",
  "& span": {
    textDecoration: "none",
  },
}));

const LogoTitleStyle = styled("span")(({ theme }) => ({
  color: "#54A6FB",
}));

type ContentProps = {
  translations: TranslationText[];
};

export default function MainNavbar({
  translations,
}: ContentProps) {
  const t = (key: string): string => {
    if (!translations) {
      return key;

    }
    return getTranslation(key, translations);
  };
  const isOffset = useOffSetTop(100);
  const router = useRouter();
  var pathname = router.pathname;
  const isHome = pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const ICON_SIZE = {
    width: 22,
    height: 22,
  };

  const navConfig = [
    {
      title: t("Product"),
      icon: <Icon icon={homeFill} {...ICON_SIZE} />,
      path: "/product",
    },
    {
      title: t("Solutions"),
      icon: <Icon icon={fileFill} {...ICON_SIZE} />,
      path: "/solutions",
    },
    {
      title: t("Pricing"),
      icon: <Icon icon={fileFill} {...ICON_SIZE} />,
      path: "/pricing",
    },
    {
      title: t("Marketplace"),
      icon: <Icon icon={fileFill} {...ICON_SIZE} />,
      path: "/marketplace",
    },
  
    {
      title: t("Documentation"),
      icon: <Icon icon={fileFill} {...ICON_SIZE} />,
      path: "/documentation",
    },
  ];

  const gotoSignin = async () => {
    await router.push({
      pathname: "/auth/login",
    });
  };
  const gotoSignup = async () => {
    await router.push({
      pathname: "/auth/register",
    });
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: "white" }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            bgcolor: "background.default",
            height: { lg: APP_BAR_DESKTOP - 16 },
          }),
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link sx={{ textDecoration: "none" }} href="/">
            <LogoStyle>
              <Logo />
              <Box>
                <LogoTitleStyle>flex</LogoTitleStyle>lists
              </Box>
            </LogoStyle>
          </Link>

          <MHidden width="lgDown">
            <MenuDesktop
              translations={translations}
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig.map((item) => ({
                ...item,
                title: t(item.title),
              }))}
            />
          </MHidden>

          <Box
            sx={{
              flexGrow: 1,
            }}
          ></Box>
          <LanguagePopover translations={translations} />

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
              // width: "80%",
            }}
          >
            <Button variant="contained" onClick={() => gotoSignup()}>
              {t("Sign up")}
            </Button>

            <Button variant="outlined" onClick={() => gotoSignin()}>
              {t("Sign in")}
            </Button>
          </Box>

          <MHidden width="lgUp">
            {/* <MenuMobile
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            /> */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
              {/* <LanguagePopover translations={translations} /> */}

              <Button variant="text" size="small" onClick={()=>toggleMobileMenu()}>
                {
                  !isMobileMenuOpen && <MenuIcon sx={{ fontSize: 36 }}  />
                }
                {
                  isMobileMenuOpen && <CloseIcon sx={{ fontSize: 36 }} />
                }
                
              </Button>
              <MenuMobile
                translations={translations}
                isMenuMobileOpen={isMobileMenuOpen}
                isOffset={isOffset}
                isHome={isHome}
                navConfig={navConfig.map((item) => ({
                  ...item,
                  title: t(item.title),
                }))}
              />
            </Box>
          </MHidden>
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
