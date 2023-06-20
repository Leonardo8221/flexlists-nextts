import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  FormLabel,
  Button,
  TextField,
  Divider,
  Avatar,
  Autocomplete,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import { groupService } from "src/services/group.service";
import { isErr, isSucc } from "src/models/ApiResponse";
import { convertToInteger } from "src/utils/convertUtils";
import { GetGroupUsersOutputDto, GetUserContactsOutputDto } from "src/models/ApiOutputModels";
import { accountService } from "src/services/account.service";

function GroupMembers() {
  const router = useRouter()
  const [groupUsers,setGroupUsers] = useState<GetGroupUsersOutputDto[]>([]);
  const [userContacts,setUserContacts] = useState<GetUserContactsOutputDto[]>([])
  const [selectedUserName,setSelectedUserName] = useState<string>('')
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState<string>('');
  useEffect(()=>{
    async function fetchGroupUsers()
    {
       if(router.query.groupId)
       {
        let getGroupUsersResponse = await groupService.getGroupUsers(convertToInteger(router.query.groupId))
        if(isSucc(getGroupUsersResponse) && getGroupUsersResponse.data)
        {
          setGroupUsers(getGroupUsersResponse.data)
        }
       }
       
    }
    if(router.isReady)
    {
      fetchGroupUsers()
    }
  },[router.isReady])
  useEffect(()=>{
    async function fetchUserContacts()
    {
       if(router.query.groupId)
       {
        let getUserContactsResponse = await accountService.getUserContacts()
        console.log(getUserContactsResponse)
        if(isSucc(getUserContactsResponse) && getUserContactsResponse.data)
        {
          setUserContacts(getUserContactsResponse.data)
        }
       }
       
    }
    if(router.isReady)
    {
      fetchUserContacts()
    }
  },[router.isReady])
  const onSubmit = async()=>{
     setSubmit(true)
     if(selectedUserName)
     {
       setError("Username required")
       return;
     }
     var user = userContacts.find((x)=>x.email === selectedUserName)
     if(!user)
     {
       setError("Email invalid")
       return
     }
     
     var response = await groupService.addUserToGroup(convertToInteger(router.query.groupId),user.userId)
     if(isSucc(response))
     {
        var newGroupUsers = Object.assign([],groupUsers);
        newGroupUsers.push({firstName:'',lastName:'',userId:user.userId,userName:user.name})
     }
  }

  return (
    <Box>
      <Typography
        variant="subtitle1"
        component={"h6"}
        sx={{ textTransform: "uppercase" }}
      >
        Add members
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box>
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
          <Autocomplete
            id="combo-box-user-contact"
            value = {selectedUserName}
            onChange={(event: any, newValue: string|null) => {
              if(newValue)
              {
                setSelectedUserName(newValue)
              }
            }}
            options={userContacts.map((option) => option.name)}
            fullWidth
            sx={{ my: 1 }}
            renderInput={(params) => <TextField {...params} label="User name" 
            error={submit && !selectedUserName} />}
          
          />

          {/* <FormLabel
            sx={{
              fontSize: { xs: 12 },
            }}
            id="multiple-email-address"
          >
            (multiple emails separate using comma)
          </FormLabel> */}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", alignItems: "center", position: "relative" }}
        >
          <Button
            fullWidth
            variant="contained"
            sx={{
              textTransform: "none",
              height: "56px",
            }}
            onClick={()=>onSubmit()}
          >
            Add user
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="subtitle1"
          component={"h6"}
          sx={{ textTransform: "uppercase" }}
        >
          Members
        </Typography>
        <Typography
          variant="subtitle1"
          component={"span"}
          sx={{ textTransform: "uppercase" }}
        >
          (1)
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          my: 1,
          p: 1,
          borderRadius: 1,
          "&:hover": {
            background: "#eee",
          },
          "&:hover .deleteMember": {
            display: "block",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar>A</Avatar>
          <Typography variant="body1">John Doe</Typography>
        </Box>
        <CloseIcon
          sx={{ display: "none", cursor: "pointer" }}
          className="deleteMember"
        />
      </Box>
    </Box>
  );
}

export default GroupMembers;
