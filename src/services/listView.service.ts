import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponse";
import axios from "src/utils/axios";
import { CreateViewOutputDto } from 'src/models/ApiOutputModels'
import { ViewType } from 'src/enums/SharedEnums'
import { ListCategory } from 'src/enums/SharedEnums'
import { Sort } from 'src/models/SharedModels'
import { Query } from 'src/models/SharedModels'
import { View } from 'src/models/SharedModels'

export const listViewService = {
    createView,
    renameView,
    updateView,
    getViews,
    deleteView,
    getView,
};

async function createView(listId:number,name:string,type:ViewType,config:any,template?:boolean,category?:ListCategory,page?:number,limit?:number,order?:Sort[],query?:Query,description?:string,conditions?:any): Promise<FlexlistsError|FlexlistsSuccess<CreateViewOutputDto>> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess<CreateViewOutputDto>>(`/api/listView/createView`, {listId,name,type,config,template,category,page,limit,order,query,description,conditions})

  return response.data;
};
async function renameView(viewId:number,name:string): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/listView/renameView`, {viewId,name})

  return response.data;
};
async function updateView(listId:number,viewId:number,name:string,type:ViewType,config?:any,page?:number,limit?:number,order?:Sort[],query?:Query,description?:string,conditions?:any): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/listView/updateView`, {listId,viewId,name,type,config,page,limit,order,query,description,conditions})

  return response.data;
};
async function getViews(listId?:number,viewId?:number,page?:number,limit?:number): Promise<FlexlistsError|FlexlistsSuccess<View[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<View[]>>('/api/listView/getViews'+`?listId=${listId}&viewId=${viewId}&page=${page}&limit=${limit}`)
  return response.data;
};
async function deleteView(listId:number,listViewId:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.delete<FlexlistsError|FlexlistsSuccess>(`/api/listView/deleteView`+`?listId=${listId}&listViewId=${listViewId}`);

  return response.data;
};
async function getView(viewId:number): Promise<FlexlistsError|FlexlistsSuccess<View[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<View[]>>('/api/listView/getView'+`?viewId=${viewId}`)
  return response.data;
};
