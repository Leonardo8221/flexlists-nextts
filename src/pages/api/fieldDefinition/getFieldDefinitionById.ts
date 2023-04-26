import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { getFieldDefinitionById } from "src/repositories/fieldDefinitionRepository";
const getFieldDefinitionByIdEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
     if(!id || isNaN(Number(id)))
     {
        res.json(new BaseApiResponse(1000,'id invalid'));
        res.statusCode = 200;
        return res;
     }
    var getFieldDefinitionByIdResponse = await getFieldDefinitionById(Number(id));
    res.json(new ApiResponse<any>(getFieldDefinitionByIdResponse))
  res.statusCode = 200;
  return res;
}
export default getFieldDefinitionByIdEndpoint
