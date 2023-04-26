import { NextApiRequest, NextApiResponse } from "next"
import { BaseApiResponse } from "src/models/ApiResponse";
import { removeCookie } from "src/utils/cookieUtils";
const logout = async (req: NextApiRequest, res: NextApiResponse,next:any) => {
    
    removeCookie('refreshToken',req,res);
    removeCookie('token',req,res);
    res.status(200).json(new BaseApiResponse(0,'success'));
}
export default logout