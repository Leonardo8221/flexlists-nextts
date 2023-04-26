import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { createApplication } from "src/repositories/applicationRepository";
const createApplicationEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name,description,ownerId } = req.body;
    var createApplicationResponse = await createApplication(name,description,ownerId);

    res.json(new ApiResponse<any>(createApplicationResponse.id))
  res.statusCode = 200;
  return res;
}
export default createApplicationEndpoint
