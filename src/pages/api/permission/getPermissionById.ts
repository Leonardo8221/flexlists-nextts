import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { getPermissionById } from "src/repositories/permissionRepository";
const getPermissionByIdEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
     if(!id || isNaN(Number(id)))
     {
        res.json(new BaseApiResponse(1000,'id invalid'));
        res.statusCode = 200;
        return res;
     }
    var getPermissionByIdResponse = await getPermissionById(Number(id));
    res.json(new ApiResponse<any>(getPermissionByIdResponse))
  res.statusCode = 200;
  return res;
}
export default getPermissionByIdEndpoint
