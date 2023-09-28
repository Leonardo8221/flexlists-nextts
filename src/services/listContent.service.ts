import { FlexlistsError, FlexlistsSuccess } from "src/models/ApiResponse";
import axios from "src/utils/axios";
import { CreateContentOutputDto } from 'src/models/ApiOutputModels'
import { CloneContentOutputDto } from 'src/models/ApiOutputModels'
import { SearchContentsOutputDto } from 'src/models/ApiOutputModels'
import { Sort } from 'src/models/SharedModels'
import { SearchOutputDto } from 'src/models/ApiOutputModels'
import { SearchType } from 'src/enums/SharedEnums'
import { Query } from 'src/models/SharedModels'

export const listContentService = {
  reordercontents,
  createContent,
  cloneContent,
  updateContent,
  updateContents,
  deleteBulkContents,
  deleteContent,
  archiveBulkContents,
  archiveContent,
  unarchiveContent,
  searchContents,
  search,
};

export async function reordercontents(viewId: number, sourceContentId: number, targetContentId: number): Promise<FlexlistsError | FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess>(`/api/listContent/reorderContents`, { viewId, sourceContentId, targetContentId })

  return response.data;
};
export async function createContent(viewId: number, content: any): Promise<FlexlistsError | FlexlistsSuccess<CreateContentOutputDto>> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess<CreateContentOutputDto>>(`/api/listContent/createContent`, { viewId, content })

  return response.data;
};
export async function cloneContent(viewId: number, content: any): Promise<FlexlistsError | FlexlistsSuccess<CloneContentOutputDto>> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess<CloneContentOutputDto>>(`/api/listContent/cloneContent`, { viewId, content })

  return response.data;
};
export async function updateContent(viewId: number, content: any): Promise<FlexlistsError | FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess>(`/api/listContent/updateContent`, { viewId, content })

  return response.data;
};
export async function updateContents(viewId: number, contents: any[], parentViewId?: number, parentFieldId?: number, parentContentId?: number): Promise<FlexlistsError | FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess>(`/api/listContent/updateContents`, { viewId, contents, parentViewId, parentFieldId, parentContentId })

  return response.data;
};
export async function deleteBulkContents(viewId: number, contentIds: number[]): Promise<FlexlistsError | FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess>(`/api/listContent/deleteBulkContents`, { viewId, contentIds })

  return response.data;
};
export async function deleteContent(viewId: number, contentId: number): Promise<FlexlistsError | FlexlistsSuccess> {
  var response = await axios.delete<FlexlistsError | FlexlistsSuccess>(`/api/listContent/deleteContent` + `?viewId=${viewId}&contentId=${contentId}`);

  return response.data;
};
export async function archiveBulkContents(viewId: number, contentIds: number[]): Promise<FlexlistsError | FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess>(`/api/listContent/archiveBulkContents`, { viewId, contentIds })

  return response.data;
};
export async function unarchiveBulkContents(viewId: number, contentIds: number[]): Promise<FlexlistsError | FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess>(`/api/listContent/unarchiveBulkContents`, { viewId, contentIds })

  return response.data;
};
export async function archiveContent(viewId: number, contentId: number): Promise<FlexlistsError | FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess>(`/api/listContent/archiveContent`, { viewId, contentId })

  return response.data;
};
export async function unarchiveContent(viewId: number, contentId: number): Promise<FlexlistsError | FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess>(`/api/listContent/unarchiveContent`, { viewId, contentId })

  return response.data;
};
export async function getContent(viewId:number,contentId:number): Promise<FlexlistsError|FlexlistsSuccess> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess>('/api/listContent/getContent'+`?viewId=${viewId}&contentId=${contentId}`)
  return response.data;
};
export async function searchContents(viewId: number, page?: number, limit?: number, order?: Sort[], query?: any, conditions?: any, includeCount?: boolean, parentViewId?: number, parentFieldId?: number, parentContentId?: number): Promise<FlexlistsError | FlexlistsSuccess<SearchContentsOutputDto>> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess<SearchContentsOutputDto>>(`/api/listContent/searchContents`, { viewId, page, limit, order, query, conditions, includeCount, parentViewId, parentFieldId, parentContentId })

  return response.data;
};
export async function search(type: SearchType, viewId?: number, page?: number, limit?: number, order?: Sort[], query?: Query, conditions?: any): Promise<FlexlistsError | FlexlistsSuccess<SearchOutputDto>> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess<SearchOutputDto>>(`/api/listContent/search`, { type, viewId, page, limit, order, query, conditions })

  return response.data;
};
