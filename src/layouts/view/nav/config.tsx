import {  PATH_MAIN } from "src/routes/paths";

const navConfig = [
  {
    title: 'Favorites Plus',
    path: PATH_MAIN.views,
    icon: 'Favourites_plus',
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'Home',
  },
  {
    title: 'My List',
    path: PATH_MAIN.views,
    icon: 'List',
  },
  {
    title: 'Calendar',
    path: '/main/calendar',
    icon: 'Projects',
  },
  {
    title: 'Apps',
    path: '/',
    icon: 'Apps',
  },
  {
    title: 'Favorites',
    path: '/',
    icon: 'Favourites',
  },
  {
    title: 'Information',
    path: '/',
    icon: 'Info',
  }
];

export default navConfig;
