import { useState, ChangeEvent, useEffect } from 'react';
import { Button, Box, Card, Grid, List, ListItem, ListItemButton, ListItemText, Stack, TextField, Typography, MenuItem, ListItemIcon, Autocomplete, Alert } from '@mui/material';
import MainLayout from 'src/layouts/amin/MainLayout';
import Scrollbar from 'src/components/scrollbar';
import { connect } from 'react-redux';
import { AuthValidate } from 'src/models/AuthValidate';
import { ContentManagementDto } from 'src/models/ContentManagementDto';
import { contentManagementService } from 'src/services/admin/contentManagement.service';
import { isSucc } from 'src/models/ApiResponse';
import { useRouter } from 'next/router';
import { filter } from 'lodash';
import { TranslationText } from 'src/models/SharedModels';
import { Language } from 'src/models/Language';
import { languages } from 'src/utils/i18n';
import { translationTextService } from 'src/services/admin/translationText.service';

type ContentEditorProps = {
  authValidate: AuthValidate;
};
const ContentEditor = ({authValidate}:ContentEditorProps) => {
  const router = useRouter()
  const [searchText,setSearchText] = useState<string>('')
  const [contentManagements, setContentManagements] = useState<ContentManagementDto[]>([])
  const [filteredContentManagements, setFilteredContentManagements] = useState<ContentManagementDto[]>([]);
  const [selectedContentManagement, setSelectedContentManagement] = useState<ContentManagementDto>()
  const [translationTexts, setTranslationTexts] = useState<TranslationText[]>([])
  const [availableLanguages,setAvailableLanguages] = useState<Language[]>(languages)
  const [selectedLanguage,setSelectedLanguage] = useState<Language>(languages[0])
  const [successMessage,setSuccessMessage] = useState<string>('')
  useEffect(() => {
    async function fetchContentManagements() {
      let response = await contentManagementService.getAllContentManagement()
      if(isSucc(response))
      {
        setContentManagements(response.data as ContentManagementDto[])
        setFilteredContentManagements(response.data as ContentManagementDto[])
        await loadTranslationTexts(response.data[0].id,languages[0].id)
      }
    }
    if(router.isReady)
    {
      fetchContentManagements()
    }
  },[router.isReady])
  const loadTranslationTexts = async(contentManagementId:number,languageId:string) => {
    let response = await contentManagementService.getContentManagementTranslationTexts(contentManagementId,languageId)
    if(isSucc(response))
    {
      setTranslationTexts(response.data as TranslationText[])
    }
  }
  const onSearchTextChange = (e:ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
    searchContentManagement(e.target.value)
  }
  const searchContentManagement = (search: string) => {
    var newContentManagements = filter(contentManagements, (contentManagement) => {
      return (search && contentManagement.name.toLowerCase().includes(search.toLowerCase())) || search === "";
    });
    setFilteredContentManagements(newContentManagements);
  };
  const handleSelectContentMangement = async(contentManagement:ContentManagementDto) => {
    setSelectedContentManagement(contentManagement);
    loadTranslationTexts(contentManagement.id,selectedLanguage.id)
  }
  const onLanguageChange = async(name:string) => {
    setSuccessMessage('')
    if(!selectedContentManagement)
    {
      return
    }
    let language = availableLanguages.find(x=>x.name === name)
    if(language)
    {
      setSelectedLanguage(language)
      let response = await contentManagementService.getContentManagementTranslationTexts(selectedContentManagement.id,language.id)
      if(isSucc(response))
      {
        setTranslationTexts(response.data as TranslationText[])
      }
    }
  }
  const onTranslationTextChange = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>,translationText:TranslationText) => {
    setSuccessMessage('')
    let newTranslationTexts = translationTexts.map(x=>{
      if(x.translationKeyId === translationText.translationKeyId)
      {
        x.translation = e.target.value
      }
      return x
    }
    )
    setTranslationTexts(newTranslationTexts)
  }
  const onSubmit = async() => {
    let response = await translationTextService.saveManyTranslationTexts(translationTexts)
    if(isSucc(response))
    {
      setSuccessMessage("Saved successfully")
    }
  }
  return (
    <MainLayout>
       {/* <Container> */}
       <Grid container spacing={2}>
          <Grid item xs={3}>
             <Card sx={{ p: 3 , minHeight: '80vh'}}>
                    
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={5}>
                      <Stack direction={{ xs: 'column', md: 'row' }} spacing={5}>
                              <Typography variant="body2" component="span" sx={{marginLeft:'15px'}} >
                                  <TextField key={'search bar'} placeholder='Search..' value={searchText} onChange = {onSearchTextChange}  />
                              </Typography>
                              
                          </Stack>
                          <Stack direction={{ xs: 'column', md: 'row' }} spacing={20} sx={{marginTop:'15px'}}>
                                
                              
                          </Stack>
                    </Stack>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={5}>
                       <Scrollbar
                        sx={{
                            height: '100%',
                            '& .simplebar-content': {
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            },
                        }}
                        >
                        
                        <Box>
                            <List>
                            {
                              filteredContentManagements.map((contentManagement,index)=>{
                                    return (
                                    <ListItem disablePadding key={index} style={{backgroundColor: selectedContentManagement && selectedContentManagement.id === contentManagement.id?'blue':''}}>
                                        <ListItemButton onClick={()=>handleSelectContentMangement(contentManagement)}>
                                            <ListItemText>{contentManagement.name}</ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                    )
                                })
                            }
                            </List>
                        </Box>
                        </Scrollbar>
                    </Stack>
             </Card>
              
          </Grid>
          <Grid item xs = {9}>
             <Card sx={{ p: 3 , minHeight: '80vh'}}>
                <Stack>
                    <Box>
                      { successMessage && <Alert severity="success">{successMessage}</Alert>}
                    </Box>
                 </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={5}>
                  <Grid container>
                    <Grid item xs={3}>
                    <Autocomplete
                      id="language-select"
                      sx={{ width: 300 }}
                      options={availableLanguages}
                      autoHighlight
                      getOptionLabel={(option) => option.name}
                      value={selectedLanguage}
                      onChange={(event, value) => {
                        if(value)
                        {
                          onLanguageChange(value.id)
                        }
                      }}
                      renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                          <img
                            loading="lazy"
                            width="20"
                            src={option.icon}
                            srcSet={`{option.icon} 2x`}
                            alt=""
                          />
                          {option.name}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose a Language"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                      
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={3}>
                      <Button variant="contained" color="primary" sx={{float:'right'}} onClick={()=>onSubmit()}>
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </Stack>
                <Stack>
                  {
                    translationTexts.map((translationText,index)=>{
                      return (
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={5} key={index} style={{marginTop:10}}>
                          <TextField fullWidth key={index} label={translationText.translationKey} value={translationText.translation} onChange={(e)=>{onTranslationTextChange(e,translationText)}} />
                        </Stack>
                      )
                    })
                  }
                  
                </Stack>
             </Card>
          </Grid>
       </Grid>
    {/* </Container> */}
    </MainLayout>
  );
};
const mapStateToProps = (state: any) => ({
    authValidate:state.admin.authValidate
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentEditor);
