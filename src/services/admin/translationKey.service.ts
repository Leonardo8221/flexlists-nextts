import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponse";
import axios from "src/utils/axios";
import { TranslationKeyType } from 'src/enums/SharedEnums'
import { TranslationKeyDto } from 'src/models/TranslationKeyDto'

export const translationKeyService = {
    createTranslationKey,
    updateTranslationKey,
    getTranslationKeyById,
    getAllTranslationKey,
    deleteTranslationKey
};

async function createTranslationKey(name:string,type:TranslationKeyType,ownerId:number,config:string): Promise<FlexlistsError|FlexlistsSuccess<TranslationKeyDto>> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess<TranslationKeyDto>>(`/api/translationKey/createTranslationKey`, {name,type,ownerId,config})

  return response.data;
};
async function updateTranslationKey(id:number,name:string,type:TranslationKeyType,ownerId:number,config:string): Promise<FlexlistsError|FlexlistsSuccess<TranslationKeyDto>> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess<TranslationKeyDto>>(`/api/translationKey/updateTranslationKey`, {id,name,type,ownerId,config})

  return response.data;
};
async function getTranslationKeyById(id:number): Promise<FlexlistsError|FlexlistsSuccess<TranslationKeyDto>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<TranslationKeyDto>>('/api/translationKey/getTranslationKeyById'+'?id='+id)
  return response.data;
};
async function getAllTranslationKey(): Promise<FlexlistsError|FlexlistsSuccess<TranslationKeyDto[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<TranslationKeyDto[]>>('/api/translationKey/getAllTranslationKey')
  return response.data;
};
async function deleteTranslationKey(id:number): Promise<FlexlistsError|FlexlistsSuccess<TranslationKeyDto>> {
  var response = await axios.delete<FlexlistsError|FlexlistsSuccess<TranslationKeyDto>>(`/api/translationKey/deleteTranslationKey`+'?id='+id);

  return response.data;
};
