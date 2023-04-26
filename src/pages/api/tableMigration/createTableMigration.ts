import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { createTableMigration } from "src/repositories/tableMigrationRepository";
const createTableMigrationEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { before,after,action,status,tableDefinitionId,ownerId } = req.body;
    var createTableMigrationResponse = await createTableMigration(before,after,action,status,tableDefinitionId,ownerId);

    res.json(new ApiResponse<any>(createTableMigrationResponse.id))
  res.statusCode = 200;
  return res;
}
export default createTableMigrationEndpoint
