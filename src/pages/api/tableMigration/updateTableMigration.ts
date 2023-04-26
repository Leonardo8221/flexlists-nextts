import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { updateTableMigration } from "src/repositories/tableMigrationRepository";
const updateTableMigrationEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id,before,after,action,status,tableDefinitionId,ownerId } = req.body;
    var updateTableMigrationResponse = await updateTableMigration(id,before,after,action,status,tableDefinitionId,ownerId);
    res.json(new ApiResponse<any>(updateTableMigrationResponse))
  res.statusCode = 200;
  return res;
}
export default updateTableMigrationEndpoint
