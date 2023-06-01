import { NextApiRequest, NextApiResponse } from "next"
import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponseDummy";
const getViewsEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    res.json(new FlexlistsSuccess(
        {
          id: '1',
          name: 'test',
          description: '<p><strong>this is test</strong></p>',
          category: 'Content'
        }
      ))
    res.statusCode = 200;
    return res;
}
export default getViewsEndpoint