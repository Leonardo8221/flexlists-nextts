import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import * as jwt from "jsonwebtoken";
import {  getCookieToken } from "src/utils/cookieUtils";
import { JWT_SECRET } from "src/utils/secrets";
import refreshToken from "./refreshToken";
const verifyToken = async (req: NextApiRequest, res: NextApiResponse,next:any) => {
   
}
export default verifyToken