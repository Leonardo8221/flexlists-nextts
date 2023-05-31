import { NextApiRequest, NextApiResponse } from "next"
import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponseDummy";
const getListEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    res.json(new FlexlistsSuccess([
        {
          id: '1',
          name: 'test',
          description: 'this is test list',
          category: 'Content'
        }
      ]))
    res.statusCode = 200;
    return res;
}
export default getListEndpoint