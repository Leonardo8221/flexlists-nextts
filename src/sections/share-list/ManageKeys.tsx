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
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import { GetKeysForViewOutputDto } from "src/models/ApiOutputModels";
import { Role } from "src/enums/SharedEnums";
import { listViewService } from "src/services/listView.service";
import { convertToInteger } from "src/utils/convertUtils";
import { useRouter } from "next/router";
import { isSucc } from "src/models/ApiResponse";
import { ThemeContext } from "@emotion/react";
import { View } from "src/models/SharedModels";
type ManageKeysProps = {
  viewKeys: GetKeysForViewOutputDto[];
  roles: { name: string; label: string }[];
  onUpdateViewKeys: (newViewKeys: GetKeysForViewOutputDto[]) => void;
  currentView: View;
};
function ManageKeys({
  viewKeys,
  roles,
  onUpdateViewKeys,
  currentView,
}: ManageKeysProps) {
  const theme = useTheme();
  const router = useRouter();
  const [viewKeyUpdateList, setViewKeyUpdateList] = useState<
    { keyId: number; isEditing: boolean }[]
  >([]);
  const handleSelectRoleChange = async (
    event: SelectChangeEvent,
    index: number
  ) => {
    var newViewKeys: GetKeysForViewOutputDto[] = Object.assign([], viewKeys);
    var currentViewKey = newViewKeys[index];
    currentViewKey.role = event.target.value as Role;
    onUpdateViewKeys(newViewKeys);
  };
  const handleViewNameChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    var newViewKeys: GetKeysForViewOutputDto[] = Object.assign([], viewKeys);
    var currentViewKey = newViewKeys[index];
    currentViewKey.name = event.target.value;
    onUpdateViewKeys(newViewKeys);
  };
  const getKeyLink = (key: string): string => {
    return `${process.env.NEXT_PUBLIC_FLEXLIST_CLIENT_URL}/key/${key}`;
  };
  // const handleTooltipClose = ()=>
  //         {
  //           isTooltipOpen = false
  //         }
  const handleCopyKeyLink = (key: string) => {
    navigator.clipboard.writeText(getKeyLink(key));
    // isTooltipOpen = true;
    // setTimeout(function () {
    //     handleTooltipClose();
    // }, 2000);
  };
  const isKeyEditing = (keyId: number): boolean => {
    var existKeyEditing = viewKeyUpdateList.find((x) => x.keyId == keyId);
    if (existKeyEditing && existKeyEditing.isEditing) {
      return true;
    }
    return false;
  };
  const deleteKey = async (keyId: number) => {
    var response = await listViewService.deleteKeyFromView(
      currentView.id,
      keyId
    );
    if (isSucc(response)) {
      onUpdateViewKeys(viewKeys.filter((x) => x.keyId !== keyId));
    }
  };
  const updateViewKeyUpdateList = (keyId: number, isEditing: boolean) => {
    let newViewKeyUpdateList: { keyId: number; isEditing: boolean }[] =
      Object.assign([], viewKeyUpdateList);
    var isKeyUpdateIndex = newViewKeyUpdateList.findIndex(
      (x) => x.keyId === keyId
    );
    if (isKeyUpdateIndex >= 0) {
      newViewKeyUpdateList[isKeyUpdateIndex].isEditing = isEditing;
    } else {
      newViewKeyUpdateList.push({ keyId: keyId, isEditing: isEditing });
    }
    setViewKeyUpdateList(newViewKeyUpdateList);
  };
  const onSubmit = async (keyId: number) => {
    if (!isKeyEditing(keyId)) {
      updateViewKeyUpdateList(keyId, true);
    } else {
      console.log("aaaa");
      updateViewKeyUpdateList(keyId, false);
    }
  };
  return (
    <>
      {viewKeys &&
        viewKeys.map((viewKey, index) => {
          return (
            <>
              <Grid
                container
                spacing={1}
                sx={{ alignItems: "flex-end", display:{xs:"none", md:"flex"} }}
                key={index}
              >
                <Grid
                  item
                  xs={3}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <FormLabel>
                    <Typography variant="body2">Access / Role</Typography>
                  </FormLabel>
                  <Select
                    size="small"
                    value={viewKey.role}
                    onChange={(e) => handleSelectRoleChange(e, index)}
                    disabled={!isKeyEditing(viewKey.keyId)}
                  >
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
                  xs={3}
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
                    size="small"
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
                          <Tooltip title="Copy to clipboard">
                            <ContentCopyIcon
                              sx={{ cursor: "pointer" }}
                              onClick={() => {
                                handleCopyKeyLink(viewKey.key);
                              }}
                            />
                          </Tooltip>

                          {/* </Tooltip> */}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <FormLabel>
                    <Typography variant="body2">Info</Typography>
                  </FormLabel>
                  <TextField
                    size="small"
                    placeholder="Key name"
                    value={viewKey.name}
                    onChange={(e: any) => handleViewNameChange(e, index)}
                    disabled={!isKeyEditing(viewKey.keyId)}
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    display: "flex",
                  }}
                >
                  <Button
                    fullWidth
                    variant="text"
                    sx={{
                      color: theme.palette.palette_style.primary.main,
                    }}
                    onClick={() => onSubmit(viewKey.keyId)}
                  >
                    {isKeyEditing(viewKey.keyId) ? "Update" : "Edit"}
                  </Button>
                  <Button
                    fullWidth
                    variant="text"
                    sx={{
                      borderColor: "red",
                      color: theme.palette.palette_style.error.dark,
                    }}
                    onClick={() => deleteKey(viewKey.keyId)}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
              <Box sx={{mb:2, display:{xs:"block", md:"none"}}}>
              <Typography variant="body2">{viewKey.role} - {viewKey.name}</Typography>
              <Accordion >
                
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{p:0,minHeight:40,"& .MuiAccordionSummary-content":{m: 0 ,minHeight:"unset"},"&.MuiAccordionSummary-root.Mui-expanded":{margin: "0 0" ,minHeight:"36px"}}}
                >
                  <TextField
                    size="small"
                    fullWidth
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
                          <Tooltip title="Copy to clipboard">
                            <ContentCopyIcon
                              sx={{ cursor: "pointer" }}
                              onClick={() => {
                                handleCopyKeyLink(viewKey.key);
                              }}
                            />
                          </Tooltip>

                          {/* </Tooltip> */}
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                </AccordionSummary>
                <AccordionDetails sx={{px:0, gap:1, display:"flex", flexDirection:"column"}}>
                  <Select
                    size="small"
                    fullWidth
                    value={viewKey.role}
                    onChange={(e) => handleSelectRoleChange(e, index)}
                    disabled={!isKeyEditing(viewKey.keyId)}
                  >
                    {roles &&
                      roles.map((role, index) => {
                        return (
                          <MenuItem key={index} value={role.name}>
                            {role.label}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Key name"
                    value={viewKey.name}
                    onChange={(e: any) => handleViewNameChange(e, index)}
                    disabled={!isKeyEditing(viewKey.keyId)}
                  />
                  <Box sx={{display:"flex"}}>
                  <Button
                    fullWidth
                    variant={isKeyEditing(viewKey.keyId) ? "text" : "contained"}
                    sx={{
                      color: theme.palette.palette_style.primary.main,
                      display:isKeyEditing(viewKey.keyId) ? "block" : "none"
                    }}
                    onClick={() => onSubmit(viewKey.keyId)}
                  >
                    Cancel
                  </Button>
                  <Button
                    fullWidth
                    variant={isKeyEditing(viewKey.keyId) ? "contained" : "text"}

                    sx={{
                      color: isKeyEditing(viewKey.keyId) ?theme.palette.palette_style.text.white : theme.palette.palette_style.primary.main  ,
                      
                    }}
                    onClick={() => onSubmit(viewKey.keyId)}
                  >
                    {isKeyEditing(viewKey.keyId) ? "Update" : "Edit"}
                  </Button>
                  <Button
                    fullWidth
                    variant="text"
                    sx={{
                      borderColor: "red",
                      color: theme.palette.palette_style.error.dark,
                    }}
                    onClick={() => deleteKey(viewKey.keyId)}
                  >
                    Delete
                  </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
                
                </Box> 
              
            </>
          );
        })}
    </>
  );
}

export default ManageKeys;
