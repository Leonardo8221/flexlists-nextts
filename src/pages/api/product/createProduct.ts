import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { createProduct } from "src/repositories/productRepository";
const createProductEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name,description,price,expiredDate,ownerId } = req.body;
    var createProductResponse = await createProduct(name,description,price,expiredDate,ownerId);

    res.json(new ApiResponse<any>(createProductResponse.id))
  res.statusCode = 200;
  return res;
}
export default createProductEndpoint
