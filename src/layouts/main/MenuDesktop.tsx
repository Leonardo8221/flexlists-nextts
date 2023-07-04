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
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/router";

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
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openDropdown = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseDropdown = () => {
      setAnchorEl(null);
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
          onClick={handleClick}
        >
          {title}
        </LinkStyle>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openDropdown}
          onClose={handleCloseDropdown}
          MenuListProps={{
            "aria-labelledby": "docs-btn",
          }}
        >
          <MenuItem
            component={"a"}
            href="main/documentation"
            onClick={handleCloseDropdown}
          >
            Profile
          </MenuItem>
          <MenuItem onClick={handleCloseDropdown}>My account</MenuItem>
          <MenuItem onClick={handleCloseDropdown}>Logout</MenuItem>
        </Menu>
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
