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
import {
  PATH_ADMIN,
  PATH_AUTH,
  PATH_MAIN,
  getRolePathDefault,
} from "src/routes/paths";
import { setMessage } from "src/redux/actions/authAction";
import { connect } from "react-redux";
import { SystemRole } from "src/enums/SystemRole";
import { GetServerSideProps } from "next";
import { validateToken } from "src/utils/tokenUtils";
import { getTranslations, getTranslation } from "src/utils/i18n";
import { TranslationText } from "src/models/SharedModels";
import { setReturnUrl } from "src/redux/actions/adminAction";
import Head from 'next/head';
import LoadingPage from "../LoadingPage";

interface LoginProps {
  message: any;
  styles?: any;
  returnUrl:any;
  translations: TranslationText[];
  setMessage: (message: any) => void;
  setReturnUrl:(returnUrl:any)=>void;
}

const Login = ({
  message,
  styles,
  returnUrl,
  translations,
  setMessage,
  setReturnUrl
}: LoginProps) => {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [flash, setFlash] = useState<
    { message: string; type: string } | undefined
  >(undefined);

  //logout if user go to login page
  useEffect(() => {
    async function initialize() {
      await authService.logout();
    }
    if (router.isReady) {
      initialize();
    }
  }, [router.isReady]);

  useEffect(() => {
    function checkMessage() {
      if (message?.message) {
        setFlash(message);
      }
    }
    checkMessage();
  }, [message]);

  const setError = (message: string) => {
    setFlashMessage(message);
  };

  const setFlashMessage = (message: string, type: string = "error") => {
    setFlash({ message: message, type: type });
    setMessage({ message: message, type: type });
  };

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
        if(returnUrl){
          setReturnUrl(undefined)
          await router.push(returnUrl);
          return;
        }
        else
        {
          await router.push({
            pathname: getRolePathDefault(response.data.systemRole),
          });
        }

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
      px: { xs: 1, md: 8 },
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
    <LoadingPage>
      <Head>
        <title>{t("Page Title")}</title>
        <meta name="description" content={t("Meta Description")} />
        <meta name="keywords" content={t("Meta Keywords")} />
      </Head>
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
              {t("Title")}
            </Typography>
            <Typography variant="body1">
              {t("Description")}
            </Typography>

            <Box
              component="img"
              sx={styles?.loginIllustration}
              alt="Logo"
              src="/assets/illustrations/illustration_login.png"
            />
          </Box>
          <Box sx={styles?.rightBox} onKeyDown={handleKeyDown}>
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
                  {t("Login Subject")}
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
                  sx={styles?.textField}
                  fullWidth
                  placeholder={t("Email Username")}
                  type="text"
                  required
                  value={userName}
                  onChange={handleChangeEmail}
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
                    label={t("Remember Me")}
                  />
                </FormGroup>

                <Link
                  href="/auth/forgotPassword"
                  variant="body1"
                  sx={styles?.forgotPassword}
                >
                  {t("Forgot Password")}
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
                  {t("Login Subject")}
                </Button>
              </Grid>

              {/* <SocialLogin /> */}

              <Grid item xs={12}>
                <Divider light sx={{ my: 2 }}></Divider>
              </Grid>

              <Grid item xs={12} columnSpacing={1} sx={styles?.signUpWrapper}>
                <Typography variant="body1">
                  {t("Don't Have Account")}{" "}
                  <Link href="/auth/register" variant="body1" sx={styles?.link}>
                    {t("Register Subject")}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </LoadingPage>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const verifyToken = await validateToken(context);

  if(verifyToken){
    return verifyToken;
  }

  return await getTranslations("register", context);
};

const mapStateToProps = (state: any) => ({
  message: state.auth.message,
  returnUrl:state.admin.returnUrl
});

const mapDispatchToProps = {
  setMessage,
  setReturnUrl
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
