import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { getUser } from "src/repositories/userRepository";
import * as bcrypt from "bcrypt";
import { JWT_TOKEN_EXPIRED_IN } from "src/utils/secrets";
import { setCookieRefreshToken, setCookieToken } from "src/utils/cookieUtils";
import { createJwtRefreshToken, createJwtToken } from "src/utils/tokenUtils";
const login = async (req: NextApiRequest, res: NextApiResponse,next:any) => {
   //Check if username and password are set
   let {userName, password } = req.body;
   if (!userName) {
     res.status(400).json(new BaseApiResponse(400,'username invalid'));
     return;
   }
   if (!password) {
    res.status(400).json(new BaseApiResponse(400,'password invalid'));
    return;
   }

   //get user and validate password
   try {
        //get user
        var user = await getUser({ where: { userName: { equals: userName.toString().trim().toLowerCase() } }});
        if(!user)
        {
           res.status(404).json(new BaseApiResponse(404,'user not exists'))
              return ;
        }
        //Check if encrypted password match
        if(!bcrypt.compare(password,user.password))
        {
           res.status(401).json(new BaseApiResponse(401,'password invalid'))
              return ;
        }
        //create JWT
       const token = await createJwtToken(user.id.toString(),user.userName,user.firstName,user.lastName);
       const refreshToken = await createJwtRefreshToken(user.id.toString(),user.userName)
       //Send the jwt in http only
       setCookieToken(token,req,res);
       setCookieRefreshToken(refreshToken,req,res)
    
       return res.json(new ApiResponse<any>({userId:user.id,username : user.userName,tokenExpiredIn:JWT_TOKEN_EXPIRED_IN}))
   } catch (error) {
     return res.status(401).json(new BaseApiResponse(401,'UnAuthorized'));
   }
}
export default login