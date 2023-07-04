import { useState, ChangeEvent, useEffect } from 'react';
import {  Box, Button, Card, Grid, List, ListItem, ListItemButton, ListItemText, Stack, TextField, Typography } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import ContentMangementForm from 'src/sections/admin/ContentMangementForm';
import { connect } from 'react-redux';
import { AuthValidate } from 'src/models/AuthValidate';
import CommonMoreMenu from 'src/components/menu/CommonMoreMenu';
import { ContentManagementDto } from 'src/models/ContentManagementDto';
import { contentManagementService } from 'src/services/admin/contentManagement.service';
import { isSucc } from 'src/models/ApiResponse';
import { useRouter } from 'next/router';
import { filter } from 'lodash';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TranslationKeyForm from 'src/sections/admin/TranslationKeyForm';
import { TranslationKeyDto } from 'src/models/TranslationKeyDto';
import { TranslationKeyType } from 'src/enums/SharedEnums';

type ContentBuilderProps = {
  authValidate: AuthValidate;
};
const ContentBuilder = ({authValidate}:ContentBuilderProps) => {
  const router = useRouter()
  const [searchText,setSearchText] = useState<string>('')
  const [contentManagements, setContentManagements] = useState<ContentManagementDto[]>([])
  const [filteredContentManagements, setFilteredContentManagements] = useState<ContentManagementDto[]>(contentManagements);
  const newContentManagement : ContentManagementDto = {id:0,name:'',ownerId:0}
  const [selectedContentManagement, setSelectedContentManagement] = useState<ContentManagementDto>(newContentManagement)
  const [isContentMangementFormOpen, setIsContentMangementFormOpen] = useState<boolean>(false)
  
  //translation key form
  const [translationKeys,setTranslationKeys] = useState<TranslationKeyDto[]>([])
  const [isTranslationKeyFormOpen, setIsTranslationKeyFormOpen] = useState<boolean>(false)
  const newTranslationKey : TranslationKeyDto = {id:0,name:'',type:TranslationKeyType.Text,contentManagementId:0}
  const [selectedTranslationKey, setSelectedTranslationKey] = useState<TranslationKeyDto>(newTranslationKey)
  

  useEffect(() => {
    async function fetchData() {
      let response = await contentManagementService.getAllContentManagement()
      if(isSucc(response))
      {
        setContentManagements(response.data as ContentManagementDto[])
        setFilteredContentManagements(response.data as ContentManagementDto[])
        setSelectedContentManagement(response.data.length > 0 ? response.data[0] : newContentManagement)
        if(response.data.length>0)
        {
          let translationKeysResponse = await contentManagementService.getTranslationKeysOfContentManagement(response.data[0].id)
          if(isSucc(translationKeysResponse))
          {
            setTranslationKeys(translationKeysResponse.data as TranslationKeyDto[])
          }
        }
      }
    }
    if(router.isReady)
    {
      fetchData()
    }
  },[router.isReady])
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
  const refreshSearch = (newContentManagements:ContentManagementDto[]) => { 
    setSearchText('')
    setFilteredContentManagements(newContentManagements)
  }
  const handleAddContentManagement = () => {
    let contentMangement = Object.assign({},newContentManagement)
    if(authValidate.user)
    {
      contentMangement.ownerId = authValidate.user.userId
    }
    setSelectedContentManagement(contentMangement)
    setIsContentMangementFormOpen(true)
  }
  const handleSelectContentMangement = async(contentManagement:ContentManagementDto) => {
    setSelectedContentManagement(contentManagement);
    let translationKeysResponse = await contentManagementService.getTranslationKeysOfContentManagement(contentManagement.id)
    if(isSucc(translationKeysResponse))
    {
      setTranslationKeys(translationKeysResponse.data as TranslationKeyDto[])
    }
  }
  const handleRenameContentManagement = () => {
    setIsContentMangementFormOpen(true)
  }
  const handleDeleteContentManagement = async() => {
    if(selectedContentManagement.id)
    {
      let response = await contentManagementService.deleteContentManagement(selectedContentManagement.id)
      if(isSucc(response))
      {
        let newContentManagements = contentManagements.filter((contentManagement)=>contentManagement.id !== selectedContentManagement.id)
        setContentManagements(newContentManagements)
        refreshSearch(newContentManagements)
        setSelectedContentManagement(newContentManagements.length > 0 ? newContentManagements[0] : newContentManagement)
      }
    }
  }
  const onAddContentManagement = (contentManagement:ContentManagementDto) => {
    let newContentManagements = [...contentManagements]
    newContentManagements.push(contentManagement)
    setContentManagements(newContentManagements)
    refreshSearch(newContentManagements)
    setSelectedContentManagement(contentManagement)
  }
  const onUpdateContentManagement = (contentManagement:ContentManagementDto) => {
    let newContentManagements = [...contentManagements]
    let index = newContentManagements.findIndex((contentManagement)=>contentManagement.id === selectedContentManagement.id)
    if(index >= 0)
    {
      newContentManagements[index] = contentManagement
      setContentManagements(newContentManagements)
      refreshSearch(newContentManagements)
      setSelectedContentManagement(contentManagement)
    }
  }
  //translation key
  const handleAddTranslationKey = () => {
    let translationKey = Object.assign({},newTranslationKey)
    translationKey.contentManagementId = selectedContentManagement.id
    setSelectedTranslationKey(translationKey)
    setIsTranslationKeyFormOpen(true)
  }
  const handleUpdateTranslationKey = (translationKey:TranslationKeyDto) => {
    setSelectedTranslationKey(translationKey)
    setIsTranslationKeyFormOpen(true)
  }
  const onUpdateTranslationKey = (translationKey:TranslationKeyDto) => {
    let newTranslationKeys = [...translationKeys]
    let index = newTranslationKeys.findIndex((translationKey)=>translationKey.id === selectedTranslationKey.id)
    if(index >= 0)
    {
      newTranslationKeys[index] = translationKey
      setTranslationKeys(newTranslationKeys)
    }
  }
  const onAddTranslationKey = (translationKey:TranslationKeyDto) => {
    let newTranslationKeys = [...translationKeys]
    newTranslationKeys.push(translationKey)
    setTranslationKeys(newTranslationKeys)
  }
  const handleDeleteTranslationKey = async(translationKeyId:number) => {
    let response = await contentManagementService.deleteTranslationKeyFromContentManagement(selectedContentManagement.id,translationKeyId)
    if(isSucc(response))
    {
      let newTranslationKeys = translationKeys.filter((translationKey)=>translationKey.id !== translationKeyId)
      setTranslationKeys(newTranslationKeys)
    }
  }
  return (
    <>
       {/* <Container> */}
       <Grid container spacing={2}>
          <Grid item xs={3}>
             <Card sx={{ p: 3 , minHeight: '80vh'}}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={5}>
                      <Stack direction={{ xs: 'column', md: 'row' }} spacing={5}>
                              <Typography variant="body2" component="span" sx={{marginLeft:'15px'}} >
                                  <TextField key={'search bar'} placeholder='Search..' value={searchText} onChange = {onSearchTextChange}  />
                                  <Button type='button' variant="contained" sx={{marginLeft:'5px'}} onClick={()=>{handleAddContentManagement()}}>Add New</Button>
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
                                        {(selectedContentManagement && selectedContentManagement.id == contentManagement.id) &&<CommonMoreMenu editPermissionEnable = {false} deletePermissionEnable = {true} onDelete={() => handleDeleteContentManagement()} onEdit = {()=>{}} onOtherFunctions = {[{name:"Rename",function:()=> handleRenameContentManagement()}]} />}
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
                {
                  translationKeys && translationKeys.length > 0 && translationKeys.map((translationKey,index)=>{
                    return (
                      <Stack direction={{ xs: 'column', md: 'row' }} spacing={5} key={index}>
                                 <Box
                                    component={"span"}                
                                  >
                                    {translationKey.name}
                                  </Box>
                                 <Box
                         
                                    onClick={() => handleUpdateTranslationKey(translationKey)}
                                  >
                                    <EditIcon />
                                    <Typography
                                      variant="subtitle2"
                                      component={"span"}

                                    >
                                      Edit
                                    </Typography>
                                  </Box>
                                  <Box
                                    onClick={() => handleDeleteTranslationKey(translationKey.id)}
                                   >
                                    <DeleteIcon />
                                    <Typography
                                      variant="subtitle2"
                                      component={"span"}
                                    >
                                      Delete
                                    </Typography>
                                  </Box>
                          </Stack>
                        )
                    })
                }
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={5}>
                 {selectedContentManagement && selectedContentManagement.id>0 && 
                 <Button type='button' variant="contained" sx={{marginLeft:'5px'}} onClick={()=>{handleAddTranslationKey()}}>Add Key</Button>
                 } 
                </Stack>
             </Card>
          </Grid>
       </Grid>
       <ContentMangementForm 
        currentContentManagement={selectedContentManagement}
        open = {isContentMangementFormOpen}
        handleClose = {()=>setIsContentMangementFormOpen(false)}
        onAdd = {onAddContentManagement}
        onUpdate = {onUpdateContentManagement}
       />
       {
         isTranslationKeyFormOpen && 
         <TranslationKeyForm
        currentTranslationKey={selectedTranslationKey}
        open = {isTranslationKeyFormOpen}
        handleClose = {()=>setIsTranslationKeyFormOpen(false)}
        onAdd = {onAddTranslationKey}
        onUpdate = {onUpdateTranslationKey}
        contentTranslationKeys={translationKeys}
        />
       }
        
    {/* </Container> */}
    </>
  );
};
const mapStateToProps = (state: any) => ({
    authValidate:state.admin.authValidate
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentBuilder);
