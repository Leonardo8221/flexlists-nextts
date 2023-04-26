import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { getAllRole } from "src/repositories/roleRepository";
const getAllRoleEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req.body;
    var getAllRoleResponse = await getAllRole(query);
    res.json(new ApiResponse<any>(getAllRoleResponse))
  res.statusCode = 200;
  return res;
}
export default getAllRoleEndpoint
