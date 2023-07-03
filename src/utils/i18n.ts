import { parse } from "cookie";
import { TranslationKeyType } from "src/enums/SharedEnums";
import { isSucc } from "src/models/ApiResponse";
import { Language } from "src/models/Language";
import { TranslationText } from "src/models/SharedModels";
import { translationTextService } from "src/services/admin/translationText.service";

export const getTranslation = (key:string,transaltions:TranslationText[])=>
{
  let translation:string = key
        if(!transaltions || transaltions.length==0){    
            return translation
        }
        var translationText = transaltions.find((item:any)=>item.translationKey==key)
        if(translationText){
            switch(translationText.translationKeyType){
                case TranslationKeyType.Text:
                case TranslationKeyType.Html:
                case TranslationKeyType.Markdown:
                    translation = translationText.translation
                    break
                case TranslationKeyType.Image:
                    translation = (translationText.translation?`${process.env.NEXT_PUBLIC_FLEXLIST_API_URL}/api/contentManagement/downloadFile?id=${translationText.translation}`:'')
                    break
                default:
                    translation = translationText.translation
                    break;
          }
        }
        return translation
}
export const getTranslations = async(pageName:string,context:any) : Promise<any> =>
{
    const { req } = context;
     const cookies = parse(req.headers.cookie || '');
    const language = cookies.language;
    let translations : any[] = []
    try
    {
        
        const response = await translationTextService.getTranslationTexts(language??'en-Us',pageName);
        if(isSucc(response) && response.data && response.data.length>0){
            translations = response.data;
        }
        // Pass data to the page via props
        return { props: { translations } }
    }
    catch(error)
    {
        console.log(error)
        return { props: { translations } }
    }
    return { props: { translations } }
}