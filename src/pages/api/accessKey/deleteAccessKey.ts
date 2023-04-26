import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { deleteAccessKey } from "src/repositories/accessKeyRepository";
const deleteAccessKeyEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
     if(!id || isNaN(Number(id)))
     {
        res.json(new BaseApiResponse(1000,'id invalid'));
        res.statusCode = 200;
        return res;
     }
    var deleteAccessKeyResponse = await deleteAccessKey(Number(id));
    res.json(new ApiResponse<any>(deleteAccessKeyResponse))
  res.statusCode = 200;
  return res;
}
export default deleteAccessKeyEndpoint
