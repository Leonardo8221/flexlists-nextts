import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { createAccessKey } from "src/repositories/accessKeyRepository";
const createAccessKeyEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { key,description,tableDefinitionId,roleId,ownerId } = req.body;
    var createAccessKeyResponse = await createAccessKey(key,description,tableDefinitionId,roleId,ownerId);

    res.json(new ApiResponse<any>(createAccessKeyResponse.id))
  res.statusCode = 200;
  return res;
}
export default createAccessKeyEndpoint
