import {
  Modal,
  Typography,
  Box,
  FormLabel,
  TextField,
  Divider,
  Button,
  Grid,
  Tab,
  Select,
  MenuItem,
  Tabs,
  Autocomplete,
  Alert,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import UserListAccess from "src/components/list-access/UserListAccess";
import { SelectChangeEvent } from "@mui/material/Select";
import ManageKeys from "src/components/share-list/ManageKeys";
import { connect } from "react-redux";
import { RoleLabel } from "src/enums/ShareEnumLabels";
import { Role } from "src/enums/SharedEnums";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import GroupsIcon from "@mui/icons-material/Groups";
import { useRouter } from "next/router";
import { accountService } from "src/services/account.service";
import { FlexlistsError, isSucc } from "src/models/ApiResponse";
import { validateEmail } from "src/utils/validateUtils";
import { listViewService } from "src/services/listView.service";
import { GetUserContactsOutputDto, GetUserGroupsOutputDto, GetViewGroupsOutputDto } from "src/models/ApiOutputModels";
import { convertToInteger } from "src/utils/convertUtils";
import { setViewGroups, setViewUsers } from "src/redux/actions/viewActions";
import GroupListAccess from "src/components/list-access/GroupListAccess";
import { groupService } from "src/services/group.service";

type ShareListProps = {
  open: boolean;
  handleClose: () => void;
  users: any[];
  viewGroups: any[];
  setViewUsers:(newUsers:any[])=>void
  setViewGroups:(newViewGroups:GetViewGroupsOutputDto[])=>void
};

const style = {
  position: "absolute" as "absolute",
  padding: 2,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", md: "50%" },
  maxHeight: "80vh",
  backgroundColor: "white",
  border: "none",
  borderRadius: "8px",
  overflowY: "scroll",
  display: "flex",
  flexDirection: "column",
};

const scaleUp = {
  hidden: {
    x: "-50%",
    y: "-50%",
    scale: 0.5,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
      type: "spring",
      damping: 30,
      stiffness: 700,
    },
  },
  close: {
    opacity: 0,
  },
};

const ShareList = ({
  open,
  handleClose,
  users,
  viewGroups,
  setViewUsers,
  setViewGroups
}: ShareListProps) => {
 
  const [currentTab, setCurrentTab] = useState("Users");
  var roles: { name: string; label: string }[] = [];
  RoleLabel.forEach((value, key) => {
    roles.push({ name: key, label: value });
  });
  const closeModal = () => {
    handleClose();
  };
  const shareTabs: any[] = [
    {
      value: "Users",
      icon: <PersonIcon />,
      component: <ShareUsers users={users} roles={roles} setViewUsers= {setViewUsers} />,
    },
    {
      value: "Groups",
      icon: <GroupsIcon />,
      component: <ShareGroups viewGroups={viewGroups} roles={roles} setViewGroups={setViewGroups} />,
    },
    {
      value: "Keys",
      icon: <KeyIcon />,
      component: <ShareKeys roles={roles} />,
    },
  ];
  const changeTab = (value: any) => {
    setCurrentTab(value);
  };

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        component={motion.div}
        variants={scaleUp}
        initial="hidden"
        animate="visible"
        exit="close"
      >
        <Typography gutterBottom variant="h5" sx={{ my: 1 }}>
          Share
        </Typography>
        <Box borderBottom={"solid 1px"} borderColor={"divider"}>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={(e, value) => changeTab(value)}
          >
            {shareTabs.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                label={tab.value}
                icon={tab.icon}
                value={tab.value}
                sx={{ minWidth: "fit-content", flex: 1 }}
              />
            ))}
          </Tabs>
        </Box>

        <Box sx={{ mb: 5 }} />

        {shareTabs.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Box>
    </Modal>
  );
};
type ShareUsersProps = {
  users: any[];
  roles: { name: string; label: string }[];
  setViewUsers: (newUsers:any[])=>void
};
const ShareUsers = ({ users, roles,setViewUsers }: ShareUsersProps) => {
  const router = useRouter();
  const [role, setRole] = useState<Role>(Role.ReadOnly);
  const handleSelectRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as Role);
  };
  const [contacts,setContacts] = useState<GetUserContactsOutputDto[]>([])
  const [invitedEmail,setInvitedEmail] = useState<any>('')
  const [submit,setSubmit] = useState<boolean>(false)
  const [isEmailValid, setEmailValid] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [error, setError] = useState<string>('');
  const [successMessage,setSuccessMessage] = useState<string>('')
  useEffect(()=>{
    async function fetchData ()
    {
       var contactsResponse = await accountService.getUserContacts();
       if(isSucc(contactsResponse) && contactsResponse.data)
       {
         setContacts(contactsResponse.data);
       }
    }
    if(router.isReady)
    {
      fetchData()
    }
  },[router.isReady])
  const onSubmit = async() =>
  {
      if(!router.query.viewId)
      {
        setError('view id not exist')
        return;
      }
      if(!isEmailValid)
         return;
      var existContact = contacts.find((x)=>x.email === invitedEmail );
      setSubmit(true)
      if(existContact)
      {
         let inviteToUserResponse = await listViewService.inviteUserToView(convertToInteger(router.query.viewId),existContact.userId,role)
         if(isSucc(inviteToUserResponse))
         {
          setSuccessMessage(`Invite to ${invitedEmail} sent`)
         }
         else
         {
          setError((inviteToUserResponse as FlexlistsError).message)
         }
      }
      else
      {
        let inviteToEmailResponse = await listViewService.inviteEmailToView(convertToInteger(router.query.viewId),invitedEmail,role)
        console.log(inviteToEmailResponse)
        if(isSucc(inviteToEmailResponse))
        {
          console.log('bbbb')
          setSuccessMessage(`Invite to ${invitedEmail} sent`)
        }
        else
         {
          setError((inviteToEmailResponse as FlexlistsError).message)
         }
      }

  }
  return (
    <>
      <Typography variant="subtitle1" sx={{ mt: 1 }}>
        Invite user
      </Typography>
      <Box>
          {error && <Alert severity="error">{error}</Alert>}
      </Box>
      <Box>
          {submit && successMessage && <Alert severity="success">{successMessage}</Alert>}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={5} sx={{ display: "flex", flexDirection: "column" }}>
          <FormLabel>
            <Typography variant="body2">Access / Role</Typography>
          </FormLabel>
          <Select value={role} onChange={handleSelectRoleChange}>
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
        <Grid item xs={5} sx={{ display: "flex", flexDirection: "column" }}>
          <FormLabel>
            <Typography variant="body2">Users</Typography>
          </FormLabel>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            onInputChange={(event, newInputValue) => {
              setInvitedEmail(newInputValue);
              if(!validateEmail(newInputValue))
              {
                 setEmailValid(false)
              }
              else
              {
                setEmailValid(true)
              }
            }}
            options={contacts.map((option) => option.email)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Invite contacts or invite by email ..."
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
                required
                error={emailDirty && isEmailValid === false}                                        
                onBlur={() => setEmailDirty(true)}
              />
            )}
          />
         
        </Grid>
        <Grid item xs={2} sx={{ display: "flex", alignItems: "flex-end" }}>
          <Button variant="contained" fullWidth sx={{ height: "56px" }} onClick={()=>onSubmit()}>
            Invite
          </Button>
        </Grid>
      </Grid>
      <UserListAccess users={users} roles={roles}/>
    </>
  );
};


type ShareGroupsProps = {
  viewGroups: GetViewGroupsOutputDto[];
  roles: { name: string; label: string }[];
  setViewGroups : (newViewGroups:GetViewGroupsOutputDto[]) =>void
};
const ShareGroups = ({ viewGroups, roles ,setViewGroups}: ShareGroupsProps) => {
  const router = useRouter();
  const [role, setRole] = useState<Role>(Role.ReadOnly);
  const [submit,setSubmit] = useState<boolean>(false)
  const [groups,setGroups] = useState<GetUserGroupsOutputDto[]>([])
  const [currentGroup,setCurrentGroup] = useState<GetUserGroupsOutputDto|null>();
  const [error, setError] = useState<string>("");
  const [successMessage,setSuccessMessage] = useState<string>('')
  useEffect(()=>{
    async function fetchData()
    {
        var response = await groupService.getUserGroups();
       
        if(isSucc(response) && response.data)
        {
          setGroups(response.data)
        }
    }
    if(router.isReady)
    {
      fetchData()
    }
  },[router.isReady])
  const handleSelectRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as Role);
  };
  const onGroupChange = (newGroup : GetUserGroupsOutputDto|null) =>
  {
     setCurrentGroup(newGroup)
  }
  const onsubmit = async() =>
  {
     setSubmit(true)
  
     if(!currentGroup || !currentGroup.groupId)
     {
       setError("Group required")
       setSuccessMessage("");
       return;
     }
     var response = await listViewService.addTableViewToGroup(currentGroup.groupId,convertToInteger(router.query.viewId),role)
     if(isSucc(response))
     {
        setError("");
        setSuccessMessage("Group added sucessfully");
        var newViewGroups : GetViewGroupsOutputDto[] = Object.assign([],viewGroups);
        newViewGroups.push({groupId:currentGroup.groupId,name:currentGroup.name,role:role})
        setViewGroups(newViewGroups);
        setCurrentGroup(null)
     }
     else
     {
        setSuccessMessage("");
       setError((response as FlexlistsError).message)
     }
  }
  return (
    <>
      <Typography variant="subtitle1" sx={{ mt: 1 }}>
        Invite group
      </Typography>
      <Box>{error && <Alert severity="error">{error}</Alert>}</Box>
        {/* <Box>
          {submit && successMessage && <Alert severity="success">{successMessage}</Alert>}
        </Box> */}
      <Grid container spacing={2}>
        
        <Grid item xs={5} sx={{ display: "flex", flexDirection: "column" }}>
          <FormLabel>
            <Typography variant="body2">Access / Role</Typography>
          </FormLabel>
          <Select value={role} onChange={handleSelectRoleChange}>
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
        {
          groups &&  <Grid item xs={5} sx={{ display: "flex", flexDirection: "column" }}>
          <FormLabel>
            <Typography variant="body2">Groups</Typography>
          </FormLabel>
          <Autocomplete
            id="combo-box-groups"
            filterSelectedOptions={true}
            options={groups.filter((x)=>!viewGroups.find((g)=>g.groupId===x.groupId))}
            getOptionLabel={(option) => option.name}
            fullWidth
            value={currentGroup??null}
            onChange={(event, newInputValue) => {
              onGroupChange(newInputValue);
            }}
            sx={{ my: 1 }}
            renderInput={(params) => <TextField {...params} label="Search groups"  />}
          />
        </Grid>
        }
       
        <Grid item xs={2} sx={{ display: "flex", alignItems: "flex-end" }}>
          <Button variant="contained" fullWidth sx={{ height: "56px" }} onClick={()=>onsubmit()}>
            Add Group
          </Button>
        </Grid>
      </Grid>
      <GroupListAccess roles={roles} viewGroups={viewGroups} setViewGroups={setViewGroups} />
    </>
  );
};
type ShareKeysProps = {
  roles: { name: string; label: string }[];
};
const ShareKeys = ({ roles }: ShareKeysProps) => {
  const [role, setRole] = useState<Role>(Role.ReadOnly);

  const handleSelectRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as Role);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={5} sx={{ display: "flex", flexDirection: "column" }}>
          <FormLabel>
            <Typography variant="body2">Access / Role</Typography>
          </FormLabel>
          <Select value={role} onChange={handleSelectRoleChange}>
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
        <Grid item xs={5} sx={{ display: "flex", flexDirection: "column" }}>
          <FormLabel>
            <Typography variant="body2">Info</Typography>
          </FormLabel>
          <TextField placeholder="Name of reciever for example..."></TextField>
        </Grid>
        <Grid item xs={2} sx={{ display: "flex", alignItems: "flex-end" }}>
          <Button variant="contained" fullWidth sx={{ height: "56px" }}>
            Create Key
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ my: 3, mb: 2 }}></Divider>
      <Typography gutterBottom variant="h5">
        All keys
      </Typography>
      <ManageKeys />
    </>
  );
};
const mapStateToProps = (state: any) => ({
  users: state.view.users,
  viewGroups: state.view.viewGroups,
});

const mapDispatchToProps = {
  setViewUsers,
  setViewGroups
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareList);