import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponse";
import axios from "src/utils/axios";
import { GetProfileOutputDto } from 'src/models/ApiOutputModels'

export const accountService = {
    updateProfile,
    getProfile,
    changePassword,
    changeEmail,
    validateEmailChange,
    deleteUser,
};

async function updateProfile(userId:number,name:string,firstName:string,lastName:string,phonenumber:string,avatar:string): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/account/updateProfile`, {userId,name,firstName,lastName,phonenumber,avatar})

  return response.data;
};
async function getProfile(userId:number): Promise<FlexlistsError|FlexlistsSuccess<GetProfileOutputDto>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<GetProfileOutputDto>>('/api/account/getProfile'+`?userId=${userId}`)
  return response.data;
};
async function changePassword(userId:number,oldPassword:string,newPassword:string): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/account/changePassword`, {userId,oldPassword,newPassword})

  return response.data;
};
async function changeEmail(userId:number,email:string): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/account/changeEmail`, {userId,email})

  return response.data;
};
async function validateEmailChange(userId:number,token:string): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/account/validateEmailChange`, {userId,token})

  return response.data;
};
async function deleteUser(userId:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.delete<FlexlistsError|FlexlistsSuccess>(`/api/account/deleteUser`+`?userId=${userId}`);

  return response.data;
};
