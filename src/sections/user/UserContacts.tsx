import { Autocomplete, TextField } from "@mui/material"
import { STATUS_CODES } from "http";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { User } from "src/models/SharedModels";
import { UserProfile } from "src/models/UserProfile";
import { fetchUserContacts } from "src/redux/actions/userActions";
import { getUserContacts } from "src/services/account.service";
import { getDistinctObjects } from "src/utils/arraryHelper";
import { isSucc } from "src/utils/responses";

type UserContactsProps = {
    name?:string
    selectedContactId?:number;
    setSelectedContactId:(id:number)=>void;
    isIncludedCurrentUser?:boolean;
    userProfile: UserProfile,
    isModeView : boolean,
    userContacts:User[],
    fetchUserContacts:()=>void
}
function UserContacts({userContacts,fetchUserContacts,name,selectedContactId,setSelectedContactId,userProfile,isModeView = false,isIncludedCurrentUser=false}:UserContactsProps)
{
    const router = useRouter();
    const [selectedContact,setSelectedContact] = useState<User>()
    const [contacts,setContacts] = useState<User[]>([])
    useEffect(()=>{
        if(router.isReady)
        {
            fetchUserContacts()
        }
        
    },[router.isReady])
    useEffect(()=>{
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
            newUserContacts = newUserContacts.concat(userContacts)
            if(selectedContactId)
            {
                let newContact = newUserContacts.find(x=>x.userId===selectedContactId)
                if(newContact)
                {
                    setSelectedContact(newContact)
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
           
            setContacts(getDistinctObjects(newUserContacts,"userId"));
        
    },[userContacts])
    return (
        <>
          {
            contacts.length >0 && selectedContact  &&
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
            options={contacts}
            getOptionLabel={(option) => option?.name}
            fullWidth
            sx={{ my: 1 }}
            renderInput={
                (params) => {
                   return isModeView ?
                   <TextField 
                        {...params} 
                        label={name?name:"contacts"}
                        InputProps={{
                            readOnly: true,
                        }}
                    />:
                    <TextField 
                        {...params} 
                        label={name?name:"contacts"}
                    />
                }
                
           }
          
          />
          }
          
        </>
    )
}
const mapStateToProps = (state: any) => ({
    userProfile: state.user.userProfile,
    userContacts: state.user.userContacts
});
  
const mapDispatchToProps = {
    fetchUserContacts
};
export default connect(mapStateToProps, mapDispatchToProps)(UserContacts);