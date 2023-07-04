// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}
const ROOTS_AUTH = "/auth";
export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  registerExisting: path(ROOTS_AUTH, "/registerExisting"),
  verifyEmail: path(ROOTS_AUTH, "/verifyEmail"),
  resendEmailVerification: path(ROOTS_AUTH, "/resendEmailVerification"),
  forgotPasswordVerificationManual: path(ROOTS_AUTH, "/forgotPasswordVerificationManual"),
  forgotPasswordVerification: path(ROOTS_AUTH, "/forgotPasswordVerification"),
  forgotPassword: path(ROOTS_AUTH, "/forgotPassword"),
  verifyToken: path(ROOTS_AUTH, "/verifyToken"),
  logout: path(ROOTS_AUTH, "/logout"),
};
const ROOTS_MAIN = "/main";
export const PATH_MAIN = {
  views: path(ROOTS_MAIN, "/views"),
  newView: path(ROOTS_MAIN, "/views/chooseTemplate"),
  groups: path(ROOTS_MAIN, "/groups"),
  newGroup: path(ROOTS_MAIN, "/groups/newGroup"),
  migratedLists: path(ROOTS_MAIN, "/migrate"),
};
export const PATH_AUTH_API = {
  verifyToken: path(ROOTS_AUTH, "/verifyToken"),
  resendSignupEmail: path(ROOTS_AUTH, "/resendSignupEmail"),
  verifySignup: path(ROOTS_AUTH, "/verifySignup"),
  verifyPasswordChange: path(ROOTS_AUTH, "/verifyPasswordChange"),
  resetPassword: path(ROOTS_AUTH, "/resetPassword"),
  registerExisting: path(ROOTS_AUTH, "/registerExisting"),
  forgotPassword: path(ROOTS_AUTH, "/forgotPassword"),
}
const ROOTS_ADMIN = "/admin";
export const PATH_ADMIN = {
  contentManagement: path(ROOTS_ADMIN, "/contentManagement"),
  contentsBuilder: path(ROOTS_ADMIN, "/contentsBuilder"),
  contentsEditor: path(ROOTS_ADMIN, "/contentsEditor")
};