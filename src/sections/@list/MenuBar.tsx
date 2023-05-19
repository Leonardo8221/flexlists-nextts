import { useState, useEffect } from "react";
import { Box, TextField, Modal, Typography, Grid, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import AddViewCard from "src/components/add-view/AddViewCard";
import WysiwygEditor from "src/components/wysiwyg-editor/wysiwyg";

type MenuBarProps = {
  search?: string;
};

const initialMenus = [
  {
    title: "List",
    icon: "menu/checklist",
  },
  {
    title: "Calendar",
    icon: "menu/calendar",
  },
  {
    title: "Gallery",
    icon: "menu/gallery",
  },
  {
    title: "Kanban",
    icon: "menu/kanban",
  },
  {
    title: "Gantt",
    icon: "menu/gantt",
  },
  {
    title: "Map",
    icon: "menu/map",
  },
  {
    title: "Timeline",
    icon: "menu/timeline",
  },
  {
    title: "Chart",
    icon: "menu/chart",
  },
];

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxHeight: "80vh",
  backgroundColor: "white",
  border: "none",
  boxShadow: 24,
  overflow: "scroll"
};

const AddViewCards = [
  {
    icon: "/assets/icons/tour/ic_tick.svg",
    title: "List View",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    icon: "/assets/icons/CalendarSVG.svg",
    title: "Calendar View",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    icon: "/assets/icons/tour/ic_project_m.svg",
    title: "Chart View",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    icon: "/assets/icons/tour/ic_bug.svg",
    title: "Gallery View",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    icon: "/assets/icons/tour/ic_bug.svg",
    title: "Timeline View",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    icon: "/assets/icons/tour/ic_bug.svg",
    title: "Kanban View",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
];

export default function MenuBar({ search }: MenuBarProps) {
  const [selectedMenu, setSelectedMenu] = useState("");
  const [viewsSearchBar, setViewsSearchBar] = useState(false);
  const [viewsSearch, setViewsSearch] = useState("");
  const [menus, setMenus] = useState(initialMenus);
  const theme = useTheme();

  const router = useRouter();

  useEffect(() => {
    setSelectedMenu(router.pathname.split("/")[1]);
  }, [router.pathname]);

  const handleMenu = (value: string) => {
    setSelectedMenu(value);
    router.push(`/main/${value.toLowerCase()}`);
  };

  const handleViewsSearch = (e: any) => {
    setViewsSearch(e.target.value);
    const filtered =
      e.target.value === ""
        ? initialMenus
        : initialMenus.filter((menu) =>
            menu.title.toLowerCase().includes(e.target.value)
          );
    setMenus(filtered);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSteps(0);
  };
  const [steps, setSteps] = useState(0);

  const goPrevious = () => {
    setSteps(steps - 1);
  };

  const goNext = () => {
    setSteps(steps + 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        borderBottom: `1px solid ${theme.palette.palette_style.border.default}`,
        p: 1,
      }}
    >
      <Box
        onClick={handleOpen}
        sx={{
          backgroundColor: theme.palette.palette_style.background.selected,
          borderRadius: 1,
          px: { xs: 0.5, lg: 1 },
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          width: { xs: "95px", lg: "125px" },
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{overflow: "scroll"}}
        >
          <Box sx={style}>
            <Box sx={{py: 2, px: 4, position: "sticky", top: "0", zIndex: "10", backgroundColor:"#fff", boxShadow: "0 2px 24px 0 rgba(0,0,0,0.05)", width: "100%"}}>
              <Typography variant="h5">{steps === 0 ? "Choose View" : steps === 1 ? "View details" : "View Created" }</Typography>
            </Box>
            
            {steps === 0 &&
            <Grid container spacing={3} sx={{p:4}}>
              {AddViewCards.map((card: any) => {
                return (
                  <Grid item xs={12} sm={6} md={3} key={card.icon} >
                    <AddViewCard
                      icon={card.icon}
                      title={card.title}
                      description={card.description}
                    ></AddViewCard>
                  </Grid>
                );
              })}
            </Grid>
            }

          {steps === 1 &&
            <Box sx={{p:4}}>
              <Box sx={{mb:4}}>
                <Typography variant="subtitle2" gutterBottom>View Name</Typography>
                <TextField fullWidth id="fullWidth" /> 
              </Box>
              <Box>
                <Typography variant="subtitle2" gutterBottom>View Description</Typography>
                <WysiwygEditor />
              </Box>
            </Box>
            }

          {steps === 2 &&
            <Box sx={{p:4}}>
            <Box sx={{mb:4}}>
              <Typography variant="subtitle2" gutterBottom>Share View</Typography>
              <TextField fullWidth id="fullWidth" placeholder="generated view link" /> 
            </Box>
          </Box>
            }
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", px: 4,py:2 , background: "#fff", position: "sticky", width: "100%", bottom: "0" }}>
              <Box>
                {steps === 0 ?
                  <Button variant="outlined" size="small" sx={{display: "none"}} >Skip</Button> :
                  <Button variant="contained" size="small" onClick={goPrevious}>Previous</Button>
                }
              </Box>
              <Box>
                {steps === 2 ?
                  <Button variant="outlined" size="small" onClick={handleClose} >Finish</Button> :
                  <Button variant="contained" size="small" onClick={goNext}>Next</Button>
                }
              </Box>
            </Box>
          </Box>
        </Modal>
        <Box
          sx={{
            color: "#666",
            fontSize: { xs: "14px", lg: "16px" },
            minWidth: "64px",
          }}
        >
          Add View
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          marginLeft: { xs: 1, lg: 3 },
          borderLeft: `1px solid ${theme.palette.palette_style.border.default}`,
          paddingLeft: 1,
          width: { xs: "calc(100vw - 120px)", lg: "calc(100vw - 280px)" },
          overflow: "auto",
          marginRight: { xs: 5, md: "inherit" },
        }}
      >
        {menus.map((menu) => (
          <MenuItem
            key={menu.title}
            menu={menu}
            setMenu={handleMenu}
            selected={selectedMenu === menu.title}
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
  );
}

type MenuItemProps = {
  menu: any;
  selected: boolean;
  setMenu: (value: string) => void;
};

function MenuItem({ menu, selected, setMenu }: MenuItemProps) {
  const { title, icon } = menu;
  const theme = useTheme();
  const [isOver, setIsOver] = useState(false);

  return (
    <Box
      sx={{
        cursor: "pointer",
        display: "flex",
        py: 0.5,
        px: { xs: 1, lg: 2 },
      }}
      onClick={() => {
        setMenu(title);
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
          mask: `url(/assets/icons/${icon}.svg) no-repeat center / contain`,
          WebkitMask: `url(/assets/icons/${icon}.svg) no-repeat center / contain`,
          marginRight: 1,
          marginTop: 0.2,
        }}
      />
      <Box
        sx={{
          fontSize: "16px",
          color:
            isOver || selected
              ? theme.palette.palette_style.text.selected
              : theme.palette.palette_style.text.primary,
        }}
      >
        {title}
      </Box>
    </Box>
  );
}
