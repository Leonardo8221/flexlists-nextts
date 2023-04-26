import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { getRolePermissionById } from "src/repositories/rolePermissionRepository";
const getRolePermissionByIdEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
     if(!id || isNaN(Number(id)))
     {
        res.json(new BaseApiResponse(1000,'id invalid'));
        res.statusCode = 200;
        return res;
     }
    var getRolePermissionByIdResponse = await getRolePermissionById(Number(id));
    res.json(new ApiResponse<any>(getRolePermissionByIdResponse))
  res.statusCode = 200;
  return res;
}
export default getRolePermissionByIdEndpoint
