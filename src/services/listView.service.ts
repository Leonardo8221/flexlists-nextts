import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponse";
import axios from "src/utils/axios";
import { GetViewUsersOutputDto } from 'src/models/ApiOutputModels'
import { CreateViewOutputDto } from 'src/models/ApiOutputModels'
import { ViewType } from 'src/enums/SharedEnums'
import { ListCategory } from 'src/enums/SharedEnums'
import { Sort } from 'src/models/SharedModels'
import { View } from 'src/models/SharedModels'
import { SearchViewsOutputDto } from 'src/models/ApiOutputModels'
import { Role } from 'src/enums/SharedEnums'
import { CheckInviteOutputDto } from 'src/models/ApiOutputModels'
import { AcceptInviteOutputDto } from 'src/models/ApiOutputModels'
import { GetViewGroupsOutputDto } from 'src/models/ApiOutputModels'
import { AddTableViewToGroupOutputDto } from 'src/models/ApiOutputModels'
import { AddKeyToViewOutputDto } from 'src/models/ApiOutputModels'
import { GetKeysForViewOutputDto } from 'src/models/ApiOutputModels'
import { ExportType } from 'src/enums/SharedEnums'
import { GetViewTemplatesOutputDto } from 'src/models/ApiOutputModels'
import { CreateCoreViewOutputDto } from 'src/models/ApiOutputModels'

export const listViewService = {
    getViewUsers,
    createView,
    renameView,
    updateView,
    getViews,
    searchViews,
    softDeleteView,
    getView,
    inviteUserToView,
    inviteEmailToView,
    updateUserRoleForView,
    deleteUserFromView,
    checkInvite,
    acceptInvite,
    getViewGroups,
    addTableViewToGroup,
    updateTableViewGroupRole,
    deleteTableViewFromGroup,
    addKeyToView,
    getKeysForView,
    deleteKeyFromView,
    exportViewData,
    getViewTemplates,
    createCoreView,
};

export async function getViewUsers(viewId:number): Promise<FlexlistsError|FlexlistsSuccess<GetViewUsersOutputDto[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<GetViewUsersOutputDto[]>>('/api/listView/getViewUsers'+`?viewId=${viewId}`)
  return response.data;
};
export async function createView(listId:number,name:any,type:ViewType,config:any,template?:boolean,category?:ListCategory,page?:number,limit?:number,order?:Sort[],query?:any,description?:any,conditions?:any,fields?:any): Promise<FlexlistsError|FlexlistsSuccess<CreateViewOutputDto>> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess<CreateViewOutputDto>>(`/api/listView/createView`, {listId,name,type,config,template,category,page,limit,order,query,description,conditions,fields})

  return response.data;
};
export async function renameView(viewId:number,name:any,description?:any): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/listView/renameView`, {viewId,name,description})

  return response.data;
};
export async function updateView(viewId:number,name:any,type:ViewType,config?:any,page?:number,limit?:number,order?:Sort[],query?:any,description?:any,conditions?:any,fields?:any): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/listView/updateView`, {viewId,name,type,config,page,limit,order,query,description,conditions,fields})

  return response.data;
};
export async function getViews(baseViewId?:number,oneViewId?:number,page?:number,limit?:number): Promise<FlexlistsError|FlexlistsSuccess<View[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<View[]>>('/api/listView/getViews'+`?baseViewId=${baseViewId}&oneViewId=${oneViewId}&page=${page}&limit=${limit}`)
  return response.data;
};
export async function searchViews(searchText?:any,page?:number,limit?:number): Promise<FlexlistsError|FlexlistsSuccess<SearchViewsOutputDto>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<SearchViewsOutputDto>>('/api/listView/searchViews'+`?searchText=${searchText}&page=${page}&limit=${limit}`)
  return response.data;
};
export async function softDeleteView(viewId:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.delete<FlexlistsError|FlexlistsSuccess>(`/api/listView/softDeleteView`+`?viewId=${viewId}`);

  return response.data;
};
export async function getView(viewId:number): Promise<FlexlistsError|FlexlistsSuccess<View[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<View[]>>('/api/listView/getView'+`?viewId=${viewId}`)
  return response.data;
};
export async function inviteUserToView(viewId:number,userId:number,role:Role): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/listView/inviteUserToView`, {viewId,userId,role})

  return response.data;
};
export async function inviteEmailToView(viewId:number,email:any,role:Role): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/listView/inviteEmailToView`, {viewId,email,role})

  return response.data;
};
export async function updateUserRoleForView(viewId:number,userId:number,role:Role): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/listView/updateUserRoleForView`, {viewId,userId,role})

  return response.data;
};
export async function deleteUserFromView(viewId:number,userId:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.delete<FlexlistsError|FlexlistsSuccess>(`/api/listView/deleteUserFromView`+`?viewId=${viewId}&userId=${userId}`);

  return response.data;
};
export async function checkInvite(uuid:any): Promise<FlexlistsError|FlexlistsSuccess<CheckInviteOutputDto>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<CheckInviteOutputDto>>('/api/listView/checkInvite'+`?uuid=${uuid}`)
  return response.data;
};
export async function acceptInvite(uuid:any): Promise<FlexlistsError|FlexlistsSuccess<AcceptInviteOutputDto>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<AcceptInviteOutputDto>>('/api/listView/acceptInvite'+`?uuid=${uuid}`)
  return response.data;
};
export async function getViewGroups(viewId:number): Promise<FlexlistsError|FlexlistsSuccess<GetViewGroupsOutputDto[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<GetViewGroupsOutputDto[]>>('/api/listView/getViewGroups'+`?viewId=${viewId}`)
  return response.data;
};
export async function addTableViewToGroup(groupId:number,tableViewId:number,role:Role): Promise<FlexlistsError|FlexlistsSuccess<AddTableViewToGroupOutputDto>> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess<AddTableViewToGroupOutputDto>>(`/api/listView/addTableViewToGroup`, {groupId,tableViewId,role})

  return response.data;
};
export async function updateTableViewGroupRole(groupId:number,tableViewId:number,role:Role): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/listView/updateTableViewGroupRole`, {groupId,tableViewId,role})

  return response.data;
};
export async function deleteTableViewFromGroup(groupId:number,tableViewId:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.delete<FlexlistsError|FlexlistsSuccess>(`/api/listView/deleteTableViewFromGroup`+`?groupId=${groupId}&tableViewId=${tableViewId}`);

  return response.data;
};
export async function addKeyToView(viewId:number,role:Role,name?:any): Promise<FlexlistsError|FlexlistsSuccess<AddKeyToViewOutputDto>> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess<AddKeyToViewOutputDto>>(`/api/listView/addKeyToView`, {viewId,role,name})

  return response.data;
};
export async function getKeysForView(viewId:number): Promise<FlexlistsError|FlexlistsSuccess<GetKeysForViewOutputDto[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<GetKeysForViewOutputDto[]>>('/api/listView/getKeysForView'+`?viewId=${viewId}`)
  return response.data;
};
export async function deleteKeyFromView(viewId:number,keyId:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.delete<FlexlistsError|FlexlistsSuccess>(`/api/listView/deleteKeyFromView`+`?viewId=${viewId}&keyId=${keyId}`);

  return response.data;
};
export async function exportViewData(type:ExportType,viewId:number,page?:number,limit?:number,order?:Sort[],query?:any,conditions?:any,delimiter?:any): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/listView/exportViewData`, {type,viewId,page,limit,order,query,conditions,delimiter})

  return response.data;
};
export async function getViewTemplates(category?:any,searchName?:any): Promise<FlexlistsError|FlexlistsSuccess<GetViewTemplatesOutputDto[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<GetViewTemplatesOutputDto[]>>('/api/listView/getViewTemplates'+`?category=${category}&searchName=${searchName}`)
  return response.data;
};
export async function createCoreView(viewId:number,name:any,description?:any): Promise<FlexlistsError|FlexlistsSuccess<CreateCoreViewOutputDto>> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess<CreateCoreViewOutputDto>>(`/api/listView/createCoreView`, {viewId,name,description})

  return response.data;
};
