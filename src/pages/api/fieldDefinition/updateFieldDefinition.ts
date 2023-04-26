import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { updateFieldDefinition } from "src/repositories/fieldDefinitionRepository";
const updateFieldDefinitionEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id,name,type,description,tableDefinitionId,ownerId } = req.body;
    var updateFieldDefinitionResponse = await updateFieldDefinition(id,name,type,description,tableDefinitionId,ownerId);
    res.json(new ApiResponse<any>(updateFieldDefinitionResponse))
  res.statusCode = 200;
  return res;
}
export default updateFieldDefinitionEndpoint
