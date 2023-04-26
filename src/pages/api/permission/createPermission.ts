import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { createPermission } from "src/repositories/permissionRepository";
const createPermissionEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name,ownerId } = req.body;
    var createPermissionResponse = await createPermission(name,ownerId);

    res.json(new ApiResponse<any>(createPermissionResponse.id))
  res.statusCode = 200;
  return res;
}
export default createPermissionEndpoint
