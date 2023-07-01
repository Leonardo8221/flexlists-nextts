import { TranslationKeyType } from "src/enums/SharedEnums";
import { isSucc } from "src/models/ApiResponse";
import { TranslationText } from "src/models/SharedModels";
import { translationTextService } from "src/services/admin/translationText.service";
import ReactMarkdown from "react-markdown";
import { Box } from "@mui/material";

type ContentTestProps = {
    };
const  ContentTest = ({ data  }:ContentTestProps&{data:TranslationText[]})=>{
    const downloadFileUrl = (id:string) =>
    {
        return `${process.env.NEXT_PUBLIC_FLEXLIST_API_URL}/api/contentManagement/downloadFile?id=${id}`
    }
    const i18n = (key:string):string=>{
        var translationText = data.find((item:any)=>item.translationKey==key)
        let translation:string = ''
        if(translationText){
            switch(translationText.translationKeyType){
                case TranslationKeyType.Text:
                case TranslationKeyType.Html:
                case TranslationKeyType.Markdown:
                    translation = translationText.translation
                    break
                case TranslationKeyType.Image:
                    translation = downloadFileUrl(translationText.translation)
                    break
                default:
                    translation = translationText.translation
                    break;
        }
        }
        return translation
        
    }
    return (
        <div>
            <h1>{i18n('Welcome')}</h1>
            <div dangerouslySetInnerHTML={{ __html: i18n('Description') }} />
            <ReactMarkdown>{i18n('DescriptionMarkdown')}</ReactMarkdown>
            <Box
                component="img"
                sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
                }}
                alt="no image"
                src={i18n('ImageUrl')}
            />
        </div>
    )
}
// // This gets called on every request
export async function getServerSideProps() {
    // Fetch translation data
    const response = await translationTextService.getTranslationTexts('en-US')
    let data :any = {}
    if(isSucc(response)){
         data = response.data;
    }

    // Pass data to the page via props
    return { props: { data } }
  }
export default ContentTest;