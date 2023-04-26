import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { updateRole } from "src/repositories/roleRepository";
const updateRoleEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id,name,ownerId } = req.body;
    var updateRoleResponse = await updateRole(id,name,ownerId);
    res.json(new ApiResponse<any>(updateRoleResponse))
  res.statusCode = 200;
  return res;
}
export default updateRoleEndpoint
