import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { deleteApplication } from "src/repositories/applicationRepository";
const deleteApplicationEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
     if(!id || isNaN(Number(id)))
     {
        res.json(new BaseApiResponse(1000,'id invalid'));
        res.statusCode = 200;
        return res;
     }
    var deleteApplicationResponse = await deleteApplication(Number(id));
    res.json(new ApiResponse<any>(deleteApplicationResponse))
  res.statusCode = 200;
  return res;
}
export default deleteApplicationEndpoint
