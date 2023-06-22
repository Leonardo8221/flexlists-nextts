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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";
import SocialLogin from "../../sections/auth/SocialLoginButtons";
import LoginIcon from "@mui/icons-material/Login";
// import {MuiTelInput}  from "mui-tel-input";
import { authService } from "../../services/auth.service";
import { useRouter } from "next/router";
import Iconify from "../../components/iconify";
import { FlexlistsError, isSucc } from "src/models/ApiResponse";
import { MuiTelInput } from "mui-tel-input";
import InfoIcon from "@mui/icons-material/Info";
import { PATH_AUTH } from "src/routes/paths";
import { ErrorConsts } from "src/constants/errorConstants";
import { connect } from "react-redux";
import { setMessage } from "src/redux/actions/authAction";


interface RegisterProps {
  message: any;
  setMessage: (message: any) => void;
}
const Register = ({ message, setMessage }: RegisterProps) => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");
  //const [error, setError] = useState<string>();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [termsAndConditions, setTermsAndConditions] = useState<boolean>(false);

  const [flash, setFlash] = useState<{ message: string, type: string } | undefined>(undefined);

  useEffect(() => {
    function checkMessage() {
      if (message?.message) {
        setFlash(message)
      }
    }
    checkMessage()
  }, [message])

  const handleClose = () => {
    setFlash(undefined)
    setMessage(null)
  }
  function setError(message: string) {
    setFlashMessage(message);
  }
  function setFlashMessage(message: string, type: string = 'error') {
    setFlash({ message: message, type: type })
    setMessage({ message: message, type: type })
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
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAndConditions(event.target.checked);
  }



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
        setMessage({ message: "Registration successful! Please check your email to verify your account.", type: "success" })
        router.push({ pathname: PATH_AUTH.verifyEmail, query: { email: userEmail } });
        return;
      }

      setError((response as FlexlistsError).message)
    } catch (error) {
      setError(ErrorConsts.InternalServerError)
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

  return (
    <>
      <Box
        component="img"
        sx={{
          height: "100%",
          width: "100%",
          position: "absolute",
          zIndex: -1,
        }}
        alt="The house from the offer."
        src="/assets/images/background.png"
      />
      <Snackbar open={flash !== undefined} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={flash?.type as AlertColor} sx={{ width: '100%' }}>
          {flash?.message}
        </Alert>
      </Snackbar>
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          rowSpacing={4}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            py: 4,
            px: { xs: 1, md: 4 },
            borderRadius: "4px",
            boxShadow: "0 0 64px 0 rgba(0,0,0,0.1)",
            backgroundColor: "white",
            marginTop: 0,
            maxHeight: "93vh",
            overflow: "auto",
          }}
        >
          <Grid item xs={12} sx={{ paddingTop: "0 !important" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 2,
              }}
            >
              <Link href="/">
                <Box
                  component="img"
                  sx={{
                    width: 60,
                    height: 45,
                    objectFit: "contain",
                    marginTop: "2px",
                  }}
                  alt="Logo"
                  src="/assets/logo_auth.png"
                />
              </Link>
            </Box>
            <Typography variant="h4" textAlign="center">
              Sign Up - Existing User
            </Typography>
            <Typography variant="body1" textAlign="center">
              While before you did not have an account, due to several changes, we now require you to create an
              account. Please click here for more information. Your data is safe and will be taken into the new
              version.
            </Typography>
          </Grid>

          {/* <Grid item container>
            {error && <Alert severity="error">{error}</Alert>}
          </Grid> */}
          <Grid item xs={12}>
            <TextField
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
                        sx={{
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
                        }}
                      >
                        This is the name used for other Flexlists users to find
                        and identify you. If you are a Flexlists member already,
                        this is the user name you used to login to the previous
                        Flexlists version. You can also got to{" "}
                        <Link
                          sx={{
                            color: "#FFD32E",
                            fontWeight: "500",
                            textDecoration: "none",
                          }}
                          href="login"
                        >
                          Login page
                        </Link>{" "}
                        and login with your previous user name and password and
                        we will migrate your previous works.
                      </Typography>
                      <InfoIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item container>
            <Grid item xs={6} sx={{ paddingRight: 1 }}>
              <TextField
                fullWidth
                placeholder="First Name"
                type="text"
                required
                value={firstName}
                onChange={handleFirstNameChange}
              ></TextField>
            </Grid>

            <Grid item xs={6} sx={{ paddingLeft: 1 }}>
              <TextField
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
              defaultCountry="VN"
              sx={{
                width: "100%",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormGroup
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <FormControlLabel
                sx={{ mr: 0, textAlign: { xs: "center", md: "left" } }}
                control={
                  <Checkbox
                    onChange={handleTermsChange}
                    value={termsAndConditions}
                    sx={{
                      color: "#FFD232",
                      "&.Mui-checked": { color: "#FFD232" },
                    }}
                    color="primary"
                  />
                }
                label="I have read and agree to the&nbsp;"
              />

              <Link href="#">Terms and conditions</Link>
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <Button
              href="#"
              size="large"
              variant="contained"
              endIcon={<LoginIcon />}
              sx={{
                width: "100%",
                backgroundColor: "#FFD232",
                color: "#0D0934",
              }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </Grid>
          {/* <SocialLogin /> */}
          <Grid
            item
            xs={12}
            columnSpacing={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                display: "inline",
              }}
            >
              Already have an account?
            </Typography>
            <Link
              href="/auth/loginExisting"
              variant="body1"
              sx={{
                paddingLeft: "4px",
                color: "#0D0934",
              }}
            >
              Sign In
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  message: state.auth.message,
});

const mapDispatchToProps = {
  setMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
