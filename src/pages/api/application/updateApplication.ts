import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { updateApplication } from "src/repositories/applicationRepository";
const updateApplicationEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id,name,description,ownerId } = req.body;
    var updateApplicationResponse = await updateApplication(id,name,description,ownerId);
    res.json(new ApiResponse<any>(updateApplicationResponse))
  res.statusCode = 200;
  return res;
}
export default updateApplicationEndpoint
