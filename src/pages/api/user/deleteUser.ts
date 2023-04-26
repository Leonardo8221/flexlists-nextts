import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { deleteUser } from "src/repositories/userRepository";
const deleteUserEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
     if(!id || isNaN(Number(id)))
     {
        res.json(new BaseApiResponse(1000,'id invalid'));
        res.statusCode = 200;
        return res;
     }
    var deleteUserResponse = await deleteUser(Number(id));
    res.json(new ApiResponse<any>(deleteUserResponse))
  res.statusCode = 200;
  return res;
}
export default deleteUserEndpoint
