import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { updatePermission } from "src/repositories/permissionRepository";
const updatePermissionEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id,name,ownerId } = req.body;
    var updatePermissionResponse = await updatePermission(id,name,ownerId);
    res.json(new ApiResponse<any>(updatePermissionResponse))
  res.statusCode = 200;
  return res;
}
export default updatePermissionEndpoint
