import { useState, ChangeEvent, useEffect } from 'react';
import { Button, Box, Card, Grid, List, ListItem, ListItemButton, ListItemText, Stack, TextField, Typography, MenuItem, ListItemIcon } from '@mui/material';
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

type ContentEditorProps = {
  authValidate: AuthValidate;
};
const ContentEditor = ({authValidate}:ContentEditorProps) => {
  const router = useRouter()
  const [searchText,setSearchText] = useState<string>('')
  const [contentManagements, setContentManagements] = useState<ContentManagementDto[]>([])
  const [filteredContentManagements, setFilteredContentManagements] = useState<ContentManagementDto[]>(contentManagements);
  const [selectedContentManagement, setSelectedContentManagement] = useState<ContentManagementDto>()
  const [translationTexts, setTranslationTexts] = useState<TranslationText[]>([])
  const [availableLanguages,setAvailableLanguages] = useState<Language[]>(languages)
  const [selectedLanguage,setSelectedLanguage] = useState<Language>(languages[0])
  useEffect(() => {
    async function fetchContentManagements() {
      let response = await contentManagementService.getAllContentManagement()
      if(isSucc(response))
      {
        setContentManagements(response.data as ContentManagementDto[])
        
      }
    }
    if(router.isReady)
    {
      fetchContentManagements()
    }
  },[router.isReady])
  const onSearchTextChange = (e:ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
    searchContentManagement(e.target.value)
  }
  const searchContentManagement = (search: string) => {
    var newContentManagements = filter(contentManagements, (column) => {
      return (search && column.name.includes(search)) || search === "";
    });
    setFilteredContentManagements(newContentManagements);
  };
  const handleSelectContentMangement = async(contentManagement:ContentManagementDto) => {
    setSelectedContentManagement(contentManagement);
    let response = await contentManagementService.getContentManagementTranslationTexts(contentManagement.id,selectedLanguage.id)
    if(isSucc(response))
    {
      setTranslationTexts(response.data as TranslationText[])
    }
  }
  const onLanguageChange = async(id:string) => {
    if(!selectedContentManagement)
    {
      return
    }
    let language = availableLanguages.find(x=>x.id === id)
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
    let newTranslationTexts = translationTexts.map(x=>{
      if(x.id === translationText.id)
      {
        x.translation = e.target.value
      }
      return x
    }
    )
    setTranslationTexts(newTranslationTexts)
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
                                    <ListItem disablePadding key={index}>
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
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={5}>
                  <Grid container>
                    <Grid item xs={3}>
                    {availableLanguages.map((option) => (
                          <MenuItem
                            key={option.id}
                            selected={option.id === availableLanguages[0].id}
                            onClick={() => onLanguageChange(option.id)}
                            sx={{ py: 1, px: 2.5 }}
                          >
                            <ListItemIcon>
                              <Box component='img' alt={option.name} src={option.icon} />
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                              {option.name}
                            </ListItemText>
                          </MenuItem>
                        ))}
                      
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={3}>
                      <Button variant="contained" color="primary" sx={{float:'right'}}>
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={5}>
                  {
                    translationTexts.map((translationText,index)=>{
                      return (
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={5} key={index}>
                          <TextField key={index} label={translationText.translationKey} value={translationText.translation} onChange={(e)=>{onTranslationTextChange(e,translationText)}} />
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
