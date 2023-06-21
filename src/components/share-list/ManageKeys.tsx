import React, { useState } from "react";
import {
  Grid,
  Button,
  FormLabel,
  Select,
  MenuItem,
  Typography,
  TextField,
  InputAdornment,
  SelectChangeEvent,
  Tooltip,
} from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import { GetKeysForViewOutputDto } from "src/models/ApiOutputModels";
import { Role } from "src/enums/SharedEnums";
import { listViewService } from "src/services/listView.service";
import { convertToInteger } from "src/utils/convertUtils";
import { useRouter } from "next/router";
import { isSucc } from "src/models/ApiResponse";
type ManageKeysProps = {
  viewKeys : GetKeysForViewOutputDto[]
  roles: { name: string; label: string }[];
  onUpdateViewKeys:(newViewKeys:GetKeysForViewOutputDto[])=>void
}
function ManageKeys({viewKeys,roles,onUpdateViewKeys}:ManageKeysProps) {
  const router = useRouter();
  const [viewKeyUpdateList,setViewKeyUpdateList] = useState<{keyId:number,isEditing:boolean}[]>([])
  const handleSelectRoleChange = async(event: SelectChangeEvent,index:number) => {
      var newViewKeys : GetKeysForViewOutputDto[] = Object.assign([],viewKeys)
      var currentViewKey = newViewKeys[index];
      currentViewKey.role = event.target.value as Role;
      onUpdateViewKeys(newViewKeys)
  };
  const handleViewNameChange = async(event: React.ChangeEvent<HTMLInputElement>,index:number) => {
    var newViewKeys : GetKeysForViewOutputDto[] = Object.assign([],viewKeys)
    var currentViewKey = newViewKeys[index];
    currentViewKey.name = event.target.value;
    onUpdateViewKeys(newViewKeys)
 };
 const getKeyLink = (key:string) :string =>
 {
    return `${process.env.NEXT_PUBLIC_FLEXLIST_CLIENT_URL}/key/${key}`
 }
// const handleTooltipClose = ()=>
//         {
//           isTooltipOpen = false
//         }
  const handleCopyKeyLink = (key:string) =>
  {
    navigator.clipboard.writeText(getKeyLink(key));
    // isTooltipOpen = true;
    // setTimeout(function () {
    //     handleTooltipClose();
    // }, 2000);
  }
  const isKeyEditing = (keyId:number) : boolean => {
     var existKeyEditing = viewKeyUpdateList.find((x)=>x.keyId ==  keyId)
     if(existKeyEditing && existKeyEditing.isEditing)
     { 
      return true;
     }
     return false;
  }
  const deleteKey = async(keyId:number)=>
  {
      var response = await listViewService.deleteKeyFromView(convertToInteger(router.query.viewId),keyId)
      if(isSucc(response))
      {
         onUpdateViewKeys(viewKeys.filter((x)=>x.keyId !== keyId))
      }
  }
  const updateViewKeyUpdateList = (keyId:number,isEditing:boolean)=>
  {
    let newViewKeyUpdateList :{keyId:number,isEditing:boolean}[] = Object.assign([],viewKeyUpdateList)
    var isKeyUpdateIndex = newViewKeyUpdateList.findIndex((x)=>x.keyId === keyId);
    if(isKeyUpdateIndex>=0)
    {
      newViewKeyUpdateList[isKeyUpdateIndex].isEditing = isEditing;
    }
    else
    {
      newViewKeyUpdateList.push({keyId:keyId,isEditing:isEditing})
    }
    setViewKeyUpdateList(newViewKeyUpdateList)
  }
  const onSubmit = async(keyId:number)=>{
       if(!isKeyEditing(keyId))
       {
          updateViewKeyUpdateList(keyId,true)
       }
       else
       {
          console.log('aaaa')
          updateViewKeyUpdateList(keyId,false)
       }
  }
  return (
    <>
     {
      viewKeys && viewKeys.map((viewKey,index)=>{
        
        return (
          <Grid container spacing={2} sx={{ alignItems: "flex-end" }} key = {index}>
            <Grid item xs={2} sx={{ display: "flex", flexDirection: "column" }}>
              <FormLabel>
                <Typography variant="body2">Access / Role</Typography>
              </FormLabel>
              <Select value={viewKey.role} onChange={(e)=>handleSelectRoleChange(e,index)} disabled={!isKeyEditing(viewKey.keyId)}>
                {roles &&
                  roles.map((role, index) => {
                    return (
                      <MenuItem key={index} value={role.name}>
                        {role.label}
                      </MenuItem>
                    );
                  })}
              </Select>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <FormLabel>
                <Typography variant="body2">Key Link</Typography>
              </FormLabel>
              
              <TextField
                value={getKeyLink(viewKey.key)}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                       {/* <Tooltip
                      PopperProps={{
                        disablePortal: true,
                      }}
                      onClose={handleTooltipClose}
                      open={isTooltipOpen}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      title="Copied"
                    > */}
                       <ContentCopyIcon sx={{ cursor: "pointer" }} onClick={() => {handleCopyKeyLink(viewKey.key)}} />
                    {/* </Tooltip> */}
                      
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <FormLabel>
                <Typography variant="body2">Info</Typography>
              </FormLabel>
              <TextField
                placeholder="Key name"
                value={viewKey.name}
                onChange={(e:any)=>handleViewNameChange(e,index)}
                disabled={!isKeyEditing(viewKey.keyId)}
              />
            </Grid>
            <Grid
              item
              xs={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Button
                fullWidth
                variant="text"
                sx={{ borderColor: "blue", color: "blue", height: "56px" }}
                onClick={()=>onSubmit(viewKey.keyId)}
              >
               {isKeyEditing(viewKey.keyId)?"Update":"Edit"}
              </Button>
              
            </Grid>
            <Grid
              item
              xs={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Button
                fullWidth
                variant="text"
                sx={{ borderColor: "red", color: "red", height: "56px" }}
                onClick={()=>deleteKey(viewKey.keyId)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        )
      })
     }
      
    </>
  );
}

export default ManageKeys;
