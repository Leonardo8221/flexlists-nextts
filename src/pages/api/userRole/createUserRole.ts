import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { createUserRole } from "src/repositories/userRoleRepository";
const createUserRoleEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { roleId,userId } = req.body;
    var createUserRoleResponse = await createUserRole(roleId,userId);

    res.json(new ApiResponse<any>(createUserRoleResponse.id))
  res.statusCode = 200;
  return res;
}
export default createUserRoleEndpoint
