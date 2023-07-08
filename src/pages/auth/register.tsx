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
import SocialLogin from "../../sections/auth/SocialLoginButtons";
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

interface RegisterProps {
  message: any;
  setMessage: (message: any) => void;
  styles?: any;
}
const Register = ({ message, setMessage, styles }: RegisterProps) => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");
  //const [error, setError] = useState<string>();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [termsAndConditions, setTermsAndConditions] = useState<boolean>(false);
  const [isReservedUserName, setIsReservedUserName] = useState<boolean>(false)
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
  function setError(message: string) {
    setFlashMessage(message);
  }
  function setFlashMessage(message: string, type: string = "error") {
    setFlash({ message: message, type: type });
    setMessage({ message: message, type: type });
  }

  const handlePhoneChange = (newPhoneNumber: string) => {
    setPhoneNumber(newPhoneNumber);
  };

  const handleFirstNameChange = (
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

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAndConditions(event.target.checked);
  };

  const handleSubmit = async () => {
    try {
      if (!firstName) {
        setError("First Name required");
        return;
      }
      if (!lastName) {
        setError("Last Name required");
        return;
      }
      if (!userName) {
        setError("User Name required");
        return;
      }
      if (!userEmail) {
        setError("Email required");
        return;
      }
      if (!password) {
        setError("Password required");
        return;
      }

      if (!termsAndConditions) {
        setError("Please accept terms and conditions");
        return;
      }

      var response = await authService.register(
        firstName,
        lastName,
        userName,
        userEmail,
        phoneNumber,
        password,
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

  styles = {
    body: {
      background:
        "linear-gradient(45deg, hsl(219deg 41% 13%) 0%, hsl(213deg 41% 19%) 50%, hsl(212deg 40% 24%) 100%)",
      overflow: "hidden",
    },
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
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
          border: "none",
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
      <Box sx={styles?.body}>
        <Container maxWidth="xl" sx={styles?.container}>
          <Box sx={styles?.leftBox}>
            <Typography variant="h3">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </Typography>
            <Typography variant="body1">
              If you need a lot of text you can add there and of course Lorem
              ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus
              quia error sunt aperiam voluptas illum aut, eum soluta, voluptate
              sint delectus.
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
                  Sign up
                </Typography>
              </Grid>

              {/* <Grid item container>
            {error && <Alert severity="error">{error}</Alert>}
          </Grid> */}
          {
            isReservedUserName && <Grid item xs={12}>
            <Box>
                <Typography
                        variant="body2"
                        component={"div"}
                      >
                        User name already existed in previous version. please pick another or 
                        click <Link sx={styles?.link} href="/auth/loginExisting">
                          Login
                        </Link> to login to an existing account
                      </Typography>
                </Box>
          </Grid>
          }
              <Grid item container columnSpacing={2}>
                <Grid item xs={6}>
                  <TextField
                    sx={styles?.textField}
                    fullWidth
                    placeholder="First Name"
                    type="text"
                    required
                    value={firstName}
                    onChange={handleFirstNameChange}
                  ></TextField>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    sx={styles?.textField}
                    fullWidth
                    placeholder="Last Name"
                    type="text"
                    required
                    value={lastName}
                    onChange={handleLastNameChange}
                  ></TextField>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={styles?.textField}
                  fullWidth
                  placeholder="Username"
                  type="text"
                  required
                  value={userName}
                  onChange={handleChangeUserName}
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
                            This is the name used for other Flexlists users to
                            find and identify you. If you are a Flexlists member
                            already, this is the user name you used to login to
                            the previous Flexlists version. You can also got to{" "}
                            <Link sx={styles?.link} href="login">
                              Login page
                            </Link>{" "}
                            and login with your previous user name and password
                            and we will migrate your previous works.
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
                  placeholder="Email"
                  type="email"
                  required
                  value={userEmail}
                  onChange={handleEmailChange}
                ></TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  sx={styles?.textField}
                  fullWidth
                  placeholder="Password"
                  required
                  value={password}
                  onChange={handleChangePassword}
                  type={showPassword ? "text" : "password"}
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
                    label="I have read and agree to the&nbsp;"
                  />

                  <Link sx={styles?.link} href="#">
                    Terms and conditions
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
                  Sign Up
                </Button>
              </Grid>
              {/* <SocialLogin /> */}
              <Grid item xs={12}>
                <Divider light sx={{ my: 2 }}></Divider>
              </Grid>
              <Grid item xs={12} columnSpacing={1} sx={styles?.signInWrapper}>
                <Typography variant="body1">
                  Already have an account?{" "}
                  <Link href="/auth/login" variant="body1" sx={styles?.link}>
                    Sign In
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
