import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { getProductWorkflow } from "src/services/getProductWorkflow"
import { convertToString } from "src/utils/convertUtils"
import { isString } from "src/utils/validateUtils"
export const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    if(!isString(id))
    {
        res.json(new BaseApiResponse(1000,'id invalid'));
        res.statusCode = 200;
        return res;
    }
    var getProductWorkflowResponse = await getProductWorkflow(convertToString(id));

    res.json(new ApiResponse<any>(getProductWorkflowResponse))
    res.statusCode = 200;
    return res;
}