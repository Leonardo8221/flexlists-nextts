import { PATH_MAIN } from "src/routes/paths";

const navConfig = [
  {
    title: "Create new view",
    path: PATH_MAIN.newView,
    icon: "Favourites_plus",
  },
  // {
  //   title: "Dashboard",
  //   path: "/dashboard",
  //   icon: "Home",
  // },
  {
    title: "My Views",
    path: PATH_MAIN.views,
    icon: "List",
  },
  // {
  //   title: "Calendar",
  //   path: "/main/calendar",
  //   icon: "Projects",
  // },
  {
    title: "Apps",
    path: "/",
    icon: "Apps",
  },
  {
    title: "Groups",
    path: PATH_MAIN.groups,
    icon: "Groups",
  },
  {
    title: "Favorites",
    path: "/",
    icon: "Favourites",
  },
  {
    title: "Information",
    path: "/",
    icon: "Info",
  },
];

export default navConfig;
