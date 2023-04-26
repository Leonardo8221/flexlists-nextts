import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { createFieldDefinition } from "src/repositories/fieldDefinitionRepository";
const createFieldDefinitionEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name,type,description,tableDefinitionId,ownerId } = req.body;
    var createFieldDefinitionResponse = await createFieldDefinition(name,type,description,tableDefinitionId,ownerId);

    res.json(new ApiResponse<any>(createFieldDefinitionResponse.id))
  res.statusCode = 200;
  return res;
}
export default createFieldDefinitionEndpoint
