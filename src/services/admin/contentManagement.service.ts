import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponse";
import axios from "src/utils/axios";
import { AddTranslationKeyToContentManagementOutputDto } from 'src/models/ApiOutputModels'
import { TranslationKeyType } from 'src/enums/SharedEnums'
import { GetContentManagementWithAccessKeysOutputDto } from 'src/models/ApiOutputModels'
import { GetContentManagementTranslationTextsOutputDto } from 'src/models/ApiOutputModels'
import { ContentManagementDto } from "src/models/ContentManagementDto";

export const contentManagementService = {
    createContentManagement,
    updateContentManagement,
    getContentManagementById,
    getAllContentManagement,
    deleteContentManagement,
    addTranslationKeyToContentManagement,
    getContentManagementWithAccessKeys,
    deleteTranslationKeyFromContentManagement,
    getContentManagementTranslationTexts,
};
async function createContentManagement(name:string,ownerId:number,config?:any): Promise<FlexlistsError|FlexlistsSuccess<ContentManagementDto>> {
    var response = await axios.post<FlexlistsError|FlexlistsSuccess<ContentManagementDto>>(`/api/contentManagement/createContentManagement`, {name,ownerId,config})
  
    return response.data;
};
async function updateContentManagement(id:number,name:string,ownerId:number,config?:any): Promise<FlexlistsError|FlexlistsSuccess<ContentManagementDto>> {
var response = await axios.post<FlexlistsError|FlexlistsSuccess<ContentManagementDto>>(`/api/contentManagement/updateContentManagement`, {id,name,ownerId,config})

return response.data;
};
async function getContentManagementById(id:number): Promise<FlexlistsError|FlexlistsSuccess<ContentManagementDto>> {
var response = await axios.get<FlexlistsError|FlexlistsSuccess<ContentManagementDto>>('/api/contentManagement/getContentManagementById'+'?id='+id)
return response.data;
};
async function getAllContentManagement(): Promise<FlexlistsError|FlexlistsSuccess<ContentManagementDto[]>> {
var response = await axios.get<FlexlistsError|FlexlistsSuccess<ContentManagementDto[]>>('/api/contentManagement/getAllContentManagement')
return response.data;
};
async function deleteContentManagement(id:number): Promise<FlexlistsError|FlexlistsSuccess<ContentManagementDto>> {
var response = await axios.delete<FlexlistsError|FlexlistsSuccess<ContentManagementDto>>(`/api/contentManagement/deleteContentManagement`+'?id='+id);

return response.data;
};
async function addTranslationKeyToContentManagement(name:string,type:TranslationKeyType,contentMangementId:number,config?:any): Promise<FlexlistsError|FlexlistsSuccess<AddTranslationKeyToContentManagementOutputDto>> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess<AddTranslationKeyToContentManagementOutputDto>>(`/api/contentManagement/addTranslationKeyToContentManagement`, {name,type,contentMangementId,config})

  return response.data;
};
async function getContentManagementWithAccessKeys(contentManagementId:number): Promise<FlexlistsError|FlexlistsSuccess<GetContentManagementWithAccessKeysOutputDto>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<GetContentManagementWithAccessKeysOutputDto>>('/api/contentManagement/getContentManagementWithAccessKeys'+`?contentManagementId=${contentManagementId}`)
  return response.data;
};
async function deleteTranslationKeyFromContentManagement(contentMangementId:number,translationKeyId:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.delete<FlexlistsError|FlexlistsSuccess>(`/api/contentManagement/deleteTranslationKeyFromContentManagement`+`?contentMangementId=${contentMangementId}&translationKeyId=${translationKeyId}`);

  return response.data;
};
async function getContentManagementTranslationTexts(contentManagementId:number,i18n:string): Promise<FlexlistsError|FlexlistsSuccess<GetContentManagementTranslationTextsOutputDto[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<GetContentManagementTranslationTextsOutputDto[]>>('/api/contentManagement/getContentManagementTranslationTexts'+`?contentManagementId=${contentManagementId}&i18n=${i18n}`)
  return response.data;
};
