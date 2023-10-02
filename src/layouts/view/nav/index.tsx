import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Drawer } from '@mui/material';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
// import navConfig from './config';
import useResponsive from '../../../hooks/useResponsive';
import Logo from '../../../components/logo';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { PATH_MAIN } from "src/routes/paths";
import GridViewIcon from "@mui/icons-material/GridView";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import AddIcon from "@mui/icons-material/Add";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';

const NAV_WIDTH = 64;
const APP_BAR_DESKTOP = 80;

type NavProps = {
  openNav: boolean;
  translations: TranslationText[];
  onCloseNav: ()=>void;
};

export default function Nav({ openNav, translations, onCloseNav }:NavProps) {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const router = useRouter();
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'lg');

  const navConfig = [
    {
      title: t("Create New List"),
      path: PATH_MAIN.chooseTemplate,
      icon: <AddIcon />,
      // icon: "Favourites_plus",
    },
    {
      title: t("My Lists"),
      path: PATH_MAIN.lists,
      // icon: "List",
      icon: <ListAltOutlinedIcon />,
    },
    {
      title: t("My Views"),
      path: PATH_MAIN.views,
      // icon: "List",
      icon: <GridViewIcon />,
    },
    {
      title: t("Groups"),
      path: PATH_MAIN.groups,
      // icon: "Groups",
      icon: <Groups2OutlinedIcon />,
    },
    {
      title: t("Integrations"),
      path: PATH_MAIN.integrations,
      icon: <ExtensionOutlinedIcon/>,
      
    },
    {
      title: t("Information"),
      path: "/",
      // icon: "Info",
      icon: <InfoOutlinedIcon />,
    },
  ];

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
      }}
    >
      <NavSection data={navConfig} open={openNav} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
        paddingTop: 3,
      }}
    >
      {!openNav && isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              position: 'relative',
              border: 'none',
              height: `calc(100vh - ${APP_BAR_DESKTOP + 25}px)`,
              backgroundColor: theme.palette.palette_style.background.default,
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: '280px', paddingLeft: 2, backgroundColor: theme.palette.palette_style.background.default },
          }}
        >
          <Link href="/">
            <Box sx={{ px: 2.5, py: 3, display: 'inline-flex', marginLeft: 2 }}>
              <Logo />
            </Box>
          </Link>
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
