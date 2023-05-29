import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponse";
import axios from "src/utils/axios";
import { CreateViewOutputDto } from 'src/models/ApiOutputModels'
import { ViewType } from 'src/enums/SharedEnums'
import { Sort } from 'src/models/SharedModels'
import { Query } from 'src/models/SharedModels'
import { View } from 'src/models/SharedModels'

export const listViewService = {
    createView,
    updateView,
    getViews,
    deleteView,
    getView,
};

async function createView(listId:number,name:string,type:ViewType,config:any,page:number,limit:number,order:Sort[],query:Query,description:string): Promise<FlexlistsError|FlexlistsSuccess<CreateViewOutputDto>> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess<CreateViewOutputDto>>(`/api/listView/createView`, {listId,name,type,config,page,limit,order,query,description})

  return response.data;
};
async function updateView(listId:number,viewId:number,name:string,type:ViewType,config:any,page:number,limit:number,order:Sort[],query:Query): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/listView/updateView`, {listId,viewId,name,type,config,page,limit,order,query})

  return response.data;
};
async function getViews(listId:number): Promise<FlexlistsError|FlexlistsSuccess<View[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<View[]>>('/api/listView/getViews'+`?listId=${listId}`)
  return response.data;
};
async function deleteView(listId:number,listViewId:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.delete<FlexlistsError|FlexlistsSuccess>(`/api/listView/deleteView`+`?listId=${listId}&listViewId=${listViewId}`);

  return response.data;
};
async function getView(listId:number,viewId:number): Promise<FlexlistsError|FlexlistsSuccess<View[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<View[]>>('/api/listView/getView'+`?listId=${listId}&viewId=${viewId}`)
  return response.data;
};
