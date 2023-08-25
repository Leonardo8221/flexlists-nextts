import { Autocomplete, TextField } from "@mui/material"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { User } from "src/models/SharedModels";

type ViewUserSelectProps = {
    name?:string
    selectedUserId?:number;
    setSelectedUserId:(id:number)=>void;
    isModeView : boolean,
    users:any[]
}
function ViewUserSelect({users,name,selectedUserId,setSelectedUserId,isModeView = false}:ViewUserSelectProps)
{
    const router = useRouter();
    const [selectedUser,setSelectedUser] = useState<User>()
    useEffect(()=>{
            if(selectedUserId)
            {
                let newUser = users.find(x=>x.userId===selectedUserId)
                if(newUser)
                {
                    setSelectedUser(newUser)
                }
            }
            else
            {
                if(users.length>0)
                {
                    setSelectedUser(users[0])
                    setSelectedUserId(users[0].userId)
                }
            }
    },[users])
    return (
        <>
          {
            users.length >0 && selectedUser  &&
            <Autocomplete
            id="combo-box-users"
            value = {selectedUser}
            key={"auto-completes"}
            
            onChange={(event: any, newValue: User|null) => {
              if(newValue)
              {
                setSelectedUser(newValue)
                setSelectedUserId(newValue.userId)
              }
            }}
            options={users}
            getOptionLabel={(option) => option?.name}
            fullWidth
            sx={{ my: 1 }}
            renderInput={
                (params) => {
                   return isModeView ?
                   <TextField 
                        {...params} 
                        label={name?name:"users"}
                        InputProps={{
                            readOnly: true,
                        }}
                    />:
                    <TextField 
                        {...params} 
                        label={name?name:"users"}
                    />
                }
                
           }
          
          />
          }
          
        </>
    )
}
const mapStateToProps = (state: any) => ({
    users: state.view.users,
});
  
const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewUserSelect);