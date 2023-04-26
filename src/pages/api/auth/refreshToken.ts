import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import * as jwt from "jsonwebtoken";
import { getCookieRefreshToken, removeCookie, setCookieToken } from "src/utils/cookieUtils";
import { JWT_SECRET, JWT_TOKEN_EXPIRED_IN } from "src/utils/secrets";
import { createJwtToken } from "src/utils/tokenUtils";
const refreshToken = async (req: NextApiRequest, res: NextApiResponse,next:any) => {
    //Try to validate the token and get data
    try {
      const refreshToken = getCookieRefreshToken(req,res);
      let jwtPayload;
      jwtPayload = <any>jwt.verify(refreshToken, JWT_SECRET);
      if(!jwtPayload || !jwtPayload.userId || !jwtPayload.username)
      {
       removeCookie('refreshToken',req,res);
       removeCookie('token',req,res);
       res.status(401).json(new BaseApiResponse(401,'unauthorized'));
       return;
      }
       //create JWT
     const token = await createJwtToken(jwtPayload.userId,jwtPayload.userName,jwtPayload.firstName,jwtPayload.lastName);
     setCookieToken(token,req,res);
     res.json(new ApiResponse<any>({tokenExpiredIn:JWT_TOKEN_EXPIRED_IN}));
     return;
   } catch (error) {
      //If token is not valid, respond with 401 (unauthorized)
      removeCookie('refreshToken',req,res);
      removeCookie('token',req,res);
      res.status(401).json(new BaseApiResponse(401,'unauthorized'));
      return;
   }
}
export default refreshToken