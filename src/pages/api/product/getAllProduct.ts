import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { getAllProduct } from "src/repositories/productRepository";
const getAllProductEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req.body;
    var getAllProductResponse = await getAllProduct(query);
    res.json(new ApiResponse<any>(getAllProductResponse))
  res.statusCode = 200;
  return res;
}
export default getAllProductEndpoint
