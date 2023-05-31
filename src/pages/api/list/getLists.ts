import { NextApiRequest, NextApiResponse } from "next"
import { Role } from "src/enums/SharedEnums";
import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponseDummy";
const getListsEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {

    res.json(new FlexlistsSuccess([{id:1,name:'test',description: 'this is test',fields:[],role:[Role.AddOnly],subList:[]}]))
    res.statusCode = 200;
    return res;
}
export default getListsEndpoint