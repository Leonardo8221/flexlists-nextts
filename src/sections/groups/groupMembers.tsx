import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
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
import { FlexlistsError, isSucc } from "src/models/ApiResponse";
import { convertToInteger } from "src/utils/convertUtils";
import { GetGroupUsersOutputDto, GetUserContactsOutputDto } from "src/models/ApiOutputModels";
import { accountService } from "src/services/account.service";
import DeleteIcon from "@mui/icons-material/Delete";
import { connect } from "react-redux";
import { UserProfile } from "src/models/UserProfile";
import { getAvatarUrl } from "src/utils/flexlistHelper";
import YesNoDialog from "src/components/dialog/YesNoDialog";
import { getTranslation } from "src/utils/i18n";
import { TranslationText } from "src/models/SharedModels";
import { FlashMessageModel } from "src/models/FlashMessageModel";
import { setFlashMessage } from "src/redux/actions/authAction";
type GroupMembersProps = {
  userProfile: UserProfile,
  translations: TranslationText[];
  setFlashMessage:(message:FlashMessageModel)=>void
}
function GroupMembers({userProfile,translations,setFlashMessage}:GroupMembersProps) {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const router = useRouter()
  const [groupUsers,setGroupUsers] = useState<GetGroupUsersOutputDto[]>([]);
  const [userContacts,setUserContacts] = useState<GetUserContactsOutputDto[]>([])
  const [selectedUserName,setSelectedUserName] = useState<string>('')
  const [submit, setSubmit] = useState(false);
  // const [error, setError] = useState<string>('');
  const [isDeleteMemberOpenModal, setIsDeleteMemberOpenModal] = useState<boolean>(false);
  const [deleteMemberId, setDeleteMemberId] = useState<number>(0);
  useEffect(()=>{
    async function fetchData()
    {
       if(router.query.groupId)
       {
        let getGroupUsersResponse = await groupService.getGroupUsers(convertToInteger(router.query.groupId))
        if(isSucc(getGroupUsersResponse) && getGroupUsersResponse.data)
        {
          setGroupUsers(getGroupUsersResponse.data)
        }
        let getUserContactsResponse = await accountService.getUserContacts()
        if(isSucc(getUserContactsResponse) && getUserContactsResponse.data)
        {
          setUserContacts(getUserContactsResponse.data)
        }
       }
       
    }
    if(router.isReady)
    {
      fetchData()
    }
  },[router.isReady])
  const setError = (message:string) =>
  {
    setFlashMessage({message:message,type:"error"})
  }
  const onSubmit = async()=>{
     setSubmit(true)
     if(!selectedUserName)
     {
       setError("Username required")
       return;
     }
     var user = userContacts.find((x)=>x.name === selectedUserName)
     if(!user)
     {
       setError("userName invalid")
       return
     }
     var existMember = groupUsers.find((x)=>x.userId===user?.userId)
     if(existMember)
     {
        setError("User already added")
        return;
     }
     var response = await groupService.addUserToGroup(convertToInteger(router.query.groupId),user.userId)
     if(isSucc(response))
     {
        var newGroupUsers = Object.assign([],groupUsers);
        newGroupUsers.push({firstName:'',lastName:'',userId:user.userId,userName:user.name,avatarUrl:user.avatarUrl});
        setGroupUsers(newGroupUsers)
        setSelectedUserName('')
        setSubmit(false)
        return;
     }
     else
     {
      setError((response as FlexlistsError).message)
     }
     

  }
  const handleDeleteMember = async(userId:number) =>
  {
      setDeleteMemberId(userId)
      setIsDeleteMemberOpenModal(true)
  }
  const deleteMember = async() =>
  {
      if(deleteMemberId === 0)
      {
        setError("Invalid user")
        return;
      }
      var response = await groupService.deleteUserFromGroup(convertToInteger(router.query.groupId),deleteMemberId);
      if(isSucc(response))
      {
         setGroupUsers(groupUsers.filter((x)=>x.userId != deleteMemberId))
      }
      else
      {
        setError((response as FlexlistsError).message)
      }
  }
  return (
    <>
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
            {/* {error && <Alert severity="error">{error}</Alert>} */}
          </Box>
          <Autocomplete
            id="combo-box-user-contact"
            value = {selectedUserName}
            key={"auto-complete-contact"}
            onChange={(event: any, newValue: string|null) => {
              if(newValue)
              {
                setSelectedUserName(newValue)
              }
            }}
            options={userContacts.filter((x)=>!groupUsers.find((g)=>g.userId === x.userId)).map((option) => option.name)}
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
          ({groupUsers.length})
        </Typography>
      </Box>
      {
        groupUsers && groupUsers.map((user,index)=>{
           return (
           <Box
            key = {index}
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
              <Avatar
                sx={{ width: 30, height: 30 }}
                src={getAvatarUrl(user?.avatarUrl)}
                alt="photoURL"
              />
              <Typography variant="body1">{user.userName}</Typography>
              { user.userId !== userProfile?.id &&
                 <Box
                 sx={{
                   display: "flex",
                   gap: 1,
                   alignItems: "center",
                   cursor: "pointer",
                   color: "#eb2027",
                   fontWeight: 500,
                 }}
                 onClick={() => handleDeleteMember(user.userId)}
               >
                 <DeleteIcon />
                 <Typography
                   variant="subtitle2"
                   component={"span"}
                   sx={{
                     display: {
                       xs: "none",
                       md: "block",
                     },
                   }}
                 >
                   Delete
                 </Typography>
               </Box>
              }
              
              {/* <Typography variant="body1">{user.userName}</Typography> */}
            </Box>
            <CloseIcon
              sx={{ display: "none", cursor: "pointer" }}
              className="deleteMember"
            />
          </Box>)
        })
      }
      
    </Box>
     {
        isDeleteMemberOpenModal && <YesNoDialog
        title={t("Delete group member")}
        submitText={t("Delete")}
        message={t("Sure Delete Group Member")}
        open={isDeleteMemberOpenModal}
        translations={translations}
        handleClose={() => setIsDeleteMemberOpenModal(false)}
        onSubmit={() => {
          deleteMember();
        }}
      />
      }
    </>
  );
}
const mapStateToProps = (state: any) => ({
  userProfile: state.user.userProfile,
});

const mapDispatchToProps = {
  setFlashMessage
};
export default connect(mapStateToProps, mapDispatchToProps)(GroupMembers);
