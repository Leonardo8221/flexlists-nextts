import { FlexlistsError, FlexlistsSuccess } from "src/models/ApiResponse";
import axios from "src/utils/axios";
import { SaveManyTranslationTextsOutputDto } from 'src/models/ApiOutputModels'
import { GetTranslationTextsOutputDto } from 'src/models/ApiOutputModels'
import { TranslationText } from "src/models/SharedModels";

export const translationTextService = {
  saveManyTranslationTexts,
  getTranslationTexts,
};

async function saveManyTranslationTexts(translationTexts: TranslationText[]): Promise<FlexlistsError | FlexlistsSuccess<SaveManyTranslationTextsOutputDto[]>> {
  var response = await axios.post<FlexlistsError | FlexlistsSuccess<SaveManyTranslationTextsOutputDto[]>>(`/api/translationText/saveManyTranslationTexts`, { translationTexts })

  return response.data;
};
async function getTranslationTexts(i18n: string, contentManagementName?: string): Promise<FlexlistsError | FlexlistsSuccess<GetTranslationTextsOutputDto[]>> {
  const url = '/api/translationText/getTranslationTexts' + `?i18n=${i18n}&contentManagementName=${contentManagementName}`
  var response = await axios.get<FlexlistsError | FlexlistsSuccess<GetTranslationTextsOutputDto[]>>(url)
  return response.data;
};
