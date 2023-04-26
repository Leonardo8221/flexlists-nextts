import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { getRoleById } from "src/repositories/roleRepository";
const getRoleByIdEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
     if(!id || isNaN(Number(id)))
     {
        res.json(new BaseApiResponse(1000,'id invalid'));
        res.statusCode = 200;
        return res;
     }
    var getRoleByIdResponse = await getRoleById(Number(id));
    res.json(new ApiResponse<any>(getRoleByIdResponse))
  res.statusCode = 200;
  return res;
}
export default getRoleByIdEndpoint
