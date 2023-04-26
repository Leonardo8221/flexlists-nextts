import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { getAllApplication } from "src/repositories/applicationRepository";
const getAllApplicationEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req.body;
    var getAllApplicationResponse = await getAllApplication(query);
    res.json(new ApiResponse<any>(getAllApplicationResponse))
  res.statusCode = 200;
  return res;
}
export default getAllApplicationEndpoint
