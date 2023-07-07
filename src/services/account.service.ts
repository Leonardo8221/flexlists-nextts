import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponse";
import axios from "src/utils/axios";
import { GetUserContactsOutputDto } from 'src/models/ApiOutputModels'
import { GetProfileOutputDto } from 'src/models/ApiOutputModels'

export const accountService = {
    getUserContacts,
    updateProfile,
    getProfile,
    changePassword,
    changeEmail,
    validateEmailChange,
    deleteUser,
};

export async function getUserContacts(): Promise<FlexlistsError|FlexlistsSuccess<GetUserContactsOutputDto[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<GetUserContactsOutputDto[]>>('/api/account/getUserContacts')
  return response.data;
};
export async function updateProfile(userId:number,name?:string,firstName?:string,lastName?:string,phonenumber?:string,avatar?:string): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/account/updateProfile`, {userId,name,firstName,lastName,phonenumber,avatar})

  return response.data;
};
export async function getProfile(userId:number): Promise<FlexlistsError|FlexlistsSuccess<GetProfileOutputDto>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<GetProfileOutputDto>>('/api/account/getProfile'+`?userId=${userId}`)
  return response.data;
};
export async function changePassword(oldPassword:string,newPassword:string): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/account/changePassword`, {oldPassword,newPassword})

  return response.data;
};
export async function changeEmail(userId:number,email:string): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/account/changeEmail`, {userId,email})

  return response.data;
};
export async function validateEmailChange(userId:number,token:string): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/account/validateEmailChange`, {userId,token})

  return response.data;
};
export async function deleteUser(userId:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.delete<FlexlistsError|FlexlistsSuccess>(`/api/account/deleteUser`+`?userId=${userId}`);

  return response.data;
};
