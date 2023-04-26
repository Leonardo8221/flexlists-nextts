import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { getApplicationById } from "src/repositories/applicationRepository";
const getApplicationByIdEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
     if(!id || isNaN(Number(id)))
     {
        res.json(new BaseApiResponse(1000,'id invalid'));
        res.statusCode = 200;
        return res;
     }
    var getApplicationByIdResponse = await getApplicationById(Number(id));
    res.json(new ApiResponse<any>(getApplicationByIdResponse))
  res.statusCode = 200;
  return res;
}
export default getApplicationByIdEndpoint
