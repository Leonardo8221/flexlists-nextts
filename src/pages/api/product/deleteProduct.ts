import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { deleteProduct } from "src/repositories/productRepository";
const deleteProductEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
     if(!id || isNaN(Number(id)))
     {
        res.json(new BaseApiResponse(1000,'id invalid'));
        res.statusCode = 200;
        return res;
     }
    var deleteProductResponse = await deleteProduct(Number(id));
    res.json(new ApiResponse<any>(deleteProductResponse))
  res.statusCode = 200;
  return res;
}
export default deleteProductEndpoint
