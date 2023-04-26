import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { createProductWorkFlow } from "src/services/createProductWorkFlow"
import { isString } from "src/utils/validateUtils"
export const createProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name,description } = req.body;
    if(!isString(name))
    {
        res.json(new BaseApiResponse(1000,'name invalid'));
        res.statusCode = 200;
        return res;
    }
    if(!isString(description))
    {
        res.json(new BaseApiResponse(1000,'description invalid'));
        res.statusCode = 200;
        return res;
    }
    var createProductWorkFlowResponse = await createProductWorkFlow(name,description);

    res.json(new ApiResponse<any>(createProductWorkFlowResponse))
    res.statusCode = 200;
    return res;
}