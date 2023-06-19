import React from "react";
import {
  Box,
  Typography,
  Avatar,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { setViewUsers } from "src/redux/actions/viewActions";
import { connect } from "react-redux";
import { listViewService } from "src/services/listView.service";
import { View } from "src/models/SharedModels";
import { Role } from "src/enums/SharedEnums";
import { isSucc } from "src/models/ApiResponse";

type UserListAccessProps = 
{
  currentView:View;
  users:any[]
  roles:{name:string,label:string}[],
  setViewUsers:(users:any[]) => void
}
function UserListAccess({currentView,users,roles,setViewUsers}:UserListAccessProps) {
  const [role, setRole] = useState("");
  const onRoleChange = async(userId:number,event: SelectChangeEvent) => {
     let response = await listViewService.updateUserRoleForView(currentView.id,userId,event.target.value as Role)
     if(isSucc(response))
     {
        var newUsers: any[]= Object.assign([],users)
        setViewUsers(newUsers.map((x:any)=>{
           if(x.userId === userId)
           {
              x.role = event.target.value;
              return x;
           }
           return x;
        }))
     }
  };
  const onDeleteViewUser = async(userId:number) =>
  {
      let response = await listViewService.deleteUserFromView(currentView.id,userId);
      if(isSucc(response))
      {
        var newUsers: any[]= Object.assign([],users)
        setViewUsers(newUsers.filter((x:any)=>{
           return x.userId != userId
        }))
      }
      
  }
  return (
    <>
      {
        users && users.map((user)=>{
           return (<>
           <Box sx={{ my: 2, display: "flex", alignItems: "center" }}>
                <Box
                  key={user.name}
                  component="img"
                  src={user.avatar??'/assets/images/avatars/avatar_1.jpg'}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 50,
                    border: "1px solid #C92929",
                    cursor: "pointer",
                  }}
                />
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
              <Box>
                <Typography variant="body1">{user.name}</Typography>
                <Typography variant="body2">{user.email}</Typography>
              </Box>
              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  minWidth: "auto",
                }}
              >
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={user.role}
                  onChange={(e)=>{onRoleChange(user.userId,e)}}
                  sx={{
                    fontSize: 14,
                    "&::before": { borderBottom: "none" },
                    "&:focused": { backgroundColor: "transparent !important" },
                  }}
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
              </FormControl> 
              <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                      cursor: "pointer",
                      color: "#eb2027",
                      fontWeight: 500,
                    }}
                    onClick={() => {onDeleteViewUser(user.userId)}}
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
              </Box>
            </Box>
           </>)
        })
      }
    </>
  );
}
const mapStateToProps = (state: any) => ({
  currentView:state.view.currentView
});

const mapDispatchToProps = {
  setViewUsers,
};
export default connect(mapStateToProps, mapDispatchToProps)(UserListAccess);
