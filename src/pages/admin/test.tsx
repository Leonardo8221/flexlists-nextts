import { TranslationText } from "src/models/SharedModels";
import ReactMarkdown from "react-markdown";
import { Box } from "@mui/material";
import { getTranslations, t } from "src/utils/i18n";
import { GetServerSideProps } from "next";

type ContentTestProps = {
    };
const  ContentTest = ({ translation  }:ContentTestProps&{translation:TranslationText[]})=>{
   
    const i18n = (key:string):string=>{
       return t(key,translation)
        
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
// This gets called on every request
export const getServerSideProps:GetServerSideProps = async (context) => {
    
      return await getTranslations("landing page",context)
  }
export default ContentTest;