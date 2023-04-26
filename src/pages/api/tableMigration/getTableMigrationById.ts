import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { getTableMigrationById } from "src/repositories/tableMigrationRepository";
const getTableMigrationByIdEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
     if(!id || isNaN(Number(id)))
     {
        res.json(new BaseApiResponse(1000,'id invalid'));
        res.statusCode = 200;
        return res;
     }
    var getTableMigrationByIdResponse = await getTableMigrationById(Number(id));
    res.json(new ApiResponse<any>(getTableMigrationByIdResponse))
  res.statusCode = 200;
  return res;
}
export default getTableMigrationByIdEndpoint
