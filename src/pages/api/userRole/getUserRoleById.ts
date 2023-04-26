import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { getUserRoleById } from "src/repositories/userRoleRepository";
const getUserRoleByIdEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
     if(!id || isNaN(Number(id)))
     {
        res.json(new BaseApiResponse(1000,'id invalid'));
        res.statusCode = 200;
        return res;
     }
    var getUserRoleByIdResponse = await getUserRoleById(Number(id));
    res.json(new ApiResponse<any>(getUserRoleByIdResponse))
  res.statusCode = 200;
  return res;
}
export default getUserRoleByIdEndpoint
