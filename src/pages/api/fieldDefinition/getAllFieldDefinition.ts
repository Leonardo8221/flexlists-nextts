import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { getAllFieldDefinition } from "src/repositories/fieldDefinitionRepository";
const getAllFieldDefinitionEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req.body;
    var getAllFieldDefinitionResponse = await getAllFieldDefinition(query);
    res.json(new ApiResponse<any>(getAllFieldDefinitionResponse))
  res.statusCode = 200;
  return res;
}
export default getAllFieldDefinitionEndpoint
