import { useState, ChangeEvent, useEffect } from 'react';
import { Button, Box, Card, Grid, List, ListItem, ListItemButton, ListItemText, Stack, TextField, Typography, MenuItem, ListItemIcon, Autocomplete, Alert } from '@mui/material';
import MainLayout from 'src/layouts/amin/MainLayout';
import Scrollbar from 'src/components/scrollbar';
import { connect } from 'react-redux';
import { AuthValidate } from 'src/models/AuthValidate';
import { ContentManagementDto } from 'src/models/ContentManagementDto';
import { contentManagementService } from 'src/services/admin/contentManagement.service';
import { FlexlistsError, isSucc } from 'src/models/ApiResponse';
import { useRouter } from 'next/router';
import { filter } from 'lodash';
import { TranslationText } from 'src/models/SharedModels';
import { Language } from 'src/models/Language';
import { languages } from 'src/utils/i18n';
import { translationTextService } from 'src/services/admin/translationText.service';
import { TranslationKeyType } from 'src/enums/SharedEnums';
import WysiwygEditor from 'src/components/wysiwyg-editor/wysiwyg';
import TurndownService from 'turndown';
import {marked} from 'marked';
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
  const [error,setError] = useState<string>('')
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
    setError('')
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
    setError('')
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
  const onTranslateHtmlChange = (newValue: string,translationText:TranslationText) => {
    setSuccessMessage('')
    setError('')
    let newTranslationTexts = translationTexts.map(x=>{
      if(x.translationKeyId === translationText.translationKeyId)
      {
        x.translation = newValue
      }
      return x
    }
    )
    setTranslationTexts(newTranslationTexts)
  };
  const onTranslateMarkdownChange = (newValue: string,translationText:TranslationText) => {
    setSuccessMessage('')
    setError('')
    let newTranslationTexts = translationTexts.map(x=>{
      if(x.translationKeyId === translationText.translationKeyId)
      {
       
        x.translation = newValue
      }
      return x
    }
    )
    setTranslationTexts(newTranslationTexts)
  };
  const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>,translationText:TranslationText) => {
    setSuccessMessage('')
    setError('')
    if (event.target.files && event.target.files.length > 0) {
      await uploadFile(event.target.files[0],translationText);
    }
  };

  const uploadFile = async(file: File,translationText:TranslationText) => {
    const formData = new FormData();
    formData.append('file', file);
    let response = await contentManagementService.uploadFile(formData)
    if(response && response.fileId)
    {
      let newTranslationTexts = translationTexts.map(x=>{
        if(x.translationKeyId === translationText.translationKeyId)
        {
          x.translation = response.fileId
        }
        return x
      }
      )
      setTranslationTexts(newTranslationTexts)
    }
  };


  const onSubmit = async() => {
    const turndownService = new TurndownService();
    let newTranslationTexts = translationTexts.map(x=>{
      if(x.translationKeyType === TranslationKeyType.Markdown)
      {
        x.translation = turndownService.turndown(x.translation)
      }
      if(x.translationKeyType === TranslationKeyType.Image)
      {
        x.translation = x.translation.toString()
      }
      return x
      }
    )
    let response = await translationTextService.saveManyTranslationTexts(newTranslationTexts)
    if(isSucc(response))
    {
      setSuccessMessage("Saved successfully")
    }
    else
    {
      setError((response as FlexlistsError).message)
    }

  }
  const downloadFileUrl = (id:string) =>
  {
    return `${process.env.NEXT_PUBLIC_FLEXLIST_API_URL}/api/contentManagement/downloadFile?id=${id}`
  }
  const convertMarkdownToHtml = (markdown: string): string => {
    return marked(markdown);
  };
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
                    <Box>
                      { error && <Alert severity="error">{error}</Alert>}
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
                        <Stack key={index}>
                        {
                          translationText.translationKeyType === TranslationKeyType.Text &&
                          <Stack key={index} direction={{ xs: 'column', md: 'row' }} spacing={5}  style={{marginTop:10}}>
                            <TextField fullWidth key={`input - ${index}`} label={translationText.translationKey} value={translationText.translation} onChange={(e)=>{onTranslationTextChange(e,translationText)}} />
                          </Stack>
                        }
                        {
                          translationText.translationKeyType === TranslationKeyType.Image &&
                          <Stack key={index} direction={{ xs: 'column', md: 'row' }} spacing={5} style={{marginTop:10}}>
                            <Box
                                  component="img"
                                  sx={{
                                    height: 233,
                                    width: 350,
                                    maxHeight: { xs: 233, md: 167 },
                                    maxWidth: { xs: 350, md: 250 },
                                  }}
                                  alt="no image"
                                  src={translationText.translation?downloadFileUrl(translationText.translation):''}
                                />
                                <Box>
                                <input type="file" name='upload' onChange={(e)=>handleFileChange(e,translationText)} />
                                </Box>
                           </Stack>
                        }
                        {
                          translationText.translationKeyType === TranslationKeyType.Html &&
                          <Box>
                            <Typography variant="subtitle2" gutterBottom>
                              {translationText.translationKey}
                            </Typography>
                            <WysiwygEditor
                              value={translationText.translation}
                              setValue={(newValue) => onTranslateHtmlChange(newValue,translationText)}
                            />
                           </Box>
                        }
                        {
                          translationText.translationKeyType === TranslationKeyType.Markdown &&
                          <Box>
                            <Typography variant="subtitle2" gutterBottom>
                              {translationText.translationKey}
                            </Typography>
                            <WysiwygEditor
                              value={convertMarkdownToHtml(translationText.translation)}
                              setValue={(newValue) => onTranslateMarkdownChange(newValue,translationText)}
                            />
                           </Box>
                        }
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
