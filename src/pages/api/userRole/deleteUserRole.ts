import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { deleteUserRole } from "src/repositories/userRoleRepository";
const deleteUserRoleEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
     if(!id || isNaN(Number(id)))
     {
        res.json(new BaseApiResponse(1000,'id invalid'));
        res.statusCode = 200;
        return res;
     }
    var deleteUserRoleResponse = await deleteUserRole(Number(id));
    res.json(new ApiResponse<any>(deleteUserRoleResponse))
  res.statusCode = 200;
  return res;
}
export default deleteUserRoleEndpoint
