import { FlexlistsError, FlexlistsSuccess } from "src/models/ApiResponse";
import axios from "src/utils/axios";
export async function uploadFile(formData: any): Promise<FlexlistsError | FlexlistsSuccess<{fileId:any}>> {
    var response = await axios.post<any>(`/api/file/uploadFile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  
    return response.data;
  };
 export async function downloadFile(id: string): Promise<FlexlistsError | FlexlistsSuccess<any>> {
    var response = await axios.get<FlexlistsError | FlexlistsSuccess<any>>('/api/file/downloadFile' + `?id=${id}`)
    return response.data;
  };