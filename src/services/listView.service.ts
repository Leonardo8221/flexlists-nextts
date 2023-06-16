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
    softDeleteView,
    getView,
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
