import { FlexlistsError, FlexlistsSuccess } from "src/models/ApiResponse";
import axios from "src/utils/axios";
import { AddTranslationKeyToContentManagementOutputDto, GetTranslationKeysOfContentManagementOutputDto } from 'src/models/ApiOutputModels'
import { TranslationKeyType } from 'src/enums/SharedEnums'
import { GetContentManagementTranslationTextsOutputDto } from 'src/models/ApiOutputModels'
import { ContentManagementDto } from "src/models/ContentManagementDto";

export const contentManagementService = {
  createContentManagement,
  updateContentManagement,
  getContentManagementById,
  getAllContentManagement,
  deleteContentManagement,
  addTranslationKeyToContentManagement,
  getTranslationKeysOfContentManagement,
  deleteTranslationKeyFromContentManagement,
  getContentManagementTranslationTexts,
  uploadFile,
  downloadFile
};
async function createContentManagement(name: string, ownerId: number, config?: any): Promise<FlexlistsError | FlexlistsSuccess<ContentManagementDto>> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess<ContentManagementDto>>(`/api/contentManagement/createContentManagement`, { name, ownerId, config })

  return response.data;
};
async function updateContentManagement(id: number, name: string, ownerId: number, config?: any): Promise<FlexlistsError | FlexlistsSuccess<ContentManagementDto>> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess<ContentManagementDto>>(`/api/contentManagement/updateContentManagement`, { id, name, ownerId, config })

  return response.data;
};
async function getContentManagementById(id: number): Promise<FlexlistsError | FlexlistsSuccess<ContentManagementDto>> {
  var response = await axios.get<FlexlistsError | FlexlistsSuccess<ContentManagementDto>>('/api/contentManagement/getContentManagementById' + '?id=' + id)
  return response.data;
};
async function getAllContentManagement(): Promise<FlexlistsError | FlexlistsSuccess<ContentManagementDto[]>> {
  var response = await axios.get<FlexlistsError | FlexlistsSuccess<ContentManagementDto[]>>('/api/contentManagement/getAllContentManagement')
  return response.data;
};
async function deleteContentManagement(id: number): Promise<FlexlistsError | FlexlistsSuccess<ContentManagementDto>> {
  var response = await axios.delete<FlexlistsError | FlexlistsSuccess<ContentManagementDto>>(`/api/contentManagement/deleteContentManagement` + '?id=' + id);

  return response.data;
};
async function addTranslationKeyToContentManagement(name: string, type: TranslationKeyType, contentMangementId: number, reusable: boolean, config?: any): Promise<FlexlistsError | FlexlistsSuccess<AddTranslationKeyToContentManagementOutputDto>> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess<AddTranslationKeyToContentManagementOutputDto>>(`/api/contentManagement/addTranslationKeyToContentManagement`, { name, type, contentMangementId, reusable, config })

  return response.data;
};
async function getTranslationKeysOfContentManagement(contentManagementId: number): Promise<FlexlistsError | FlexlistsSuccess<GetTranslationKeysOfContentManagementOutputDto[]>> {
  var response = await axios.get<FlexlistsError | FlexlistsSuccess<GetTranslationKeysOfContentManagementOutputDto[]>>('/api/contentManagement/getTranslationKeysOfContentManagement' + `?contentManagementId=${contentManagementId}`)
  return response.data;
};
async function deleteTranslationKeyFromContentManagement(contentMangementId: number, translationKeyId: number): Promise<FlexlistsError | FlexlistsSuccess> {
  var response = await axios.delete<FlexlistsError | FlexlistsSuccess>(`/api/contentManagement/deleteTranslationKeyFromContentManagement` + `?contentMangementId=${contentMangementId}&translationKeyId=${translationKeyId}`);

  return response.data;
};
async function getContentManagementTranslationTexts(contentManagementId: number, i18n: string): Promise<FlexlistsError | FlexlistsSuccess<GetContentManagementTranslationTextsOutputDto[]>> {
  var response = await axios.get<FlexlistsError | FlexlistsSuccess<GetContentManagementTranslationTextsOutputDto[]>>('/api/contentManagement/getContentManagementTranslationTexts' + `?contentManagementId=${contentManagementId}&i18n=${i18n}`)
  return response.data;
};
export async function uploadFile(formData: any): Promise<any> {
  var response = await axios.post<any>(`/api/contentManagement/uploadFile`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })

  return response.data;
};
async function downloadFile(id: string): Promise<FlexlistsError | FlexlistsSuccess<any>> {
  var response = await axios.get<FlexlistsError | FlexlistsSuccess<any>>('/api/contentManagement/downloadFile' + `?id=${id}`)
  return response.data;
};
export async function exportContentManagement(): Promise<FlexlistsError | FlexlistsSuccess<any>> {
  var response = await axios.get<FlexlistsError | FlexlistsSuccess<any>>('/api/contentManagement/exportContentManagement')
  return response.data;
};
export async function importContentManagement(contentManagementImportExport: any): Promise<FlexlistsError | FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess>(`/api/contentManagement/importContentManagement`, contentManagementImportExport,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })

  return response.data;
};
