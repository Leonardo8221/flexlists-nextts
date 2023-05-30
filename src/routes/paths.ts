// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
    return `${root}${sublink}`;
  }
const ROOTS_AUTH = '/auth';
export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
    register: path(ROOTS_AUTH, '/register')
  };
const ROOTS_MAIN = '/main'
export const PATH_MAIN = {
  list: path(ROOTS_MAIN, '/list'),
  newList : path(ROOTS_MAIN, '/list/newList')
}