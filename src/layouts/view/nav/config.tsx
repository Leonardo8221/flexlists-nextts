import { PATH_MAIN } from "src/routes/paths";
import GridViewIcon from "@mui/icons-material/GridView";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import AddIcon from "@mui/icons-material/Add";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const navConfig = [
  {
    title: "Create new list",
    path: PATH_MAIN.chooseTemplate,
    icon: <AddIcon />,
    // icon: "Favourites_plus",
  },
  // {
  //   title: "Dashboard",
  //   path: "/dashboard",
  //   icon: "Home",
  // },
  {
    title: "My Lists",
    path: PATH_MAIN.lists,
    // icon: "List",
    icon: <ListAltOutlinedIcon />,
  },
  {
    title: "My Views",
    path: PATH_MAIN.views,
    // icon: "List",
    icon: <GridViewIcon />,
  },
  // {
  //   title: "Calendar",
  //   path: "/main/calendar",
  //   icon: "Projects",
  // },
  // {
  //   title: "Apps",
  //   path: "/",
  //   icon: "Apps",
  // },
  {
    title: "Groups",
    path: PATH_MAIN.groups,
    // icon: "Groups",
    icon: <Groups2OutlinedIcon />,
  },
  // {
  //   title: "Favorites",
  //   path: "/",
  //   icon: "Favourites",
  // },
  {
    title: "Information",
    path: "/",
    // icon: "Info",
    icon: <InfoOutlinedIcon />,
  },
];

export default navConfig;
