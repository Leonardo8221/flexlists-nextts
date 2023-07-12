import { TranslationText } from "src/models/SharedModels";
import ReactMarkdown from "react-markdown";
import { Box } from "@mui/material";
import { getTranslations, getTranslation } from "src/utils/i18n";
import { GetServerSideProps } from "next";
import LanguagePopover from "src/layouts/LanguagePopover";
import WysiwygView from "src/components/wysiwyg/wysiwygView";

type ContentTestProps = {
    };
const  ContentTest = ({ translations  }:ContentTestProps&{translations:TranslationText[]})=>{
   
    const t = (key:string):string=>{
       return getTranslation(key,translations)
        
    }
    return (
        <>
        <div>
            <LanguagePopover/>
        </div>
        <div>
            <h1>{t('Welcome')}</h1>
            <WysiwygView
              value={t('Description')}
            />
            {/* <div dangerouslySetInnerHTML={{ __html: t('Description') }} /> */}
            <ReactMarkdown>{t('DescriptionMarkdown')}</ReactMarkdown>
            <Box
                component="img"
                sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
                }}
                alt="no image"
                src={t('ImageUrl')}
            />
        </div>
        </>
        
    )
}
// This gets called on every request
export const getServerSideProps:GetServerSideProps = async (context) => {
    
      return await getTranslations("landing page",context)
  }
export default ContentTest;