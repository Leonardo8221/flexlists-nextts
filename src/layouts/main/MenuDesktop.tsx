import PropTypes from "prop-types";
import { Icon } from "@iconify/react";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import * as React from "react";
import arrowIosUpwardFill from "@iconify/icons-eva/arrow-ios-upward-fill";
import arrowIosDownwardFill from "@iconify/icons-eva/arrow-ios-downward-fill";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Grid,
  List,
  Stack,
  Popover,
  ListItem,
  ListSubheader,
  CardActionArea,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import { light } from "@mui/material/styles/createPalette";
// --------------------------------ICONS--------------------------------------

import { OndemandVideo as TutorialsIcon } from "@mui/icons-material/";
import { Topic as DocsIcon } from "@mui/icons-material/";
import { CoPresent as WebinarsIcon } from "@mui/icons-material/";
import { Newspaper as BlogIcon } from "@mui/icons-material/";
import DocumentationMenu from "src/components/menu/DocumentationMenu";
import { set } from "lodash";

// ----------------------------------------------------------------------

const LinkStyle = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  marginRight: theme.spacing(5),
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shortest,
  }),
  "&:hover": {
    opacity: 0.48,
    textDecoration: "none",
  },
}));

// ----------------------------------------------------------------------

IconBullet.propTypes = {
  type: PropTypes.oneOf(["subheader", "item"]),
};

function IconBullet({ type = "item" }) {
  return (
    <Box sx={{ width: 24, height: 16, display: "flex", alignItems: "center" }}>
      <Box
        component="span"
        sx={{
          ml: "2px",
          width: 4,
          height: 4,
          borderRadius: "50%",
          bgcolor: "currentColor",
          ...(type !== "item" && {
            ml: 0,
            width: 8,
            height: 2,
            borderRadius: 2,
          }),
        }}
      />
    </Box>
  );
}

type MenuDesktopItemProps = {
  item: ItemProps;
  pathname: string;
  isHome: boolean;
  isOffset: boolean;
  styles?: any;
};

type ItemProps = {
  title: any;
  path?: string;
  icon?: string;
  children?: any;
};

function MenuDesktopItem({
  item,
  pathname,
  isHome,
  isOffset,
  styles,
}: MenuDesktopItemProps) {
  const { title, path, children } = item;
  const isActive = pathname === path;
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = async () => {
    if (title === "Documentation") {
      setIsOpen(true);
    } else {
      if (path) {
        await router.push({ pathname: path });
      }
    }
  };
  // if (children) {
  //   return (
  //     <div key={title}>
  //       <LinkStyle
  //         onClick={handleOpen}
  //         sx={{
  //           display: "flex",
  //           cursor: "pointer",
  //           alignItems: "center",
  //           textDecoration: "none",
  //           ...(isHome && { color: "text.primary" }),
  //           ...(isOffset && { color: "text.primary" }),
  //           ...(isOpen && { opacity: 0.48 }),
  //         }}
  //       >
  //         {title}
  //         <Box
  //           component={Icon}
  //           icon={isOpen ? arrowIosUpwardFill : arrowIosDownwardFill}
  //           sx={{ ml: 0.5, width: 16, height: 16 }}
  //         />
  //       </LinkStyle>

  //       <Popover
  //         open={isOpen}
  //         anchorReference="anchorPosition"
  //         anchorPosition={{ top: 80, left: 0 }}
  //         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  //         transformOrigin={{ vertical: "top", horizontal: "center" }}
  //         onClose={handleClose}
  //         PaperProps={{
  //           sx: {
  //             px: 3,
  //             pt: 5,
  //             pb: 3,
  //             right: 16,
  //             margin: "auto",
  //             maxWidth: 1280,
  //             borderRadius: 2,
  //             boxShadow: (theme) => theme.shadows[24],
  //           },
  //         }}
  //       >
  //         <Grid container spacing={3}>
  //           {children.map((list: { subheader: any; items: any }) => {
  //             const { subheader, items } = list;

  //             return (
  //               <Grid
  //                 key={subheader}
  //                 item
  //                 xs={12}
  //                 md={subheader === "Dashboard" ? 6 : 2}
  //               >
  //                 <List disablePadding>
  //                   <ListSubheader
  //                     disableSticky
  //                     disableGutters
  //                     sx={{
  //                       display: "flex",
  //                       lineHeight: "unset",
  //                       alignItems: "center",
  //                       color: "text.primary",
  //                       typography: "overline",
  //                     }}
  //                   >
  //                     <IconBullet type="subheader" /> {subheader}
  //                   </ListSubheader>

  //                   {items.map((item: ItemProps) => (
  //                     <ListItem
  //                       key={item.path}
  //                       // to={item.path}
  //                       // component={RouterLink}
  //                       // underline="none"
  //                       sx={{
  //                         p: 0,
  //                         mt: 3,
  //                         typography: "body2",
  //                         color: "text.secondary",
  //                         transition: (theme) =>
  //                           theme.transitions.create("color"),
  //                         "&:hover": { color: "text.primary" },
  //                         ...(item.path === pathname && {
  //                           typography: "subtitle2",
  //                           color: "text.primary",
  //                         }),
  //                       }}
  //                     >
  //                       {item.title === "Dashboard" ? (
  //                         <CardActionArea
  //                           sx={{
  //                             py: 5,
  //                             px: 10,
  //                             borderRadius: 2,
  //                             color: "primary.main",
  //                             bgcolor: "background.neutral",
  //                           }}
  //                         >
  //                           <Box
  //                             component={motion.img}
  //                             whileTap="tap"
  //                             whileHover="hover"
  //                             variants={{
  //                               hover: { scale: 1.02 },
  //                               tap: { scale: 0.98 },
  //                             }}
  //                             src="/assets/illustrations/illustration_dashboard.png"
  //                           />
  //                         </CardActionArea>
  //                       ) : (
  //                         <>
  //                           <IconBullet />
  //                           {item.title}
  //                         </>
  //                       )}
  //                     </ListItem>
  //                   ))}
  //                 </List>
  //               </Grid>
  //             );
  //           })}
  //         </Grid>
  //       </Popover>
  //     </div>
  //   );
  // }

  return (
    <LinkStyle
      // to={path}
      // component={RouterLink}
      sx={{
        cursor: "pointer",
        textDecoration: "none",
        ...(isHome && { color: "text.primary" }),
        ...(isOffset && { color: "text.primary" }),
        ...(isActive && { color: "primary.main" }),
      }}
    >
      <span onClick={(e) => handleOpen()}>{title}</span>
      {title === "Documentation" && (
        <Popover
          open={isOpen}
          anchorReference="anchorPosition"
          onClose={handleClose}
          anchorPosition={{ top: 96, left: 0 }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          PaperProps={{
            sx: {
              p: 3,
              right: 16,
              margin: "auto",
              minHeight: 500,
              maxWidth: 1280,
              borderRadius: 2,
              boxShadow: (theme) => theme.shadows[24],
            },
          }}
        >
          <DocumentationMenu translations={{} as any} />
        </Popover>
      )}
    </LinkStyle>
  );
}

type MenuDesktopProps = {
  isOffset: boolean;
  isHome: boolean;
  navConfig: any[];
};

export default function MenuDesktop({
  isOffset,
  isHome,
  navConfig,
}: MenuDesktopProps) {
  const router = useRouter();
  const pathname = router.pathname;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack direction="row" sx={{ ml: 6 }}>
      {navConfig.map((link: ItemProps) => (
        <MenuDesktopItem
          key={link.title}
          item={link}
          pathname={pathname}
          isOffset={isOffset}
          isHome={isHome}
        />
      ))}
    </Stack>
  );
}
