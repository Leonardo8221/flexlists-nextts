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

type UserListAccessProps = 
{
  users:any[]
}
function UserListAccess({users}:UserListAccessProps) {
  const [role, setRole] = useState("");
  console.log(users)
  const handleChange = (event: SelectChangeEvent) => {
  };
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
                  value={role}
                  onChange={handleChange}
                  sx={{
                    fontSize: 14,
                    "&::before": { borderBottom: "none" },
                    "&:focused": { backgroundColor: "transparent !important" },
                  }}
                >
                  <MenuItem value={10} sx={{ fontSize: 14 }}>
                    Owner
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: 14 }}>
                    Admin
                  </MenuItem>
                  <MenuItem value={30} sx={{ fontSize: 14 }}>
                    Editor
                  </MenuItem>
                </Select>
              </FormControl>            
              </Box>
            </Box>
           </>)
        })
      }
      
      {/* <Box sx={{ my: 2, display: "flex", alignItems: "center" }}>
        <Avatar sx={{ mr: 1, backgroundColor: "darkblue" }}>JD</Avatar>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="body1">John Doe</Typography>
            <Typography variant="body2">mail@example.com</Typography>
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
              value={age}
              onChange={handleChange}
              sx={{
                fontSize: 14,
                "&::before": { borderBottom: "none" },
                "&:focused": { backgroundColor: "transparent !important" },
              }}
            >
              <MenuItem value={10} sx={{ fontSize: 14 }}>
                Owner
              </MenuItem>
              <MenuItem value={20} sx={{ fontSize: 14 }}>
                Admin
              </MenuItem>
              <MenuItem value={30} sx={{ fontSize: 14 }}>
                Editor
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box> */}
    </>
  );
}

export default UserListAccess;
