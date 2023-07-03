import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponse";
import { Language } from "src/models/Language";
import { FieldUIType, SearchTypeModel } from "src/models/SharedModels";
import axios from "src/utils/axios";

export const adminService = {
    getAvailableFieldUiTypes,
    getSearchTypes,
    getLanguages
};

async function getAvailableFieldUiTypes(): Promise<FlexlistsError|FlexlistsSuccess<FieldUIType[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<FieldUIType[]>>('/api/admin/getAvailableFieldUiTypes')
  return response.data;
};
async function getSearchTypes(): Promise<FlexlistsError|FlexlistsSuccess<SearchTypeModel[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<SearchTypeModel[]>>('/api/admin/getSearchTypes')
  return response.data;
};
async function getLanguages(): Promise<FlexlistsError|FlexlistsSuccess<Language[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<Language[]>>('/api/admin/getLanguages')
  return response.data;
};
