import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponse";
import { FieldUIType } from "src/models/SharedModels";
import axios from "src/utils/axios";

export const adminService = {
    getAvailableFieldUiTypes,
};

async function getAvailableFieldUiTypes(): Promise<FlexlistsError|FlexlistsSuccess<FieldUIType[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<FieldUIType[]>>('/api/admin/getAvailableFieldUiTypes')
  return response.data;
};

