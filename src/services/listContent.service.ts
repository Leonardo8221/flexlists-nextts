import { FlexlistsError, FlexlistsSuccess } from "src/models/ApiResponse";
import axios from "src/utils/axios";
import { CreateContentOutputDto } from 'src/models/ApiOutputModels'
import { GetContentsOutputDto } from 'src/models/ApiOutputModels'
import { Sort } from 'src/models/SharedModels'
import { ExportType } from 'src/enums/SharedEnums'
import { Query } from 'src/models/SharedModels'
import { GetContentOutputDto } from 'src/models/ApiOutputModels'
import { SearchContentsOutputDto } from 'src/models/ApiOutputModels'
import { SearchOutputDto } from 'src/models/ApiOutputModels'
import { SearchType } from 'src/enums/SharedEnums'

export const listContentService = {
  createContent,
  updateContent,
  deleteContent,
  getContents,
  importContent,
  exportContent,
  getContent,
  archiveContent,
  unarchiveContent,
  searchContents,
  search,
};

export async function createContent(listId: number, content: any): Promise<FlexlistsError | FlexlistsSuccess<CreateContentOutputDto>> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess<CreateContentOutputDto>>(`/api/listContent/createContent`, { listId, content })

  return response.data;
};
export async function updateContent(viewId: number, content: any): Promise<FlexlistsError | FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess>(`/api/listContent/updateContent`, { viewId, content })

  return response.data;
};
export async function deleteContent(listId: number, contentId: number): Promise<FlexlistsError | FlexlistsSuccess> {
  var response = await axios.get<FlexlistsError | FlexlistsSuccess>('/api/listContent/deleteContent' + `?listId=${listId}&contentId=${contentId}`)
  return response.data;
};
export async function getContents(listId: number, page?: number, limit?: number, order?: Sort[]): Promise<FlexlistsError | FlexlistsSuccess<GetContentsOutputDto>> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess<GetContentsOutputDto>>(`/api/listContent/getContents`, { listId, page, limit, order })

  return response.data;
};
export async function importContent(): Promise<FlexlistsError | FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess>(`/api/listContent/importContent`,)

  return response.data;
};
export async function exportContent(listId: number, type: ExportType, includeHeader?: boolean, delimiter?: string, page?: number, limit?: number, allPages?: boolean, includeSubs?: boolean, order?: Sort[], query?: Query): Promise<FlexlistsError | FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess>(`/api/listContent/exportContent`, { listId, type, includeHeader, delimiter, page, limit, allPages, includeSubs, order, query })

  return response.data;
};
export async function getContent(listId: number, contentId: number): Promise<FlexlistsError | FlexlistsSuccess<GetContentOutputDto>> {
  var response = await axios.get<FlexlistsError | FlexlistsSuccess<GetContentOutputDto>>('/api/listContent/getContent' + `?listId=${listId}&contentId=${contentId}`)
  return response.data;
};
export async function archiveContent(listId: number, contentId: number): Promise<FlexlistsError | FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess>(`/api/listContent/archiveContent`, { listId, contentId })

  return response.data;
};
export async function unarchiveContent(listId: number, contentId: number): Promise<FlexlistsError | FlexlistsSuccess> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess>(`/api/listContent/unarchiveContent`, { listId, contentId })

  return response.data;
};
export async function searchContents(viewId: number, page?: number, limit?: number, order?: Sort[], query?: string, conditions?: any, includeCount?: boolean): Promise<FlexlistsError | FlexlistsSuccess<SearchContentsOutputDto>> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess<SearchContentsOutputDto>>(`/api/listContent/searchContents`, { viewId, page, limit, order, query, conditions, includeCount })

  return response.data;
};
export async function search(type: SearchType, viewId?: number, page?: number, limit?: number, order?: Sort[], query?: Query, conditions?: any): Promise<FlexlistsError | FlexlistsSuccess<SearchOutputDto>> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess<SearchOutputDto>>(`/api/listContent/search`, { type, viewId, page, limit, order, query, conditions })

  return response.data;
};
