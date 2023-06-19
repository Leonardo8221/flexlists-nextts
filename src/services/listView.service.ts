import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponse";
import axios from "src/utils/axios";
import { User } from 'src/models/SharedModels'
import { CreateViewOutputDto } from 'src/models/ApiOutputModels'
import { ViewType } from 'src/enums/SharedEnums'
import { ListCategory } from 'src/enums/SharedEnums'
import { Sort } from 'src/models/SharedModels'
import { Query } from 'src/models/SharedModels'
import { View } from 'src/models/SharedModels'
import { Role } from 'src/enums/SharedEnums'
import { CheckInviteOutputDto } from 'src/models/ApiOutputModels'
import { AcceptInviteOutputDto } from 'src/models/ApiOutputModels'

export const listViewService = {
    getViewUsers,
    createView,
    renameView,
    updateView,
    getViews,
    softDeleteView,
    getView,
    inviteUserToView,
    inviteEmailToView,
    updateUserRoleForView,
    deleteUserFromView,
    checkInvite,
    acceptInvite,
};

async function getViewUsers(viewId:number): Promise<FlexlistsError|FlexlistsSuccess<User[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<User[]>>('/api/listView/getViewUsers'+`?viewId=${viewId}`)
  return response.data;
};
async function createView(listId:number,name:string,type:ViewType,config:any,template?:boolean,category?:ListCategory,page?:number,limit?:number,order?:Sort[],query?:Query,description?:string,conditions?:any,fields?:any): Promise<FlexlistsError|FlexlistsSuccess<CreateViewOutputDto>> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess<CreateViewOutputDto>>(`/api/listView/createView`, {listId,name,type,config,template,category,page,limit,order,query,description,conditions,fields})

  return response.data;
};
async function renameView(viewId:number,name:string,description?:string): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/listView/renameView`, {viewId,name,description})

  return response.data;
};
async function updateView(viewId:number,name:string,type:ViewType,config?:any,page?:number,limit?:number,order?:Sort[],query?:Query,description?:string,conditions?:any,fields?:any): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/listView/updateView`, {viewId,name,type,config,page,limit,order,query,description,conditions,fields})

  return response.data;
};
async function getViews(baseViewId?:number,oneViewId?:number,page?:number,limit?:number): Promise<FlexlistsError|FlexlistsSuccess<View[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<View[]>>('/api/listView/getViews'+`?baseViewId=${baseViewId}&oneViewId=${oneViewId}&page=${page}&limit=${limit}`)
  return response.data;
};
async function softDeleteView(viewId:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.delete<FlexlistsError|FlexlistsSuccess>(`/api/listView/softDeleteView`+`?viewId=${viewId}`);

  return response.data;
};
async function getView(viewId:number): Promise<FlexlistsError|FlexlistsSuccess<View[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<View[]>>('/api/listView/getView'+`?viewId=${viewId}`)
  return response.data;
};
async function inviteUserToView(viewId:number,userId:number,role:Role): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/listView/inviteUserToView`, {viewId,userId,role})

  return response.data;
};
async function inviteEmailToView(viewId:number,email:string,role:Role): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/listView/inviteEmailToView`, {viewId,email,role})

  return response.data;
};
async function updateUserRoleForView(viewId:number,userId:number,role:Role): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/listView/updateUserRoleForView`, {viewId,userId,role})

  return response.data;
};
async function deleteUserFromView(viewId:number,userId:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.delete<FlexlistsError|FlexlistsSuccess>(`/api/listView/deleteUserFromView`+`?viewId=${viewId}&userId=${userId}`);

  return response.data;
};
async function checkInvite(uuid:string): Promise<FlexlistsError|FlexlistsSuccess<CheckInviteOutputDto>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<CheckInviteOutputDto>>('/api/listView/checkInvite'+`?uuid=${uuid}`)
  return response.data;
};
async function acceptInvite(uuid:string): Promise<FlexlistsError|FlexlistsSuccess<AcceptInviteOutputDto>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<AcceptInviteOutputDto>>('/api/listView/acceptInvite'+`?uuid=${uuid}`)
  return response.data;
};
