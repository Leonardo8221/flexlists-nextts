import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponse";
import axios from "src/utils/axios";
import { CreateFieldOutputDto } from 'src/models/ApiOutputModels'
import { FieldType } from 'src/enums/SharedEnums'
import { Field } from 'src/models/SharedModels'
import { ViewField } from "src/models/ViewField";

export const fieldService = {
    createField,
    updateField,
    getFields,
    deleteField,
};

async function createField(viewId:number,name:string,type:FieldType,ordering:number,required:boolean,detailsOnly:boolean,description?:string,minimum?:number,maximum?:number,config?:any,icon?:string): Promise<FlexlistsError|FlexlistsSuccess<CreateFieldOutputDto>> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess<CreateFieldOutputDto>>(`/api/field/createField`, {viewId,name,type,ordering,required,detailsOnly,description,minimum,maximum,config,icon})

  return response.data;
};
async function updateField(listId:number,fieldId:number,name:string,type:FieldType,ordering:number,required:boolean,detailsOnly:string,description:string): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/field/updateField`, {listId,fieldId,name,type,ordering,required,detailsOnly,description})

  return response.data;
};
async function getFields(viewId:number): Promise<FlexlistsError|FlexlistsSuccess<ViewField[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<Field[]>>('/api/field/getFields'+`?viewId=${viewId}`)
  return response.data;
};
async function deleteField(listId:number,fieldId:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess>('/api/field/deleteField'+`?listId=${listId}&fieldId=${fieldId}`)
  return response.data;
};
