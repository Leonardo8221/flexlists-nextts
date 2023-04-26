import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { getUserById } from "src/repositories/userRepository";
const getUserByIdEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
     if(!id || isNaN(Number(id)))
     {
        res.json(new BaseApiResponse(1000,'id invalid'));
        res.statusCode = 200;
        return res;
     }
    var getUserByIdResponse = await getUserById(Number(id));
    res.json(new ApiResponse<any>(getUserByIdResponse))
  res.statusCode = 200;
  return res;
}
export default getUserByIdEndpoint
