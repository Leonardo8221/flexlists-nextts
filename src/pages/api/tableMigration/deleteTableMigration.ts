import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { deleteTableMigration } from "src/repositories/tableMigrationRepository";
const deleteTableMigrationEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
     if(!id || isNaN(Number(id)))
     {
        res.json(new BaseApiResponse(1000,'id invalid'));
        res.statusCode = 200;
        return res;
     }
    var deleteTableMigrationResponse = await deleteTableMigration(Number(id));
    res.json(new ApiResponse<any>(deleteTableMigrationResponse))
  res.statusCode = 200;
  return res;
}
export default deleteTableMigrationEndpoint
