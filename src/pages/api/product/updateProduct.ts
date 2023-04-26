import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { updateProduct } from "src/repositories/productRepository";
const updateProductEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id,name,description,price,expiredDate,ownerId } = req.body;
    var updateProductResponse = await updateProduct(id,name,description,price,expiredDate,ownerId);
    res.json(new ApiResponse<any>(updateProductResponse))
  res.statusCode = 200;
  return res;
}
export default updateProductEndpoint
