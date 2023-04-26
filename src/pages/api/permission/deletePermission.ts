import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { deletePermission } from "src/repositories/permissionRepository";
const deletePermissionEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
     if(!id || isNaN(Number(id)))
     {
        res.json(new BaseApiResponse(1000,'id invalid'));
        res.statusCode = 200;
        return res;
     }
    var deletePermissionResponse = await deletePermission(Number(id));
    res.json(new ApiResponse<any>(deletePermissionResponse))
  res.statusCode = 200;
  return res;
}
export default deletePermissionEndpoint
