import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { createRolePermission } from "src/repositories/rolePermissionRepository";
const createRolePermissionEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { entityID,permissionId,roleId } = req.body;
    var createRolePermissionResponse = await createRolePermission(entityID,permissionId,roleId);

    res.json(new ApiResponse<any>(createRolePermissionResponse.id))
  res.statusCode = 200;
  return res;
}
export default createRolePermissionEndpoint
