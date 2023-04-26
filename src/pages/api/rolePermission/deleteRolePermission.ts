import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { deleteRolePermission } from "src/repositories/rolePermissionRepository";
const deleteRolePermissionEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
     if(!id || isNaN(Number(id)))
     {
        res.json(new BaseApiResponse(1000,'id invalid'));
        res.statusCode = 200;
        return res;
     }
    var deleteRolePermissionResponse = await deleteRolePermission(Number(id));
    res.json(new ApiResponse<any>(deleteRolePermissionResponse))
  res.statusCode = 200;
  return res;
}
export default deleteRolePermissionEndpoint
