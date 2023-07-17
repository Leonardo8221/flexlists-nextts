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
};

export async function getUserContacts(): Promise<FlexlistsError|FlexlistsSuccess<GetUserContactsOutputDto[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<GetUserContactsOutputDto[]>>('/api/account/getUserContacts')
  return response.data;
};
export async function updateProfile(email:string,firstName:string,lastName:string,phoneNumber?:string,avatarUrl?:string): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/account/updateProfile`, {email,firstName,lastName,phoneNumber,avatarUrl})

  return response.data;
};
export async function getProfile(): Promise<FlexlistsError|FlexlistsSuccess<GetProfileOutputDto>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<GetProfileOutputDto>>('/api/account/getProfile')
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
