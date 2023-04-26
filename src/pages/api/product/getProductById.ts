import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { getProductById } from "src/repositories/productRepository";
const getProductByIdEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
     if(!id || isNaN(Number(id)))
     {
        res.json(new BaseApiResponse(1000,'id invalid'));
        res.statusCode = 200;
        return res;
     }
    var getProductByIdResponse = await getProductById(Number(id));
    res.json(new ApiResponse<any>(getProductByIdResponse))
  res.statusCode = 200;
  return res;
}
export default getProductByIdEndpoint
