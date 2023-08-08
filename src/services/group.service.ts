import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponse";
import axios from "src/utils/axios";
import { CreateUserGroupOutputDto, GetUserGroupByIdOutputDto } from 'src/models/ApiOutputModels'
import { GetUserGroupsOutputDto } from 'src/models/ApiOutputModels'
import { GetGroupViewsOutputDto } from 'src/models/ApiOutputModels'
import { GetGroupUsersOutputDto } from 'src/models/ApiOutputModels'
import { AddUserToGroupOutputDto } from 'src/models/ApiOutputModels'

export const groupService = {
    createUserGroup,
    updateUserGroup,
    getUserGroups,
    deleteUserGroup,
    getGroupViews,
    getGroupUsers,
    addUserToGroup,
    deleteUserFromGroup,
};

async function createUserGroup(name:string,description?:string,avatarUrl?:string): Promise<FlexlistsError|FlexlistsSuccess<CreateUserGroupOutputDto>> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess<CreateUserGroupOutputDto>>(`/api/group/createUserGroup`, {name,description,avatarUrl})

  return response.data;
};
async function updateUserGroup(groupId:number,name?:string,description?:string,avatarUrl?:string): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/group/updateUserGroup`, {groupId,name,description,avatarUrl})

  return response.data;
};
async function getUserGroups(): Promise<FlexlistsError|FlexlistsSuccess<GetUserGroupsOutputDto[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<GetUserGroupsOutputDto[]>>('/api/group/getUserGroups')
  return response.data;
};
export async function getUserGroupById(groupId:number): Promise<FlexlistsError|FlexlistsSuccess<GetUserGroupByIdOutputDto>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<GetUserGroupByIdOutputDto>>('/api/group/getUserGroupById'+`?groupId=${groupId}`)
  return response.data;
};
async function deleteUserGroup(groupId:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.delete<FlexlistsError|FlexlistsSuccess>(`/api/group/deleteUserGroup`+`?groupId=${groupId}`);

  return response.data;
};
async function getGroupViews(groupId:number): Promise<FlexlistsError|FlexlistsSuccess<GetGroupViewsOutputDto[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<GetGroupViewsOutputDto[]>>('/api/group/getGroupViews'+`?groupId=${groupId}`)
  return response.data;
};
async function getGroupUsers(groupId:number): Promise<FlexlistsError|FlexlistsSuccess<GetGroupUsersOutputDto[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<GetGroupUsersOutputDto[]>>('/api/group/getGroupUsers'+`?groupId=${groupId}`)
  return response.data;
};
async function addUserToGroup(groupId:number,userId:number): Promise<FlexlistsError|FlexlistsSuccess<AddUserToGroupOutputDto>> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess<AddUserToGroupOutputDto>>(`/api/group/addUserToGroup`, {groupId,userId})

  return response.data;
};
async function deleteUserFromGroup(groupId:number,userId:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.delete<FlexlistsError|FlexlistsSuccess>(`/api/group/deleteUserFromGroup`+`?groupId=${groupId}&userId=${userId}`);

  return response.data;
};
