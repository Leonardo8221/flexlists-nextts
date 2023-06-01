import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponse";
import axios from "src/utils/axios";
import { CreateListOutputDto } from 'src/models/ApiOutputModels'
import { ListCategory } from 'src/enums/SharedEnums'
import { ViewType } from 'src/enums/SharedEnums'
import { PublishListOutputDto } from 'src/models/ApiOutputModels'
import { PublishType } from 'src/enums/SharedEnums'
import { List } from 'src/models/SharedModels'
import { Role } from 'src/enums/SharedEnums'
import { GetUsersOutputDto } from 'src/models/ApiOutputModels'
import { AddAccessToListOutputDto } from 'src/models/ApiOutputModels'
import { GetKeysOutputDto } from 'src/models/ApiOutputModels'

export const listService = {
    createList,
    renameList,
    deleteList,
    archiveList,
    unArchiveList,
    publishList,
    shareList,
    undoList,
    truncateList,
    getLists,
    getList,
    copyList,
    addUserToList,
    removeUserFromList,
    getUsers,
    addAccessToList,
    removeAccessFromList,
    getKeys,
};

async function createList(name:string,description:string,category:ListCategory,type:ViewType): Promise<FlexlistsError|FlexlistsSuccess<CreateListOutputDto>> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess<CreateListOutputDto>>(`/api/list/createList`, {name,description,category,type})

  return response.data;
};
async function renameList(id:number,name:string): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/list/renameList`, {id,name})

  return response.data;
};
async function deleteList(id:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.delete<FlexlistsError|FlexlistsSuccess>(`/api/list/deleteList`+`?id=${id}`);

  return response.data;
};
async function archiveList(id:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/list/archiveList`, {id})

  return response.data;
};
async function unArchiveList(id:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/list/unArchiveList`, {id})

  return response.data;
};
async function publishList(listId:number,type:PublishType,name:string): Promise<FlexlistsError|FlexlistsSuccess<PublishListOutputDto>> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess<PublishListOutputDto>>(`/api/list/publishList`, {listId,type,name})

  return response.data;
};
async function shareList(): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess>('/api/list/shareList')
  return response.data;
};
async function undoList(): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess>('/api/list/undoList')
  return response.data;
};
async function truncateList(id:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.delete<FlexlistsError|FlexlistsSuccess>(`/api/list/truncateList`+`?id=${id}`);

  return response.data;
};
async function getLists(): Promise<FlexlistsError|FlexlistsSuccess<List[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<List[]>>('/api/list/getLists')
  return response.data;
};
async function getList(listId:number): Promise<FlexlistsError|FlexlistsSuccess<List>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<List>>('/api/list/getList'+`?listId=${listId}`)
  return response.data;
};
async function copyList(id:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/list/copyList`, {id})

  return response.data;
};
async function addUserToList(listId:number,userId:number,role:Role): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/list/addUserToList`, {listId,userId,role})

  return response.data;
};
async function removeUserFromList(listId:number,userId:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.delete<FlexlistsError|FlexlistsSuccess>(`/api/list/removeUserFromList`+`?listId=${listId}&userId=${userId}`);

  return response.data;
};
async function getUsers(listId:number): Promise<FlexlistsError|FlexlistsSuccess<GetUsersOutputDto[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<GetUsersOutputDto[]>>('/api/list/getUsers'+`?listId=${listId}`)
  return response.data;
};
async function addAccessToList(listId:number,role:number,name:string): Promise<FlexlistsError|FlexlistsSuccess<AddAccessToListOutputDto>> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess<AddAccessToListOutputDto>>(`/api/list/addAccessToList`, {listId,role,name})

  return response.data;
};
async function removeAccessFromList(listId:number,keyId:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.delete<FlexlistsError|FlexlistsSuccess>(`/api/list/removeAccessFromList`+`?listId=${listId}&keyId=${keyId}`);

  return response.data;
};
async function getKeys(listId:number): Promise<FlexlistsError|FlexlistsSuccess<GetKeysOutputDto[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<GetKeysOutputDto[]>>('/api/list/getKeys'+`?listId=${listId}`)
  return response.data;
};
