import { NavLink as RouterLink } from "react-router-dom";
import { Box, List, ListItemText, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { StyledNavItem, StyledNavItemIcon } from "./styles";
import { useTheme } from "@mui/material/styles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

type NavSectionProps = {
  data: any[];
  open: boolean;
};

export default function NavSection({
  data = [],
  open = false,
  ...other
}: NavSectionProps) {
  const router = useRouter();

  return (
    <Box {...other}>
      <List
        disablePadding
        sx={{
          p: 1,
          position: "relative",
          minHeight: "510px",
          height: "calc(100vh - 110px)",
          overflow: "auto",
        }}
      >
        {data.map((item) => (
          <NavItem
            key={item.title}
            item={item}
            open={open}
            pathname={router.pathname}
          />
        ))}
      </List>
    </Box>
  );
}

type NavItemProps = {
  item: any;
  open: boolean;
  pathname: string;
};

function NavItem({ item, open, pathname }: NavItemProps) {
  const { title, path, icon } = item;
  const theme = useTheme();
  return (
    <StyledNavItem
      // component={RouterLink}
      to={path}
      sx={{
        position: title === "Information" ? "absolute" : "relative",
        bottom: title === "Information" ? "20px" : "inherit",
        marginBottom: title === "Information" ? 0 : 3,
        width: !open ? 42 : "inherit",
      }}
    >
      {pathname === "/dashboard" ? (
        <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
      ) : (
        <Tooltip title={title}>
          <Box
            // component="span"
            className="svg-color"
            sx={{
              width: 42,
              height: 42,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // backgroundImage: `url(/assets/icons/navbar/${
              //   pathname === path ? icon + "Active" : icon
              // }.svg)`,
              // backgroundSize: "cover",
              // backgroundRepeat: "no-repeat",
              borderRadius: "8px",
              backgroundColor:
                pathname === path
                  ? theme.palette.palette_style.primary.main
                  : theme.palette.palette_style.primary.lighter,
              "& .MuiSvgIcon-root": {
                color:
                  pathname === path
                    ? theme.palette.palette_style.text.white
                    : theme.palette.palette_style.primary.main,
              },
            }}
          >
            {icon}
          </Box>
        </Tooltip>
      )}

      {open && (
        <ListItemText
          disableTypography
          primary={title}
          sx={{ marginLeft: 2 }}
        />
      )}
    </StyledNavItem>
  );
}
