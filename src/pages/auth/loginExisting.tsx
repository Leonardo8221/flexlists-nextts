import {
  Container,
  Typography,
  Link,
  Grid,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  Alert,
  Box,
  Snackbar,
  AlertColor,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";
import SocialLogin from "../../sections/auth/SocialLoginButtons";
import LoginIcon from "@mui/icons-material/Login";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authService } from "../../services/auth.service";
import Iconify from "../../components/iconify";
import { isSucc } from "src/models/ApiResponse";
import { PATH_AUTH, PATH_MAIN } from "src/routes/paths";
import {
  LegacyCredentials,
  setLegacyCredentials,
  setMessage,
} from "src/redux/actions/authAction";
import { connect } from "react-redux";
import { styled } from "@mui/material/styles";

const CustomTextField = styled(TextField)(({ theme }) => ({
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
}));

interface LoginProps {
  message: any;
  styles?: any;
  legacyCredentials: LegacyCredentials;
  setMessage: (message: any) => void;
  setLegacyCredentials: (credentials: LegacyCredentials) => void;
}

const Login = ({
  styles,
  message,
  legacyCredentials,
  setMessage,
  setLegacyCredentials,
}: LoginProps) => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");
  const router = useRouter();
  //const [error, setError] = useState<string>();
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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

  function setError(message: string) {
    setFlashMessage(message);
  }
  function setFlashMessage(message: string, type: string = "error") {
    setFlash({ message: message, type: type });
    setMessage({ message: message, type: type });
  }
  const handleClose = () => {
    setFlash(undefined);
    setMessage(null);
  };

  const handleSubmit = async () => {
    try {
      if (!userName) {
        setError("User Name required");
        return;
      }
      if (!password) {
        setError("Password required");
        return;
      }
      var response = await authService.loginExisting(userName, password);
      if (isSucc(response)) {
        if (response.data.wasMigrated) {
          setMessage({
            message:
              "Your account was already migrated, please login via the regular login.",
            type: "success",
          });
          await router.push({ pathname: PATH_AUTH.login });
          return;
        } else {
          setLegacyCredentials({
            lists: response.data.lists,
            username: userName,
            password: password,
            legacyId: response.data.user.userId,
            session: response.data.session,
            email: response.data.user.email,
          });
          setMessage({
            message: "Login successful, please sign up for the new Flexlists!",
            type: "success",
          });
          await router.push({ pathname: PATH_AUTH.registerExisting });
          return;
        }
      }
      setError(
        "Invalid username or password. Please try again or request a new password."
      );
    } catch (error: any) {
      console.log(error);
      setError("Unknown error. Please try again.");
    }
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
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
      alignItems: "center",
      textAlign: { xs: "center", md: "left" },
    },

    leftBoxGrid: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      pr: { xs: 0, md: 4 },
      py: { xs: 4, md: 0 },
      zIndex: 5,
    },
    circleEffect: {
      width: 400,
      height: 400,
      borderRadius: 400,
      background: "linear-gradient(#9bf8f4, #ffeda0, #fa9372)",
      position: "absolute",
      top: "40px",
      left: { xs: "100px", md: "400px" },
      opacity: 0.4,
      zIndex: 1,
      filter: "blur(100px)",
      transform: "translate3d(0, 0, 0)"
    },
    logoWrapper: {
      display: "flex",
      justifyContent: "center",
      my: { xs: 2, md: 0 },
      position: { xs: "relative", md: "absolute" },
      top: { xs: 0, md: 48 },
      left: 0,
    },
    logoImg: {
      width: 60,
      height: 45,
      objectFit: "contain",
    },
    link: {
      color: theme.palette.palette_style.text.selected,
      textDecoration: "none",
      "&:hover": { textDecoration: "underline" },
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
    rightBoxGrid: {
      py: 4,
      px: { xs: 1, md: 4 },
      boxShadow: "none !important",
      marginTop: 0,
      overflow: "auto",
      zIndex: 2,
    },
    formActionsWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
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
    signUpWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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
            <Grid container sx={styles?.leftBoxGrid}>
              <Box
                sx={{
                  ...styles?.circleEffect,
                  ...{
                    top: { xs: "100px", md: "820px" },
                    left: { xs: "-100px", md: "0" },
                    background: "#103783",
                  },
                }}
              ></Box>
              <Box sx={styles?.logoWrapper}>
                <Link href="/">
                  <Box
                    component="img"
                    sx={styles?.logoImg}
                    alt="Logo"
                    src="/assets/logo_dark.png"
                  />
                </Link>
              </Box>
              <Box
                sx={{
                  zIndex: 5,
                }}
              >
                <Typography variant="body1" color={"white"}>
                  This is the sign in for existing Flexlists users; after
                  logging in, your lists will be migrated to the new system and
                  you can continue working. <br />
                  If you already logged in before in the new version, please
                  Sign in{" "}
                  <Link sx={styles?.link} href="/auth/login">
                    here
                  </Link>
                  .
                </Typography>
                <br />
                <br />
                <Typography variant="body1" color={"white"}>
                  If you need a lot of text you can add there and of course
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Necessitatibus quia error sunt aperiam voluptas illum aut, eum
                  soluta, voluptate sint delectus. Animi omnis, reiciendis
                  dolores inventore sit deleniti aliquid! Adipisci earum quidem
                  iure exercitationem debitis amet modi dignissimos, sit
                  quibusdam similique, odio labore repellat, facilis nobis
                  aliquam. Quia nisi distinctio optio inventore dolorum
                  excepturi debitis, exercitationem commodi? Dignissimos quia
                  sit atque, odio nobis distinctio magnam sequi omnis veniam
                  numquam quo, excepturi est eos aspernatur magni autem
                  similique itaque ut quas labore explicabo! Saepe facilis
                  laborum eveniet voluptas repellendus culpa libero, nulla ipsam
                  consequuntur mollitia soluta, beatae optio neque veniam iure?
                </Typography>
              </Box>
            </Grid>
          </Box>

          <Box sx={styles?.rightBox}>
            <Box sx={styles?.circleEffect}></Box>
            <Grid container rowSpacing={3} sx={styles?.rightBoxGrid}>
              <Grid item xs={12} sx={{ paddingTop: "0 !important" }}>
                <Typography variant="h3" gutterBottom color={"#141E30"}>
                  Sign in - Existing User
                </Typography>
                <Typography variant="caption" color={"#666"}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Delectus, iure.
                </Typography>
              </Grid>

              {/* <Grid
            item
            container
          >
            {error && <Alert severity="error">{error}</Alert>}
          </Grid> */}

              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  placeholder="Current Flexlists Username"
                  type="text"
                  required
                  value={userName}
                  onChange={handleChangeEmail}
                ></CustomTextField>
              </Grid>

              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  placeholder="Current Flexlists Password"
                  required
                  variant="outlined"
                  value={password}
                  onChange={handleChangePassword}
                  type={showPassword ? "text" : "password"}
                  inputProps={{
                    color: theme.palette.palette_style.primary.main,
                  }}
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
                ></CustomTextField>
              </Grid>

              <Grid item sx={styles?.formActionsWrapper} xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked sx={styles?.checkbox} />}
                    label="Remember me"
                  />
                </FormGroup>
                <Link
                  href="/auth/forgotPassword"
                  variant="body1"
                  sx={styles?.forgotPassword}
                >
                  Forgot password?
                </Link>
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
                  Sign in - Existing User
                </Button>
              </Grid>

              {/* <SocialLogin /> */}

              <Grid item xs={12}>
                <Divider light sx={{ my: 2 }}></Divider>
              </Grid>

              <Grid item xs={12} columnSpacing={1} sx={styles?.signUpWrapper}>
                <Typography variant="body1">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/auth/registerExisting"
                    variant="body1"
                    sx={styles?.link}
                  >
                    Sign Up
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
  legacyCredentials: state.auth.legacyCredentials,
});

const mapDispatchToProps = {
  setMessage,
  setLegacyCredentials,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
