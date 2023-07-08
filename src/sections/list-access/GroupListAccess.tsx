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
import { setViewGroups, setViewUsers } from "src/redux/actions/viewActions";
import { connect } from "react-redux";
import { listViewService } from "src/services/listView.service";
import { View } from "src/models/SharedModels";
import { Role } from "src/enums/SharedEnums";
import { isSucc } from "src/models/ApiResponse";
import { GetGroupViewsOutputDto, GetViewGroupsOutputDto } from "src/models/ApiOutputModels";

type GroupListAccessProps = 
{
  currentView:View;
  viewGroups:GetViewGroupsOutputDto[]
  roles:{name:string,label:string}[],
  setViewGroups:(groups:any[]) => void
}
function GroupListAccess({currentView,viewGroups,roles,setViewGroups}:GroupListAccessProps) {
  const [role, setRole] = useState("");
  const onRoleChange = async(groupId:number,event: SelectChangeEvent) => {
     let response = await listViewService.updateTableViewGroupRole(groupId,currentView.id,event.target.value as Role)
     if(isSucc(response))
     {
        var newGroups: GetViewGroupsOutputDto[]= Object.assign([],viewGroups)
        setViewGroups(newGroups.map((x)=>{
           if(x.groupId === groupId)
           {
              x.role = event.target.value as Role;
              return x;
           }
           return x;
        }))
     }
  };
  const onDeleteViewGroup = async(groupId:number) =>
  {
      let response = await listViewService.deleteTableViewFromGroup(groupId,currentView.id);
      if(isSucc(response))
      {
        var newGroups: any[]= Object.assign([],viewGroups)
        setViewGroups(newGroups.filter((x:any)=>{
           return x.groupId != groupId
        }))
      }
      
  }
  return (
    <>
      {
        viewGroups && viewGroups.map((group)=>{
           return (<>
           <Box sx={{ my: 2, display: "flex", alignItems: "center" }}>
                <Box
                  key={group.name}
                  component="img"
                  src={'/assets/images/avatars/avatar_1.jpg'}
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
                <Typography variant="body1">{group.name}</Typography>
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
                  value={group.role}
                  onChange={(e)=>{onRoleChange(group.groupId,e)}}
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
                    onClick={() => {onDeleteViewGroup(group.groupId)}}
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
};
export default connect(mapStateToProps, mapDispatchToProps)(GroupListAccess);