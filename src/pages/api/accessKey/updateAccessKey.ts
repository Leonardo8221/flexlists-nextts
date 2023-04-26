import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { updateAccessKey } from "src/repositories/accessKeyRepository";
const updateAccessKeyEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id,key,description,tableDefinitionId,roleId,ownerId } = req.body;
    var updateAccessKeyResponse = await updateAccessKey(id,key,description,tableDefinitionId,roleId,ownerId);
    res.json(new ApiResponse<any>(updateAccessKeyResponse))
  res.statusCode = 200;
  return res;
}
export default updateAccessKeyEndpoint
