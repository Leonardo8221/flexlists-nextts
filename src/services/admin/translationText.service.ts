import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponse";
import axios from "src/utils/axios";
import { SaveManyTranslationTextsOutputDto } from 'src/models/ApiOutputModels'
import { GetTranslationTextsOutputDto } from 'src/models/ApiOutputModels'

export const translationTextService = {
    saveManyTranslationTexts,
    getTranslationTexts,
};

async function saveManyTranslationTexts(translationTexts:{id:string,translationKeyId:number,i18n:string,translation:string,ownerId:number}): Promise<FlexlistsError|FlexlistsSuccess<SaveManyTranslationTextsOutputDto[]>> {
  var response = await axios.post<FlexlistsError|FlexlistsSuccess<SaveManyTranslationTextsOutputDto[]>>(`/api/translationText/saveManyTranslationTexts`, {translationTexts})

  return response.data;
};
async function getTranslationTexts(i18n:string): Promise<FlexlistsError|FlexlistsSuccess<GetTranslationTextsOutputDto[]>> {
  var response = await axios.get<FlexlistsError|FlexlistsSuccess<GetTranslationTextsOutputDto[]>>('/api/translationText/getTranslationTexts'+`?i18n=${i18n}`)
  return response.data;
};
