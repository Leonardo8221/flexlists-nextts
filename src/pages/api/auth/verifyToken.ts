import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import * as jwt from "jsonwebtoken";
import {  getCookieToken } from "src/utils/cookieUtils";
import { JWT_SECRET } from "src/utils/secrets";
import refreshToken from "./refreshToken";
const verifyToken = async (req: NextApiRequest, res: NextApiResponse,next:any) => {
    //Try to validate the token and get data
    try {
      const token = getCookieToken(req,res);
      jwt.verify(token, JWT_SECRET);
      return res.status(200).json(new ApiResponse({isValidated:true}))
   } catch (error) {
      await refreshToken(req,res,next)
   }
}
export default verifyToken