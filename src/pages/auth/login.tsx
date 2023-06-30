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
import { FlexlistsError, isErr, isSucc } from "src/models/ApiResponse";
import { PATH_AUTH, PATH_MAIN } from "src/routes/paths";
import { setMessage } from "src/redux/actions/authAction";
import { connect } from "react-redux";

interface LoginProps {
  message: any;
  setMessage: (message: any) => void;
  styles?: any;
}

const Login = ({ message, setMessage, styles }: LoginProps) => {
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
      var response = await authService.login(userName, password);
      if (isSucc(response)) {
        // check if this user is a legacy user ;
        if (response.data.legacyUser && !response.data.wasMigrated) {
          setMessage({
            message:
              "Your lists are still migrating, please wait for this process to complete.",
            type: "warning",
          });
          await router.push({ pathname: PATH_MAIN.migratedLists });
          return;
        }

        setMessage({
          message: "Login successful, going to your Dashboard!",
          type: "success",
        });
        await router.push({ pathname: PATH_MAIN.views });
        return;
      }
      if (
        isErr(response) &&
        (response as FlexlistsError).code === 512 &&
        (response as FlexlistsError).data?.email
      ) {
        setMessage({
          message:
            "Your account is not activated. Please check your email for an activation link or request a new one.",
          type: "error",
        });
        await router.push({
          pathname: PATH_AUTH.resendEmailVerification,
          query: { email: (response as FlexlistsError).data.email },
        });
        return;
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
    rightBoxGrid: {
      py: 4,
      px: { xs: 1, md: 4 },
      boxShadow: "none !important",
      marginTop: 0,
      overflow: "auto",
      zIndex: 2,
    },
    FormLogo: {
      width: 60,
      height: 45,
      objectFit: "contain",
      marginTop: "2px",
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

            <Box
              component="img"
              sx={styles?.loginIllustration}
              alt="Logo"
              src="/assets/illustrations/illustration_login.png"
            />
          </Box>
          <Box sx={styles?.rightBox}>
            <Grid container rowSpacing={4} sx={styles?.rightBoxGrid}>
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
                      sx={styles?.FormLogo}
                      alt="Logo"
                      src="/assets/logo.png"
                    />
                  </Link>
                </Box>
                <Typography variant="h3" textAlign="center" color={"#141E30"}>
                  Sign in
                </Typography>
              </Grid>

              {/* <Grid
            item
            container
          >
            {error && <Alert severity="error">{error}</Alert>}
          </Grid> */}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder="Email or Username"
                  type="text"
                  required
                  value={userName}
                  onChange={handleChangeEmail}
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

              <Grid item xs={12} sx={styles?.formActionsWrapper}>
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
                  Sign in
                </Button>
              </Grid>

              {/* <SocialLogin /> */}

              <Grid item xs={12}>
                <Divider light sx={{ my: 2 }}></Divider>
              </Grid>

              <Grid item xs={12} columnSpacing={1} sx={styles?.signUpWrapper}>
                <Typography variant="body1">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/register" variant="body1" sx={styles?.link}>
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
});

const mapDispatchToProps = {
  setMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
