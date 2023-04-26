import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { getAllUser } from "src/repositories/userRepository";
const getAllUserEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req.body;
    var getAllUserResponse = await getAllUser(query);
    res.json(new ApiResponse<any>(getAllUserResponse))
  res.statusCode = 200;
  return res;
}
export default getAllUserEndpoint
