import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { getAccessKeyById } from "src/repositories/accessKeyRepository";
const getAccessKeyByIdEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
     if(!id || isNaN(Number(id)))
     {
        res.json(new BaseApiResponse(1000,'id invalid'));
        res.statusCode = 200;
        return res;
     }
    var getAccessKeyByIdResponse = await getAccessKeyById(Number(id));
    res.json(new ApiResponse<any>(getAccessKeyByIdResponse))
  res.statusCode = 200;
  return res;
}
export default getAccessKeyByIdEndpoint
