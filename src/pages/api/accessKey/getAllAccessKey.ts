import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { getAllAccessKey } from "src/repositories/accessKeyRepository";
const getAllAccessKeyEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req.body;
    var getAllAccessKeyResponse = await getAllAccessKey(query);
    res.json(new ApiResponse<any>(getAllAccessKeyResponse))
  res.statusCode = 200;
  return res;
}
export default getAllAccessKeyEndpoint
