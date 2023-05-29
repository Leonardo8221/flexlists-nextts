import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponse";
import axios from "src/utils/axios";

export const listChatService = {
    createListChat,
    updateListChat,
    getListChats,
    deleteListChat,
};

async function createListChat(): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess>('/api/listChat/createListChat')
  return response.data;
};
async function updateListChat(): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess>('/api/listChat/updateListChat')
  return response.data;
};
async function getListChats(): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess>('/api/listChat/getListChats')
  return response.data;
};
async function deleteListChat(): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess>('/api/listChat/deleteListChat')
  return response.data;
};
