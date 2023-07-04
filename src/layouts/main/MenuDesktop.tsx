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
} from "@mui/material";
import { useRouter } from "next/router";
import { light } from "@mui/material/styles/createPalette";
// --------------------------------ICONS--------------------------------------

import { OndemandVideo as TutorialsIcon } from "@mui/icons-material/";
import { Topic as DocsIcon } from "@mui/icons-material/";
import { CoPresent as WebinarsIcon } from "@mui/icons-material/";
import { Newspaper as BlogIcon } from "@mui/icons-material/";

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
  isOpen: boolean;
  onOpen: (value: any) => void;
  onClose: (value: any) => void;
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
  isOpen,
  isOffset,
  onOpen,
  onClose,
  styles,
}: MenuDesktopItemProps) {
  const { title, path, children } = item;
  const isActive = pathname === path;

  if (children) {
    return (
      <div key={title}>
        <LinkStyle
          onClick={onOpen}
          sx={{
            display: "flex",
            cursor: "pointer",
            alignItems: "center",
            textDecoration: "none",
            ...(isHome && { color: "text.primary" }),
            ...(isOffset && { color: "text.primary" }),
            ...(isOpen && { opacity: 0.48 }),
          }}
        >
          {title}
          <Box
            component={Icon}
            icon={isOpen ? arrowIosUpwardFill : arrowIosDownwardFill}
            sx={{ ml: 0.5, width: 16, height: 16 }}
          />
        </LinkStyle>

        <Popover
          open={isOpen}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 80, left: 0 }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={onClose}
          PaperProps={{
            sx: {
              px: 3,
              pt: 5,
              pb: 3,
              right: 16,
              margin: "auto",
              maxWidth: 1280,
              borderRadius: 2,
              boxShadow: (theme) => theme.shadows[24],
            },
          }}
        >
          <Grid container spacing={3}>
            {children.map((list: { subheader: any; items: any }) => {
              const { subheader, items } = list;

              return (
                <Grid
                  key={subheader}
                  item
                  xs={12}
                  md={subheader === "Dashboard" ? 6 : 2}
                >
                  <List disablePadding>
                    <ListSubheader
                      disableSticky
                      disableGutters
                      sx={{
                        display: "flex",
                        lineHeight: "unset",
                        alignItems: "center",
                        color: "text.primary",
                        typography: "overline",
                      }}
                    >
                      <IconBullet type="subheader" /> {subheader}
                    </ListSubheader>

                    {items.map((item: ItemProps) => (
                      <ListItem
                        key={item.path}
                        // to={item.path}
                        // component={RouterLink}
                        // underline="none"
                        sx={{
                          p: 0,
                          mt: 3,
                          typography: "body2",
                          color: "text.secondary",
                          transition: (theme) =>
                            theme.transitions.create("color"),
                          "&:hover": { color: "text.primary" },
                          ...(item.path === pathname && {
                            typography: "subtitle2",
                            color: "text.primary",
                          }),
                        }}
                      >
                        {item.title === "Dashboard" ? (
                          <CardActionArea
                            sx={{
                              py: 5,
                              px: 10,
                              borderRadius: 2,
                              color: "primary.main",
                              bgcolor: "background.neutral",
                            }}
                          >
                            <Box
                              component={motion.img}
                              whileTap="tap"
                              whileHover="hover"
                              variants={{
                                hover: { scale: 1.02 },
                                tap: { scale: 0.98 },
                              }}
                              src="/assets/illustrations/illustration_dashboard.png"
                            />
                          </CardActionArea>
                        ) : (
                          <>
                            <IconBullet />
                            {item.title}
                          </>
                        )}
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              );
            })}
          </Grid>
        </Popover>
      </div>
    );
  }

  if (title === "Documentation") {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
      setIsOpen(true);
    };

    const handleClose = () => {
      setIsOpen(false);
    };
    styles = {
      docsWrapper: {
        position: "absolute",
        top: "96px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "white",
        width: "50%",
        color: "black",
        display: "flex",
        gap: 4,
        padding: 2,
        boxShadow: "0 12px 24px 0 rgba(0,0,0,.1)",
      },
      docsTitle: {
        textTransform: "uppercase",
        color: "#666",
        letterSpacing: "2px",
      },
      docsLink: {
        textDecoration: "none",
        color: "#111",
        py: 0.5,
        "&:hover": {
          opacity: 0.75,
        },
      },
    };
    return (
      <>
        <LinkStyle
          id="docs-btn"
          sx={{
            textDecoration: "none",
            cursor: "pointer",

            //   ...(isHome && { color: "common.white" }),
            //   ...(isOffset && { color: "text.primary" }),
            //   ...(isActive && { color: "primary.main" }),
          }}
          onClick={handleOpen}
        >
          {title}
        </LinkStyle>
        {isOpen && (
          <Box sx={styles?.docsWrapper} onClick={handleClose}>
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <DocsIcon sx={{ color: "#903cde" }} />
                <Typography variant="subtitle2" sx={styles?.docsTitle}>
                  Docs
                </Typography>
              </Box>
              <Divider light sx={{ my: 2 }}></Divider>
              <Link sx={styles?.docsLink} href="/documentation">
                Adding new list
              </Link>
              <Link sx={styles?.docsLink} href="/documentation">
                Inviting users
              </Link>
              <Link sx={styles?.docsLink} href="/documentation">
                Inviting groups
              </Link>
              <Link sx={styles?.docsLink} href="/documentation">
                Key sharing
              </Link>
              <Link sx={styles?.docsLink} href="/documentation">
                Creating new view
              </Link>
              <Link sx={styles?.docsLink} href="/documentation">
                View permissions
              </Link>
              <Link sx={styles?.docsLink} href="/documentation">
                Comments section
              </Link>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TutorialsIcon sx={{ color: "#deb33c" }} />
                <Typography variant="subtitle2" sx={styles?.docsTitle}>
                  Tutorials
                </Typography>
              </Box>
              <Divider light sx={{ my: 2 }}></Divider>
              <Link sx={styles?.docsLink} href="/documentation">
                Adding new list
              </Link>
              <Link sx={styles?.docsLink} href="/documentation">
                Inviting users
              </Link>
              <Link sx={styles?.docsLink} href="/documentation">
                Inviting groups
              </Link>
              <Link sx={styles?.docsLink} href="/documentation">
                Key sharing
              </Link>
              <Link sx={styles?.docsLink} href="/documentation">
                List sharing
              </Link>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <WebinarsIcon sx={{ color: "#3c8dde" }} />
                <Typography variant="subtitle2" sx={styles?.docsTitle}>
                  Webinars
                </Typography>
              </Box>
              <Divider light sx={{ my: 2 }}></Divider>
              <Link sx={styles?.docsLink} href="/documentation">
                Adding new list
              </Link>
              <Link sx={styles?.docsLink} href="/documentation">
                Inviting users
              </Link>
              <Link sx={styles?.docsLink} href="/documentation">
                Inviting groups
              </Link>
              <Link sx={styles?.docsLink} href="/documentation">
                Key sharing
              </Link>
              <Link sx={styles?.docsLink} href="/documentation">
                List sharing
              </Link>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <BlogIcon sx={{ color: "#de3c3c" }} />
                <Typography variant="subtitle2" sx={styles?.docsTitle}>
                  Blogs
                </Typography>
              </Box>
              <Divider light sx={{ my: 2 }}></Divider>
              <Link sx={styles?.docsLink} href="/documentation">
                Adding new list
              </Link>
              <Link sx={styles?.docsLink} href="/documentation">
                Inviting users
              </Link>
              <Link sx={styles?.docsLink} href="/documentation">
                Inviting groups
              </Link>
              <Link sx={styles?.docsLink} href="/documentation">
                Key sharing
              </Link>
              <Link sx={styles?.docsLink} href="/documentation">
                List sharing
              </Link>
            </Box>
          </Box>
        )}
      </>
    );
  }

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
      {title}
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
          isOpen={open}
          onOpen={handleOpen}
          onClose={handleClose}
          isOffset={isOffset}
          isHome={isHome}
        />
      ))}
    </Stack>
  );
}
