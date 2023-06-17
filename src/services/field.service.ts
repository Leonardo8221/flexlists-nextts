import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponse";
import axios from "src/utils/axios";
import { CreateUIFieldOutputDto } from 'src/models/ApiOutputModels'
import { CreateFieldOutputDto } from 'src/models/ApiOutputModels'
import { FieldType } from 'src/enums/SharedEnums'
import { UpdateListFieldOutputDto } from 'src/models/ApiOutputModels'
import { Field } from 'src/models/SharedModels'

export const fieldService = {
    createUIField,
    createField,
    updateListField,
    updateField,
    createViewField,
    updateViewField,
    getFields,
    deleteField,
};

async function createUIField(viewId:number,name:string,type:string,required:boolean,detailsOnly:boolean,description?:string,config?:any,icon?:string,defaultValue?:string): Promise<FlexlistsError|FlexlistsSuccess<CreateUIFieldOutputDto>> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess<CreateUIFieldOutputDto>>(`/api/field/createUIField`, {viewId,name,type,required,detailsOnly,description,config,icon,defaultValue})

  return response.data;
};
async function createField(viewId:number,name:string,type:FieldType,ordering:number,required:boolean,detailsOnly:boolean,description?:string,minimum?:number,maximum?:number,config?:any,legacyId?:number,icon?:string,defaultValue?:string,indexed?:boolean): Promise<FlexlistsError|FlexlistsSuccess<CreateFieldOutputDto>> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess<CreateFieldOutputDto>>(`/api/field/createField`, {viewId,name,type,ordering,required,detailsOnly,description,minimum,maximum,config,legacyId,icon,defaultValue,indexed})

  return response.data;
};
async function updateListField(viewId:number,fieldId:number,name:string,type:string,required:boolean,detailsOnly:boolean,description?:string,config?:any,icon?:string,defaultValue?:string): Promise<FlexlistsError|FlexlistsSuccess<UpdateListFieldOutputDto>> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess<UpdateListFieldOutputDto>>(`/api/field/updateListField`, {viewId,fieldId,name,type,required,detailsOnly,description,config,icon,defaultValue})

  return response.data;
};
async function updateField(viewId:number,fieldId:number,name?:string,type?:FieldType,ordering?:number,required?:boolean,detailsOnly?:boolean,description?:string,minimum?:number,maximum?:number,config?:any,icon?:string,defaultValue?:string,indexed?:boolean): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/field/updateField`, {viewId,fieldId,name,type,ordering,required,detailsOnly,description,minimum,maximum,config,icon,defaultValue,indexed})

  return response.data;
};
async function createViewField(viewId:number,fieldId:number,color?:string,name?:string,detailsOnly?:boolean,visible?:boolean,ordering?:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/field/createViewField`, {viewId,fieldId,color,name,detailsOnly,visible,ordering})

  return response.data;
};
async function updateViewField(viewId:number,fieldId:number,color?:string,name?:string,detailsOnly?:boolean,visible?:boolean,ordering?:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/field/updateViewField`, {viewId,fieldId,color,name,detailsOnly,visible,ordering})

  return response.data;
};
async function getFields(viewId:number): Promise<FlexlistsError|FlexlistsSuccess<Field[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<Field[]>>('/api/field/getFields'+`?viewId=${viewId}`)
  return response.data;
};
async function deleteField(viewId:number,fieldId:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess>('/api/field/deleteField'+`?viewId=${viewId}&fieldId=${fieldId}`)
  return response.data;
};
