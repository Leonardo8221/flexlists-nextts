import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  AppBar,
  Toolbar,
  Container,
  Typography,
} from "@mui/material";
import useOffSetTop from "src/hooks/useOffSetTop";
import Logo from "src/components/logo";
import { MHidden } from "src/components/@material-extend";
import MenuDesktop from "./MenuDesktop";
// import MenuMobile from './MenuMobile';
// import navConfig from "./MenuConfig";
import { useRouter } from "next/router";
import Link from "next/link";
import { Icon } from "@iconify/react";
import homeFill from "@iconify/icons-eva/home-fill";
import fileFill from "@iconify/icons-eva/file-fill";
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";

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
  display: "-webkit-inline-box",
  textDecoration: "none",
  fontFamily: "system-ui",
  fontWeight: 600,
  fontSize: "30px",
  lineHeight: "40px",
  color: "#333333",
}));

const LogoTitleStyle = styled("span")(({ theme }) => ({
  color: "#54A6FB",
}));

type MainNavbarProps = {
  translations: TranslationText[];
};

const MainNavbar = ({
  translations
}: MainNavbarProps) => {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const isOffset = useOffSetTop(100);
  const router = useRouter();
  var pathname = router.pathname;
  const isHome = pathname === "/";

  const ICON_SIZE = {
    width: 22,
    height: 22,
  };
  
  const navConfig = [
    {
      title: t("Docs"),
      icon: <Icon icon={homeFill} {...ICON_SIZE} />,
      path: "/docs",
      children: [
        {
          title: t("Adding New List"),
          path: "/documentation/docs/adding_new_list"
        },
        {
          title: t("Inviting Users"),
          path: "/documentation/docs/inviting_users"
        },
        {
          title: t("Inviting Groups"),
          path: "/documentation/docs/inviting_groups"
        },
        {
          title: t("Key Sharing"),
          path: "/documentation/docs/key_sharing"
        },
        {
          title: t("Creating New View"),
          path: "/documentation/docs/creating_new_view"
        },
        {
          title: t("View Permissions"),
          path: "/documentation/docs/view_permissions"
        },
        {
          title: t("Comments Section"),
          path: "/documentation/docs/comments_section"
        }
      ]
    },
    {
      title: t("Tutorials"),
      icon: <Icon icon={fileFill} {...ICON_SIZE} />,
      path: "/tutorials",
      children: [
        {
          title: t("Adding New List"),
          path: "/documentation/tutorials/adding_new_list"
        },
        {
          title: t("Inviting Users"),
          path: "/documentation/tutorials/inviting_users"
        },
        {
          title: t("Inviting Groups"),
          path: "/documentation/tutorials/inviting_groups"
        },
        {
          title: t("Key Sharing"),
          path: "/documentation/tutorials/key_sharing"
        },
        {
          title: t("List Sharing"),
          path: "/documentation/tutorials/list_sharing"
        }
      ]
    },
    {
      title: t("Webinars"),
      icon: <Icon icon={fileFill} {...ICON_SIZE} />,
      path: "/webinars",
      children: [
        {
          title: t("Adding New List"),
          path: "/documentation/webinars/adding_new_list"
        },
        {
          title: t("Inviting Users"),
          path: "/documentation/webinars/inviting_users"
        },
        {
          title: t("Inviting Groups"),
          path: "/documentation/webinars/inviting_groups"
        },
        {
          title: t("Key Sharing"),
          path: "/documentation/webinars/key_sharing"
        },
        {
          title: t("List Sharing"),
          path: "/documentation/webinars/list_sharing"
        }
      ]
    },
    {
      title: t("Blogs"),
      icon: <Icon icon={fileFill} {...ICON_SIZE} />,
      path: "/blogs",
      children: [
        {
          title: t("Adding New List"),
          path: "/documentation/blogs/adding_new_list"
        },
        {
          title: t("Inviting Users"),
          path: "/documentation/blogs/inviting_users"
        },
        {
          title: t("Inviting Groups"),
          path: "/documentation/blogs/inviting_groups"
        },
        {
          title: t("Key Sharing"),
          path: "/documentation/blogs/key_sharing"
        },
        {
          title: t("List Sharing"),
          path: "/documentation/blogs/list_sharing"
        }
      ]
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

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: "white" }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            bgcolor: "background.default",
            height: { md: APP_BAR_DESKTOP - 16 },
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
          <Link href="/">
            <LogoStyle>
              <Logo />
              <LogoTitleStyle>flex</LogoTitleStyle>lists
            </LogoStyle>
          </Link>

          <MHidden width="mdDown">
            <MenuDesktop
              translations={translations}
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />

            <Box sx={{ flexGrow: 1 }} />

            <Button variant="contained" onClick={() => gotoSignup()}>
              {t("Sign up, it's free")}
            </Button>

            <Typography
              sx={{ ml: 1, color: "text.secondary", cursor: "pointer" }}
              onClick={() => gotoSignin()}
            >
              {t("Sign in")}
            </Typography>
          </MHidden>

          {/* <MHidden width="mdUp">
            <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />
          </MHidden> */}
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
};

export default MainNavbar;