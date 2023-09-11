import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Link,
  Grid,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Snackbar,
  AlertColor,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";
import LoginIcon from "@mui/icons-material/Login";
// import {MuiTelInput}  from "mui-tel-input";
import { authService } from "../../services/auth.service";
import { useRouter } from "next/router";
import Iconify from "../../components/iconify";
import { FlexlistsError, isErr, isSucc } from "src/models/ApiResponse";
import { MuiTelInput } from "mui-tel-input";
import InfoIcon from "@mui/icons-material/Info";
import { PATH_AUTH } from "src/routes/paths";
import { ErrorConsts } from "src/constants/errorConstants";
import { connect } from "react-redux";
import { setMessage } from "src/redux/actions/authAction";
import {
  FieldValidatorEnum,
  ModelValidatorEnum,
  frontendValidate,
  isFrontendError,
} from "src/utils/validatorHelper";
import { GetServerSideProps } from "next";
import { validateToken } from "src/utils/tokenUtils";
import { getTranslations, getTranslation } from "src/utils/i18n";
import { TranslationText } from "src/models/SharedModels";

interface RegisterProps {
  message: any;
  styles?: any;
  translations: TranslationText[];
  setMessage: (message: any) => void;
}
const Register = ({
  message,
  styles,
  translations,
  setMessage
}: RegisterProps) => {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");
  const router = useRouter();

  const [errors, setErrors] = useState<{ [key: string]: string | boolean }>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [termsAndConditions, setTermsAndConditions] = useState<boolean>(false);
  const [isReservedUserName, setIsReservedUserName] = useState<boolean>(false);
  const [flash, setFlash] = useState<
    { message: string; type: string } | undefined
  >(undefined);

  useEffect(() => {
    function checkMessage() {
      if (message?.message) {
        setFlash(message);
      }
    }
    checkMessage();
  }, [message]);

  const handleClose = () => {
    setFlash(undefined);
    setMessage(null);
  };

  const setError = (message: string) => {
    setFlashMessage(message);
  };

  const setFlashMessage = (message: string, type: string = "error") => {
    setFlash({ message: message, type: type });
    setMessage({ message: message, type: type });
  };

  const handlePhoneChange = (newPhoneNumber: string) => {
    setPhoneNumber(newPhoneNumber);
  };

  const handleFirstNameChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
    setIsReservedUserName(false);
  };

  const handleChangePassword = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let _errors: { [key: string]: string | boolean } = {};
    const _setErrors = (e: { [key: string]: string | boolean }) => {
      _errors = e;
    };
    setPassword(event.target.value);
    await frontendValidate(
      ModelValidatorEnum.User,
      FieldValidatorEnum.password,
      event.target.value,
      _errors,
      _setErrors,
      true
    );
    let _error = _errors[FieldValidatorEnum.password];
    if (_error) {
      setPasswordErrorMessage(_error as string);
    } else {
      setPasswordErrorMessage("");
    }
  };

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAndConditions(event.target.checked);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmit(true);
      let _errors: { [key: string]: string | boolean } = {};

      const _setErrors = (e: { [key: string]: string | boolean }) => {
        _errors = e;
      };
      let newFirstName = await frontendValidate(
        ModelValidatorEnum.User,
        FieldValidatorEnum.firstName,
        firstName,
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
        lastName,
        _errors,
        _setErrors,
        true
      );
      if (
        isFrontendError(
          FieldValidatorEnum.lastName,
          _errors,
          setErrors,
          setError
        )
      )
        return;
      let newUserName = await frontendValidate(
        ModelValidatorEnum.User,
        FieldValidatorEnum.userName,
        userName,
        _errors,
        _setErrors,
        true
      );
      if (
        isFrontendError(
          FieldValidatorEnum.userName,
          _errors,
          setErrors,
          setError
        )
      )
        return;
      let newEmail = await frontendValidate(
        ModelValidatorEnum.User,
        FieldValidatorEnum.email,
        userEmail,
        _errors,
        _setErrors,
        true
      );
      if (
        isFrontendError(FieldValidatorEnum.email, _errors, setErrors, setError)
      )
        return;
      let newPassword = await frontendValidate(
        ModelValidatorEnum.User,
        FieldValidatorEnum.password,
        password,
        _errors,
        _setErrors,
        true
      );
      if (
        isFrontendError(
          FieldValidatorEnum.password,
          _errors,
          setErrors,
          setError
        )
      )
        return;
      let newPhoneNumber: string = phoneNumber;
      if (phoneNumber.length > 3) {
        newPhoneNumber = await frontendValidate(
          ModelValidatorEnum.User,
          FieldValidatorEnum.phoneNumber,
          phoneNumber,
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

      if (!termsAndConditions) {
        setError("Please accept terms and conditions");
        return;
      }

      var response = await authService.register(
        newFirstName,
        newLastName,
        newUserName,
        newEmail,
        newPhoneNumber.length > 3 ? phoneNumber : "",
        newPassword,
        termsAndConditions
      );

      if (isSucc(response) && response) {
        setMessage({
          message:
            "Registration successful! Please check your email to verify your account.",
          type: "success",
        });
        await router.push({
          pathname: PATH_AUTH.verifyEmail,
          query: { email: userEmail },
        });
        return;
      }

      // this should already be fine coming from the backend, but this is just a lot clearer for
      // the actual flow
      if (isErr(response)) {
        if ((response as FlexlistsError).code === 514) {
          //UserNameAlreadyExists
          setError("User name already taken. Please try another one.");
          return;
        }
        if ((response as FlexlistsError).code === 515) {
          //UserEmailAlreadyExists
          setError("Email is already taken. Please try another one.");
          return;
        }
        if ((response as FlexlistsError).code === 511) {
          // ReservedUserName
          setIsReservedUserName(true);
          return;
        }
      }

      setError((response as FlexlistsError).message);
    } catch (error) {
      console.log(error);
      setError(ErrorConsts.InternalServerError);
      console.log(error);
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };
  
  styles = {
    body: {
      background:
        "linear-gradient(45deg, hsl(219deg 41% 13%) 0%, hsl(213deg 41% 19%) 50%, hsl(212deg 40% 24%) 100%)",
      overflow: "hidden",
    },
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: { xs: "column-reverse", md: "row" },
      alignItems: "center",
      justifyContent: "center",
      px: { xs: 0, sm: 0, md: 0 },
    },

    leftBox: {
      width: { xs: "100%", md: "50%" },
      position: "relative",
      minHeight: { md: "100vh" },
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 4,
      alignItems: "center",
      textAlign: { xs: "center", md: "left" },
      color: theme.palette.palette_style.text.white,
      py: { xs: 4, md: 0 },
      px: { xs: 0, md: 4 },
    },

    loginIllustration: {
      width: 250,
      height: 250,
      objectFit: "contain",
    },

    rightBox: {
      width: { xs: "100%", md: "50%" },
      minHeight: { md: "100vh" },
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      textAlign: "center",
      position: "relative",
      backgroundColor: "#fff",
      "&::after": {
        position: "absolute",
        content: '" "',
        height: "100%",
        width: "250px",
        right: 0,
        backgroundColor: "#fff",
        transform: "translateX(250px)",
        display: { xs: "none", md: "block" },
      },
    },

    circleEffect: {
      width: 400,
      height: 400,
      borderRadius: 400,
      background: "linear-gradient(#9bf8f4, #ffeda0, #fa9372)",
      position: "absolute",
      top: "40px",
      left: { xs: "100px", md: "400px" },
      opacity: 0.2,
      zIndex: 1,
      filter: "blur(100px)",
      transform: "translate3d(0, 0, 0)",
    },
    rightBoxGrid: {
      py: 4,
      px: { xs: 1, md: 4 },
      boxShadow: "none !important",
      marginTop: 0,
      overflow: "auto",
      zIndex: 2,
    },
    FormLogoWrapper: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 2,
    },
    FormLogo: {
      width: 60,
      height: 45,
      objectFit: "contain",
      marginTop: "2px",
    },
    textField: {
      "& .MuiInputBase-root": {
        backgroundColor: "#fcfeff",
        border: "none",
        color: "#666",
        boxShadow: "-4px 0 12px 0 rgba(0,0,0,0.1)",
      },

      "& ::placeholder": {
        color: "#ccc",
      },

      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          // border: "none",
        },
      },
    },
    loginExisting: {
      display: isHovered ? "block" : "none",
      background: "#222",
      color: "#fff",
      position: "absolute",
      right: 0,
      width: "250px",
      whiteSpace: "initial",
      textAlign: "left",
      p: 1,
      px: 2,
      zIndex: 10,
    },

    formActionsWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    termsAndConditions: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: { xs: "center", md: "flex-start" },
    },
    checkboxLabel: {
      mr: 0,
      textAlign: { xs: "center", md: "left" },
    },
    checkbox: {
      color: theme.palette.palette_style.primary.main,
      "&.Mui-checked": { color: theme.palette.palette_style.primary.main },
    },
    forgotPassword: {
      color: theme.palette.palette_style.primary.main,
      textDecoration: "none",
      "&:hover": { textDecoration: "underline" },
    },
    button: {
      backgroundColor: theme.palette.palette_style.primary.main,
      width: "100%",
    },

    signInWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    link: {
      color: theme.palette.palette_style.text.selected,
      textDecoration: "none",
      "&:hover": { textDecoration: "underline" },
    },
  };

  return (
    <>
      <Snackbar
        open={flash !== undefined}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={flash?.type as AlertColor}
          sx={{ width: "100%" }}
        >
          {flash?.message}
        </Alert>
      </Snackbar>
      <Box sx={styles?.body} onKeyDown={handleKeyDown}>
        <Container maxWidth="xl" sx={styles?.container}>
          <Box sx={styles?.leftBox}>
            <Typography variant="h3">
              {t("Title")}
            </Typography>
            <Typography variant="body1">
              {t("Description")}
            </Typography>
          </Box>
          <Box sx={styles?.rightBox}>
            <Box sx={styles?.circleEffect}></Box>
            <Grid container rowSpacing={4} sx={styles?.rightBoxGrid}>
              <Grid item xs={12} sx={{ paddingTop: "0 !important" }}>
                <Box sx={styles?.FormLogoWrapper}>
                  <Link href="/">
                    <Box
                      component="img"
                      sx={styles?.FormLogo}
                      alt="Logo"
                      src="/assets/logo.png"
                    />
                  </Link>
                </Box>
                <Typography variant="h3" textAlign="center" color={"#141E30"}>
                  {t("Register Subject")}
                </Typography>
              </Grid>

              {/* <Grid item container>
            {error && <Alert severity="error">{error}</Alert>}
          </Grid> */}
              {isReservedUserName && (
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="body2" component={"div"}>
                      {t("UserName Already Existed")}{" "}
                      <Link sx={styles?.link} href="/auth/loginExisting">
                        {t("Login")}
                      </Link>{" "}
                      {t("To Login")}
                    </Typography>
                  </Box>
                </Grid>
              )}
              <Grid item container columnSpacing={2}>
                <Grid item xs={6}>
                  <TextField
                    sx={styles?.textField}
                    fullWidth
                    placeholder={t("First Name")}
                    type="text"
                    required
                    value={firstName}
                    onChange={handleFirstNameChange}
                    error={
                      isSubmit &&
                      isFrontendError(FieldValidatorEnum.firstName, errors)
                    }
                  ></TextField>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    sx={styles?.textField}
                    fullWidth
                    placeholder={t("Last Name")}
                    type="text"
                    required
                    value={lastName}
                    onChange={handleLastNameChange}
                    error={
                      isSubmit &&
                      isFrontendError(FieldValidatorEnum.lastName, errors)
                    }
                  ></TextField>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={styles?.textField}
                  fullWidth
                  placeholder={t("Username")}
                  type="text"
                  required
                  value={userName}
                  onChange={handleChangeUserName}
                  error={
                    isSubmit &&
                    isFrontendError(FieldValidatorEnum.userName, errors)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        position="end"
                      >
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          <Typography
                            variant="body2"
                            component={"div"}
                            sx={styles?.loginExisting}
                          >
                            {t("Name Used For Other")}{" "}
                            <Link sx={styles?.link} href="login">
                              {t("Login Page")}
                            </Link>{" "}
                            {t("And Login With Previous")}
                          </Typography>
                          <InfoIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  sx={styles?.textField}
                  fullWidth
                  placeholder={t("Email")}
                  type="email"
                  required
                  value={userEmail}
                  onChange={handleEmailChange}
                  error={
                    isSubmit &&
                    isFrontendError(FieldValidatorEnum.email, errors)
                  }
                ></TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  sx={styles?.textField}
                  fullWidth
                  placeholder={t("Password")}
                  required
                  value={password}
                  onChange={handleChangePassword}
                  type={showPassword ? "text" : "password"}
                  error={
                    isSubmit &&
                    isFrontendError(FieldValidatorEnum.password, errors)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          <Iconify
                            icon={
                              showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
                {passwordErrorMessage && (
                  <Typography
                    id="modal-modal-title"
                    variant="subtitle2"
                    component="span"
                    sx={{ textAlign: "right" }}
                  >
                    {passwordErrorMessage}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <MuiTelInput
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  defaultCountry="NL"
                  sx={{ ...styles?.textField, ...{ width: "100%" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormGroup sx={styles?.termsAndConditions}>
                  <FormControlLabel
                    sx={styles?.checkboxLabel}
                    control={
                      <Checkbox
                        onChange={handleTermsChange}
                        value={termsAndConditions}
                        sx={styles?.checkbox}
                        color="primary"
                      />
                    }
                    label={t("I Have Read")}
                  />

                  <Link sx={styles?.link} href="#">
                    &nbsp;{t("Terms Conditions")}
                  </Link>
                </FormGroup>
              </Grid>

              <Grid item xs={12}>
                <Button
                  href="#"
                  size="large"
                  variant="contained"
                  endIcon={<LoginIcon />}
                  sx={styles?.button}
                  onClick={handleSubmit}
                >
                  {t("Register Subject")}
                </Button>
              </Grid>
              {/* <SocialLogin /> */}
              <Grid item xs={12}>
                <Divider light sx={{ my: 2 }}></Divider>
              </Grid>
              <Grid item xs={12} columnSpacing={1} sx={styles?.signInWrapper}>
                <Typography variant="body1">
                  {t("Already Have")}{" "}
                  <Link href="/auth/login" variant="body1" sx={styles?.link}>
                    {t("Login Subject")}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  message: state.auth.message,
});

const mapDispatchToProps = {
  setMessage,
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const verifyToken = await validateToken(context);

  if(verifyToken){
    return verifyToken;
  }

  return await getTranslations("register", context);
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
