import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { getAllTableMigration } from "src/repositories/tableMigrationRepository";
const getAllTableMigrationEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req.body;
    var getAllTableMigrationResponse = await getAllTableMigration(query);
    res.json(new ApiResponse<any>(getAllTableMigrationResponse))
  res.statusCode = 200;
  return res;
}
export default getAllTableMigrationEndpoint
