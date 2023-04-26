import { NextApiRequest, NextApiResponse } from "next"
import passport from "passport";
import  "src/lib/passport";
const googleAuth = async (req: NextApiRequest, res: NextApiResponse,next:any) => {
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
      })(req, res, next);
}
export default googleAuth