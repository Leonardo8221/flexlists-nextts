import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { getAllPermission } from "src/repositories/permissionRepository";
const getAllPermissionEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req.body;
    var getAllPermissionResponse = await getAllPermission(query);
    res.json(new ApiResponse<any>(getAllPermissionResponse))
  res.statusCode = 200;
  return res;
}
export default getAllPermissionEndpoint
