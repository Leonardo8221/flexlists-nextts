import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { getAllRolePermission } from "src/repositories/rolePermissionRepository";
const getAllRolePermissionEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req.body;
    var getAllRolePermissionResponse = await getAllRolePermission(query);
    res.json(new ApiResponse<any>(getAllRolePermissionResponse))
  res.statusCode = 200;
  return res;
}
export default getAllRolePermissionEndpoint
