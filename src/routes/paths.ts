// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}
const ROOTS_AUTH = "/auth";
export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  verifyEmail: path(ROOTS_AUTH, "/verifyEmail"),
  resendEmailVerification: path(ROOTS_AUTH, "/resendEmailVerification"),
};
const ROOTS_MAIN = "/main";
export const PATH_MAIN = {
  views: path(ROOTS_MAIN, "/views"),
  newView: path(ROOTS_MAIN, "/views/chooseTemplate"),
  groups: path(ROOTS_MAIN, "/groups"),
  newGroup: path(ROOTS_MAIN, "/groups/newGroup")
};
