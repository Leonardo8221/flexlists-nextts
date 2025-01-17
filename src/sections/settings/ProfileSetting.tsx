import {
  Avatar,
  Button,
  Grid,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { MuiTelInput } from "mui-tel-input";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FlexlistsError, isSucc } from "src/models/ApiResponse";
import { FlashMessageModel } from "src/models/FlashMessageModel";
import { UserProfile } from "src/models/UserProfile";
import { setFlashMessage } from "src/redux/actions/authAction";
import { setUserProfile } from "src/redux/actions/userActions";
import { getProfile, updateProfile } from "src/services/account.service";
import { uploadFile } from "src/services/file.service";
import { getAvatarUrl } from "src/utils/flexlistHelper";
import {
  FieldValidatorEnum,
  ModelValidatorEnum,
  frontendValidate,
  isFrontendError,
} from "src/utils/validatorHelper";
const AvatarImg = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
}));
type ProfileSettingProps = {
  userProfile?: UserProfile;
  setUserProfile: (userProfile: UserProfile | undefined) => void;
  setFlashMessage: (mesage: FlashMessageModel) => void;
};
const ProfileSetting = ({
  setFlashMessage,
  userProfile,
  setUserProfile,
}: ProfileSettingProps) => {
  const router = useRouter();
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string | boolean }>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  useEffect(() => {
    async function getUserProfile() {
      const response = await getProfile();
      if (isSucc(response) && response.data) {
        setUserProfile(response.data);
      } else {
        setUserProfile(undefined);
      }
    }
    if (router.isReady) {
      getUserProfile();
    }
  }, [router.isReady]);
  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newProfile = Object.assign({}, userProfile);
    newProfile.firstName = event.target.value;
    setUserProfile(newProfile);
    setIsDirty(true);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newProfile = Object.assign({}, userProfile);
    newProfile.email = event.target.value;
    setUserProfile(newProfile);
    setIsDirty(true);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newProfile = Object.assign({}, userProfile);
    newProfile.lastName = event.target.value;
    setUserProfile(newProfile);
    setIsDirty(true);
  };
  const handlePhoneNumberChange = (newPhoneNumber: string) => {
    let newProfile = Object.assign({}, userProfile);
    newProfile.phoneNumber = newPhoneNumber;
    setUserProfile(newProfile);
    setIsDirty(true);
  };
  const setError = (message: string) => {
    setFlashMessage({ message: message, type: "error" });
  };
  const onSubmit = async () => {
    setIsSubmit(true);
    let _errors: { [key: string]: string | boolean } = {};

    const _setErrors = (e: { [key: string]: string | boolean }) => {
      _errors = e;
    };
    let newFirstName = await frontendValidate(
      ModelValidatorEnum.User,
      FieldValidatorEnum.firstName,
      userProfile?.firstName,
      _errors,
      _setErrors,
      true
    );
    if (
      isFrontendError(
        FieldValidatorEnum.firstName,
        _errors,
        setErrors,
        setError
      )
    )
      return;
    let newLastName = await frontendValidate(
      ModelValidatorEnum.User,
      FieldValidatorEnum.lastName,
      userProfile?.lastName,
      _errors,
      _setErrors,
      true
    );
    if (
      isFrontendError(FieldValidatorEnum.lastName, _errors, setErrors, setError)
    )
      return;
    let newEmail = await frontendValidate(
      ModelValidatorEnum.User,
      FieldValidatorEnum.email,
      userProfile?.email,
      _errors,
      _setErrors,
      true
    );
    if (isFrontendError(FieldValidatorEnum.email, _errors, setErrors, setError))
      return;
    let newPhoneNumber: string =
      userProfile && userProfile.phoneNumber ? userProfile.phoneNumber : "";
    if (newPhoneNumber.length > 3) {
      newPhoneNumber = await frontendValidate(
        ModelValidatorEnum.User,
        FieldValidatorEnum.phoneNumber,
        newPhoneNumber,
        _errors,
        _setErrors,
        true
      );
      if (
        isFrontendError(
          FieldValidatorEnum.phoneNumber,
          _errors,
          setErrors,
          setError
        )
      )
        return;
    } else {
      newPhoneNumber = "";
    }
    var response = await updateProfile(
      newEmail,
      newFirstName,
      newLastName,
      newPhoneNumber,
      userProfile?.avatarUrl?.toString()
    );
    if (isSucc(response)) {
      setFlashMessage({
        message: "Update profile successfully",
        type: "success",
      });
      setIsDirty(false);
    } else {
      setFlashMessage({
        message: (response as FlexlistsError).message,
        type: "error",
      });
      setIsDirty(false);
    }
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      let response = await uploadFile(formData);
      if (isSucc(response) && response.data && response.data.fileId) {
        let newProfile = Object.assign({}, userProfile);
        newProfile.avatarUrl = response.data.fileId;
        setUserProfile(newProfile);
        setIsDirty(true);
      } else {
        setFlashMessage({
          message: (response as FlexlistsError).message,
          type: "error",
        });
      }
    }
  };
  const handleDeleteAvatar = () => {
    let newProfile = Object.assign({}, userProfile);
    newProfile.avatarUrl = "";
    setUserProfile(newProfile);
    setIsDirty(true);
  };
  return userProfile ? (
    <Box mt={4}>
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Avatar
          sx={{
            width: { xs: 88, md: 128 },
            height: { xs: 88, md: 128 },
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            ml: { xs: 0, sm: 2 },
          }}
        >
          <Button component="label" variant="contained">
            Choose File
            <input
              type="file"
              accept={`.jpg,.png,.jpeg`}
              hidden
              onChange={handleFileChange}
            />
          </Button>
          <Button variant="outlined" onClick={handleDeleteAvatar}>
            Delete Avatar
          </Button>
        </Box>
      </Box>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2">First Name</Typography>
          <TextField
            fullWidth
            value={userProfile?.firstName}
            onChange={handleFirstNameChange}
            error={
              isSubmit && isFrontendError(FieldValidatorEnum.firstName, errors)
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2">Last Name</Typography>
          <TextField
            fullWidth
            value={userProfile?.lastName}
            onChange={handleLastNameChange}
            error={
              isSubmit && isFrontendError(FieldValidatorEnum.lastName, errors)
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">Email</Typography>
          <TextField
            fullWidth
            value={userProfile?.email}
            type="email"
            onChange={handleEmailChange}
            error={
              isSubmit && isFrontendError(FieldValidatorEnum.email, errors)
            }
          />
        </Grid>
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
      {/* <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Typography variant="subtitle2">Email</Typography>
          <TextField
            fullWidth
            value={userProfile?.email}
            type="email"
            onChange={handleEmailChange}
            error={
              isSubmit && isFrontendError(FieldValidatorEnum.email, errors)
            }
          />
        </Grid>
      </Grid> */}
      {/* <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Typography variant="subtitle2">Phone Number</Typography>
          <MuiTelInput
            value={userProfile?.phoneNumber}
            onChange={handlePhoneNumberChange}
            defaultCountry="NL"
            fullWidth
          />
        </Grid>
      </Grid> */}
      <Button
        sx={{ mt: 2 }}
        disabled={!isDirty}
        variant="contained"
        onClick={() => {
          onSubmit();
        }}
      >
        Update Settings
      </Button>
    </Box>
  ) : (
    <></>
  );
};
const mapStateToProps = (state: any) => ({
  userProfile: state.user.userProfile,
});

const mapDispatchToProps = {
  setFlashMessage,
  setUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSetting);
