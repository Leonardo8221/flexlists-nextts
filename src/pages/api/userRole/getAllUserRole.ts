import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { getAllUserRole } from "src/repositories/userRoleRepository";
const getAllUserRoleEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req.body;
    var getAllUserRoleResponse = await getAllUserRole(query);
    res.json(new ApiResponse<any>(getAllUserRoleResponse))
  res.statusCode = 200;
  return res;
}
export default getAllUserRoleEndpoint
