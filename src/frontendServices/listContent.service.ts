import { ApiResponse } from "src/models/ApiResponse";
import axios from "src/utils/axios";
export const listContentService = {
    getListContents
};

async function getListContents(listId:number): Promise<ApiResponse<any[]>> {
  var response = await axios.get<ApiResponse<any[]>>('/api/dummy/listContent/getListContents?listId='+listId)
  return response.data;
};
