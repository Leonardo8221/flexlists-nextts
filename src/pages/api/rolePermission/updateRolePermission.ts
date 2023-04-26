import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { updateRolePermission } from "src/repositories/rolePermissionRepository";
const updateRolePermissionEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id,entityID,permissionId,roleId } = req.body;
    var updateRolePermissionResponse = await updateRolePermission(id,entityID,permissionId,roleId);
    res.json(new ApiResponse<any>(updateRolePermissionResponse))
  res.statusCode = 200;
  return res;
}
export default updateRolePermissionEndpoint
