import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponse";
import { FieldUIType, SearchTypeModel } from "src/models/SharedModels";
import axios from "src/utils/axios";

export const adminService = {
    getAvailableFieldUiTypes,
    getSearchTypes
};

async function getAvailableFieldUiTypes(): Promise<FlexlistsError|FlexlistsSuccess<FieldUIType[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<FieldUIType[]>>('/api/admin/getAvailableFieldUiTypes')
  return response.data;
};
async function getSearchTypes(): Promise<FlexlistsError|FlexlistsSuccess<SearchTypeModel[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<SearchTypeModel[]>>('/api/admin/getSearchTypes')
  return response.data;
};

