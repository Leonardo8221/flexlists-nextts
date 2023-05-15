import { ApiResponse } from "src/models/ApiResponse";
import axios from "src/utils/axios";
import { FieldDefinitionDto } from 'src/models/FieldDefinitionDto'
export const fieldDefinitionService = {
    createFieldDefinition,
    updateFieldDefinition,
    getFieldDefinitionById,
    getAllFieldDefinition,
    deleteFieldDefinition
};
async function createFieldDefinition(ownerId:number,tableDefinitionId:number,name:string,type:string,ordering:number,required:boolean,detailsOnly:boolean,description:string): Promise<ApiResponse<FieldDefinitionDto>> {
  var response = await axios.post<ApiResponse<FieldDefinitionDto>>(`/api/fieldDefinition/createFieldDefinition`, {ownerId,tableDefinitionId,name,type,ordering,required,detailsOnly,description})

  return response.data;
};
async function updateFieldDefinition(id:number,ownerId:number,tableDefinitionId:number,name:string,type:string,ordering:number,required:boolean,detailsOnly:boolean,description:string): Promise<ApiResponse<FieldDefinitionDto>> {
  var response = await axios.post<ApiResponse<FieldDefinitionDto>>(`/api/fieldDefinition/updateFieldDefinition`, {id,ownerId,tableDefinitionId,name,type,ordering,required,detailsOnly,description})

  return response.data;
};
async function getFieldDefinitionById(id:number): Promise<ApiResponse<FieldDefinitionDto>> {
  var response = await axios.get<ApiResponse<FieldDefinitionDto>>('/api/fieldDefinition/getFieldDefinitionById'+'?id='+id)
  return response.data;
};
async function getAllFieldDefinition(listId:number): Promise<ApiResponse<FieldDefinitionDto[]>> {
  var response = await axios.get<ApiResponse<FieldDefinitionDto[]>>('/api/dummy/fieldDefinition/getAllFieldDefinition?listId='+listId)
  return response.data;
};
async function deleteFieldDefinition(id:number): Promise<ApiResponse<FieldDefinitionDto>> {
  var response = await axios.delete<ApiResponse<FieldDefinitionDto>>(`/api/fieldDefinition/deleteFieldDefinition`+'?id='+id);

  return response.data;
};
