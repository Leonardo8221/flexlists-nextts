import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponse";
import axios from "src/utils/axios";
import { ViewChat } from 'src/models/SharedModels'

export const listChatService = {
    chatInView,
    chatInContent,
    getViewChat,
    getContentChat,
};

async function chatInView(viewId:number,message:string): Promise<FlexlistsError|FlexlistsSuccess<ViewChat>> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess<ViewChat>>(`/api/listChat/chatInView`, {viewId,message})

  return response.data;
};
async function chatInContent(viewId:number,contentId:number,message:string): Promise<FlexlistsError|FlexlistsSuccess<ViewChat>> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess<ViewChat>>(`/api/listChat/chatInContent`, {viewId,contentId,message})

  return response.data;
};
async function getViewChat(viewId:number,page?:number,limit?:number): Promise<FlexlistsError|FlexlistsSuccess<ViewChat[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<ViewChat[]>>('/api/listChat/getViewChat'+`?viewId=${viewId}&page=${page}&limit=${limit}`)
  return response.data;
};
async function getContentChat(viewId:number,contentId:number,page?:number,limit?:number): Promise<FlexlistsError|FlexlistsSuccess<ViewChat[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<ViewChat[]>>('/api/listChat/getContentChat'+`?viewId=${viewId}&contentId=${contentId}&page=${page}&limit=${limit}`)
  return response.data;
};
