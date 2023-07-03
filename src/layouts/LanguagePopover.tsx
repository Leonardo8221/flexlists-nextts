import { useEffect, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover, ListItemIcon, ListItemText } from '@mui/material';
import {getLanguage, storeLanguage} from 'src/utils/localStorage';
import { Language } from 'src/models/Language';
import { use } from 'passport';
import { el } from 'date-fns/locale';
import Cookies from 'js-cookie';
import { LocalStorageConst } from 'src/constants/StorageConsts';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { getLanguages } from 'src/redux/actions/adminAction';
// ----------------------------------------------------------------------
type LanguagePopoverProps = {
  languages: Language[];
  getLanguages: () => void;
};
export const LanguagePopover = ({languages,getLanguages }: LanguagePopoverProps) =>{
  const router = useRouter();
  const [open, setOpen] = useState(null);
  const [currentLanguage,setCurrentLanguage] = useState<Language>();
  
  useEffect(() => {
    getLanguages();
  }, []);
  useEffect(() => {
      if(languages && languages.length>0)
      {
        var languageId = getLanguage();
        let language : Language|undefined;
        if (languageId && languageId != null) {
          language = languages.find((x) => x.id === languageId);
        }
        if(language)
        {
          setCurrentLanguage(language);
          Cookies.set(LocalStorageConst.Language, language.id);
        }
        else
        {
          setCurrentLanguage(languages[0]);
          storeLanguage(languages[0].id);
          Cookies.set(LocalStorageConst.Language, languages[0].id);
        }
      }
  }, [languages]);

  const handleOpen = (event:any) => {
    setOpen(event.currentTarget);
  };

  const handleLanguageChange = (languageId:string) => {
    var language = languages.find((x) => x.id === languageId);
    if (language) {
      setCurrentLanguage(language);
      storeLanguage(languageId);
      Cookies.set(LocalStorageConst.Language, languageId);
      router.replace(router.asPath);
      setOpen(null);
    }
    
  };
  var style = (open && {
    bgcolor: (theme:any) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
  });
  return (
    <>
    {
       currentLanguage && currentLanguage !=null &&
       <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          style,
        }}
      >
        <img src={currentLanguage.icon} alt={currentLanguage.name} />
      </IconButton>
    }
      

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleLanguageChange}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {languages.map((language) => (
            <MenuItem key={language.id} selected={language.id === languages[0].id} onClick={() => handleLanguageChange(language.id)}>
              <Box component="img" alt={language.name} src={language.icon} sx={{ width: 28, mr: 2 }} />

              {language.name}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
const mapStateToProps = (state: any) => ({
  languages: state.admin.languages
});

const mapDispatchToProps = {
  getLanguages
};
export default connect(mapStateToProps, mapDispatchToProps)(LanguagePopover);