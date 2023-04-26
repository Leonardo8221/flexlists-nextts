import { NextApiRequest, NextApiResponse } from "next"
import { setCookie } from "cookies-next";
import passport from "passport";
import  "src/lib/passport";
import { setCookieRefreshToken, setCookieToken } from "src/utils/cookieUtils";
const googleAuthCallback = async (req: NextApiRequest, res: NextApiResponse,next:any) => {
  passport.authenticate("google", (err:any, user:any, info:any) => {
    if (err || !user) {
      return res.redirect("/?a=auth_fail");
    }
    // set cookie and send redirect
    setCookieToken(user.token,req,res);
    setCookieRefreshToken(user.refreshToken,req,res);
    res.redirect("/dashboard");
  })(req, res, next);
}
export default googleAuthCallback