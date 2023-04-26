import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { deleteFieldDefinition } from "src/repositories/fieldDefinitionRepository";
const deleteFieldDefinitionEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
     if(!id || isNaN(Number(id)))
     {
        res.json(new BaseApiResponse(1000,'id invalid'));
        res.statusCode = 200;
        return res;
     }
    var deleteFieldDefinitionResponse = await deleteFieldDefinition(Number(id));
    res.json(new ApiResponse<any>(deleteFieldDefinitionResponse))
  res.statusCode = 200;
  return res;
}
export default deleteFieldDefinitionEndpoint
