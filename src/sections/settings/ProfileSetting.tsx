import { Avatar, Button, Grid, Typography, TextField, Box } from "@mui/material"
import { styled } from "@mui/material/styles";
import { MuiTelInput } from "mui-tel-input";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetProfileOutputDto } from "src/models/ApiOutputModels";
import { isSucc } from "src/models/ApiResponse";
import { getProfile } from "src/services/account.service";
import { getAvatarUrl } from "src/utils/flexlistHelper";
const AvatarImg = styled("img")(({ theme }) => ({
    width: "100%",
    height: "100%",
  }));

const ProfileSetting = () => {
    const router = useRouter();
    const [userProfile,setUserProfile] = useState<GetProfileOutputDto>();
    const [isDirty,setIsDirty] = useState<boolean>(false);
    useEffect(() => {
        async function getUserProfile() {
            const response = await getProfile();
            if(isSucc(response)&& response.data)
            {
              setUserProfile(response.data)
            }
        }
        if (router.isReady) {
            getUserProfile()
        }
    }, [router.isReady]);
    const handleFirstNameChange = ( event: React.ChangeEvent<HTMLInputElement>) => {
      let newProfile  = Object.assign({}, userProfile);
      newProfile.lastName = event.target.value;
      setUserProfile(newProfile)
      setIsDirty(true);
    };
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let newProfile  = Object.assign({}, userProfile);
      newProfile.email = event.target.value;
      setUserProfile(newProfile)
      setIsDirty(true);
    };
  
    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let newProfile  = Object.assign({}, userProfile);
      newProfile.lastName = event.target.value;
      setUserProfile(newProfile)
      setIsDirty(true);
    };
    const handlePhoneNumberChange = (newPhoneNumber: string) => {
      let newProfile  = Object.assign({}, userProfile);
      newProfile.phoneNumber = newPhoneNumber;
      setUserProfile(newProfile)
      setIsDirty(true);
    };
    return userProfile? (
        <Box mt={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                width: 128,
                height: 128,
                border: "solid 6px #fff",
                boxShadow: "0 4px 24px 0 rgba(0,0,0,0.1)",
                fontSize: 40,
                position: "relative",
                "&:hover .overlay": {
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                },
              }}
            >
              <AvatarImg src={getAvatarUrl(userProfile?.avatarUrl)} />
            </Avatar>
            <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
              <Button variant="contained">Change Avatar</Button>
              <Button variant="outlined" sx={{ mt: 1 }}>
                Delete Avatar
              </Button>
            </Box>
          </Box>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item md={6}>
              <Typography variant="subtitle2">First Name</Typography>
              <TextField sx={{ width: "100%" }} value={userProfile?.firstName} onChange={handleFirstNameChange} />
            </Grid>
            <Grid item md={6}>
              <Typography variant="subtitle2">Last Name</Typography>
              <TextField sx={{ width: "100%" }} value={userProfile?.lastName} onChange={handleLastNameChange} />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Email</Typography>
              <TextField
                sx={{ width: "100%" }}
                value = {userProfile?.email}
                type="email"
                onChange={handleEmailChange}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Phone Number</Typography>
              <MuiTelInput
                  value={userProfile?.phoneNumber}
                  onChange={handlePhoneNumberChange}
                  defaultCountry="NL"
                  fullWidth
                />
            </Grid>
          </Grid>
          <Button sx={{ mt: 2 }} disabled={!isDirty} variant="contained">
            Update Settings
          </Button>
        </Box>
    ) :(<></>)
}
export default ProfileSetting