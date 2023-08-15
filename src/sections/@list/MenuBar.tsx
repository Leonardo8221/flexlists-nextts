import { useState, useEffect } from "react";
import { Box, TextField, Modal, Typography, Grid, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import ListViewForm from "../@listView/ListViewForm";
import { View } from "src/models/SharedModels";
import { connect } from "react-redux";
import { listViewService } from "src/services/listView.service";
import { isSucc } from "src/models/ApiResponse";
import { ViewType } from "src/enums/SharedEnums";
import { PATH_MAIN } from "src/routes/paths";
import { hasPermission } from "src/utils/permissionHelper";

type MenuBarProps = {
  search?: string;
  currentView: View;
};

export function MenuBar({ search, currentView }: MenuBarProps) {
  const [selectedViewId, setSelectedViewId] = useState(0);
  const [viewsSearchBar, setViewsSearchBar] = useState(false);
  const [viewsSearch, setViewsSearch] = useState("");
  const [views, setViews] = useState<View[]>([]);
  const [filterViews, setFilerViews] = useState<View[]>([]);
  const theme = useTheme();

  const router = useRouter();

  useEffect(() => {
    // setSelectedViewId(router.pathname.split("/")[1]);
  }, [router.pathname]);

  const handleMenu = async (view: View) => {
    // setSelectedViewId(value);
    if (view.isDefaultView) {
      await router.push(`${PATH_MAIN.lists}/${view.id}`);
    } else {
      await router.push(`${PATH_MAIN.views}/${view.id}`);
      router.reload();
    }
  };
  useEffect(() => {
    async function fetchData() {
      var response = await listViewService.getViews(currentView.id);
      if (isSucc(response) && response.data && response.data.length > 0) {
        setViews(response.data);
        setFilerViews(response.data);
      }
    }
    if (currentView) {
      fetchData();
    }
  }, [currentView]);
  const handleViewsSearch = (e: any) => {
    setViewsSearch(e.target.value);
    setFilerViews(
      views.filter((view) => view.name.toLowerCase().includes(e.target.value))
    );
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          borderBottom: `1px solid ${theme.palette.palette_style.border.default}`,
          p: 1,
        }}
      >
        {hasPermission(currentView?.role, "All") && (
          <Box
            onClick={handleOpen}
            sx={{
              backgroundColor: theme.palette.palette_style.background.selected,
              borderRadius: 1,
              px: 1,
              cursor: "pointer",
              display: "flex",
              gap: { xs: 0.5, md: 1 },
              alignItems: "center",
              // width: { xs: "95px", lg: "125px" },
            }}
          >
            <Box
              component="span"
              className="svg-color"
              sx={{
                width: { xs: 18, lg: 24 },
                height: { xs: 18, lg: 24 },
                display: "inline-block",
                bgcolor: theme.palette.palette_style.text.selected,
                mask: `url(/assets/icons/menu/plus.svg) no-repeat center / contain`,
                WebkitMask: `url(/assets/icons/menu/plus.svg) no-repeat center / contain`,
                marginRight: { xs: 0.5, lg: 1 },
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "14px", lg: "16px" },
                width: "max-content",
              }}
            >
              Add View
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            marginLeft: { xs: 1, lg: 3 },
            borderLeft: `1px solid ${theme.palette.palette_style.border.default}`,
            paddingLeft: 1,
            width: { xs: "calc(100vw - 120px)", lg: "calc(100vw - 280px)" },
            overflow: "auto",
            marginRight: { xs: 5, md: "inherit" },
            "::-webkit-scrollbar": {
              display: { xs: "none", md: "block" },
            },
          }}
        >
          {filterViews.map((view, index) => (
            <MenuItem
              key={index}
              menu={view}
              setMenu={() => handleMenu(view)}
              selected={selectedViewId === view.id}
            />
          ))}
        </Box>
        <Box
          sx={{
            position: "absolute",
            right: 5,
            backgroundColor: theme.palette.palette_style.background.default,
            width: viewsSearchBar ? "205px" : "45px",
            px: 1,
            display: "flex",
            justifyContent: "end",
            transition: "width 0.3s",
            marginRight: { lg: 1 },
            paddingBottom: 0.5,
            paddingTop: "3px",
          }}
          onMouseOver={() => {
            setViewsSearchBar(true);
          }}
          onMouseOut={() => {
            setViewsSearchBar(false);
          }}
          id="views_search"
        >
          {viewsSearchBar && (
            <TextField
              required
              id="search"
              size="small"
              sx={{ width: "160px", marginTop: -0.5 }}
              defaultValue={viewsSearch}
              onChange={handleViewsSearch}
            />
          )}
          <Box
            component="span"
            className="svg-color"
            sx={{
              width: 18,
              height: 18,
              display: "inline-block",
              bgcolor: "#D3D3D3",
              mask: `url(/assets/icons/header/magnify.svg) no-repeat center / contain`,
              WebkitMask: `url(/assets/icons/header/magnify.svg) no-repeat center / contain`,
              cursor: "pointer",
              marginTop: 0.5,
              marginLeft: 1,
            }}
          />
        </Box>
      </Box>
      <>
        <ListViewForm
          open={open}
          handleClose={() => {
            handleClose();
          }}
        />
      </>
    </>
  );
}
const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
type MenuItemProps = {
  menu: View;
  selected: boolean;
  setMenu: (value: string) => void;
};

function MenuItem({ menu, selected, setMenu }: MenuItemProps) {
  const { id, type, name } = menu;
  const theme = useTheme();
  const [isOver, setIsOver] = useState(false);

  const getIcon = (type: string): string => {
    let icon = "menu/checklist";
    switch (type) {
      case ViewType.List:
        return "menu/checklist";
      case ViewType.Calendar:
        return "menu/calendar";
      case ViewType.Gallery:
        return "menu/gallery";
      case ViewType.KanBan:
        return "menu/kanban";
      // case ViewType.G:
      //   return "menu/gantt"
      case ViewType.Map:
        return "menu/map";
      case ViewType.TimeLine:
        return "menu/timeline";
      // case ViewType.:
      //   return "menu/chart"
      default:
        break;
    }
    return icon;
  };
  return (
    <Box
      sx={{
        cursor: "pointer",
        display: "flex",
        py: 0.5,
        px: { xs: 1, lg: 2 },
        // overflow: "hidden",
        alignItems: "center",
        gap: 1,
      }}
      onClick={() => {
        setMenu(id.toString());
      }}
      onMouseOver={() => {
        setIsOver(true);
      }}
      onMouseLeave={() => {
        setIsOver(false);
      }}
    >
      <Box
        component="span"
        className="svg-color"
        sx={{
          width: 18,
          height: 18,
          display: "inline-block",
          bgcolor:
            isOver || selected
              ? theme.palette.palette_style.text.selected
              : theme.palette.palette_style.text.primary,
          mask: `url(/assets/icons/${getIcon(
            type
          )}.svg) no-repeat center / contain`,
          WebkitMask: `url(/assets/icons/${getIcon(
            type
          )}.svg) no-repeat center / contain`,
          // marginRight: 1,
          // marginTop: 0.2,
        }}
      />
      <Typography
        variant="body1"
        sx={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          maxWidth: { xs: 88, md: 256 },
          color:
            isOver || selected
              ? theme.palette.palette_style.text.selected
              : theme.palette.palette_style.text.primary,
        }}
      >
        {name}
      </Typography>
    </Box>
  );
}
