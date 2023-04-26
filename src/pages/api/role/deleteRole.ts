import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { deleteRole } from "src/repositories/roleRepository";
const deleteRoleEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
     if(!id || isNaN(Number(id)))
     {
        res.json(new BaseApiResponse(1000,'id invalid'));
        res.statusCode = 200;
        return res;
     }
    var deleteRoleResponse = await deleteRole(Number(id));
    res.json(new ApiResponse<any>(deleteRoleResponse))
  res.statusCode = 200;
  return res;
}
export default deleteRoleEndpoint
