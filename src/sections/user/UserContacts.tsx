import { Autocomplete, TextField } from "@mui/material"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { User } from "src/models/SharedModels";
import { UserProfile } from "src/models/UserProfile";
import { getUserContacts } from "src/services/account.service";
import { getDistinctObjects } from "src/utils/arraryHelper";
import { isSucc } from "src/utils/responses";

type UserContactsProps = {
    name?:string
    selectedContactId?:number;
    setSelectedContactId:(id:number)=>void;
    isIncludedCurrentUser?:boolean;
    userProfile: UserProfile,
    isView : boolean
}
function UserContacts({name,selectedContactId,setSelectedContactId,userProfile,isView,isIncludedCurrentUser=false}:UserContactsProps)
{
    const router = useRouter();
    const [selectedContact,setSelectedContact] = useState<User>()
    const [userContacts,setUserContacts] = useState<User[]>([])
    useEffect(()=>{
        async function fetchData()
        {
            let newUserContacts : User[] = [];
            if(isIncludedCurrentUser)
            {
               newUserContacts.push({
                    userId:userProfile.id,
                    name:userProfile.name,
                    email:userProfile.email,
                    firstName:userProfile.firstName,
                    lastName:userProfile.lastName,
                    systemRole:userProfile.systemRole,
                    status:userProfile.status,
                    membershipLevel:userProfile.membershipLevel,
               })
            }
            let getUserContactsResponse = await getUserContacts()
            if(isSucc(getUserContactsResponse) && getUserContactsResponse.data&& getUserContactsResponse.data.length>0)
            {
               newUserContacts = newUserContacts.concat(getUserContactsResponse.data)
            }
            if(selectedContactId)
            {
                let newContact = newUserContacts.find(x=>x.userId===selectedContactId)
                if(newContact)
                {
                    setSelectedContact(newContact)
                }
                else
                {
                    setSelectedContact(newUserContacts[0])
                    setSelectedContactId(newUserContacts[0].userId)
                }
            }
            else
            {
                if(newUserContacts.length>0)
                {
                    setSelectedContact(newUserContacts[0])
                    setSelectedContactId(newUserContacts[0].userId)
                }
            }
           
            setUserContacts(getDistinctObjects(newUserContacts,"userId"));
        }
        if(router.isReady)
        {
            fetchData()
        }
        
    },[router.isReady])
    return (
        <>
          {
            userContacts.length >0  &&
            <Autocomplete
            id="combo-box-user-contact"
            value = {selectedContact}
            key={"auto-complete-contact"}
            
            onChange={(event: any, newValue: User|null) => {
              if(newValue)
              {
                setSelectedContact(newValue)
                setSelectedContactId(newValue.userId)
              }
            }}
            options={userContacts}
            getOptionLabel={(option) => option?.name}
            fullWidth
            sx={{ my: 1 }}
            renderInput={
                (params) => 
                <TextField 
                {...params} 
                label={name?name:"contacts"}
                InputProps={{
                    readOnly: isView,
                  }}
               />
           }
          
          />
          }
          
        </>
    )
}
const mapStateToProps = (state: any) => ({
    userProfile: state.user.userProfile,
});
  
const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(UserContacts);