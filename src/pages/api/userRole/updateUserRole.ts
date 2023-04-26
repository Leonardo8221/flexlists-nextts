import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { updateUserRole } from "src/repositories/userRoleRepository";
const updateUserRoleEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id,roleId,userId } = req.body;
    var updateUserRoleResponse = await updateUserRole(id,roleId,userId);
    res.json(new ApiResponse<any>(updateUserRoleResponse))
  res.statusCode = 200;
  return res;
}
export default updateUserRoleEndpoint
