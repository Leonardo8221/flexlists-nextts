import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { createRole } from "src/repositories/roleRepository";
const createRoleEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name,ownerId } = req.body;
    var createRoleResponse = await createRole(name,ownerId);

    res.json(new ApiResponse<any>(createRoleResponse.id))
  res.statusCode = 200;
  return res;
}
export default createRoleEndpoint
