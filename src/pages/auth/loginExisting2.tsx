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
    backgroundColor: "transparent",
    color: "#fff",
  },
  "& .MuiInputBase-root::placeholder": {
    color: "red", // Change the color to your desired value
  },
}));

const placeholderColor = {
  color: "red",
};

interface LoginProps {
  message: any;
  legacyCredentials: LegacyCredentials;
  setMessage: (message: any) => void;
  setLegacyCredentials: (credentials: LegacyCredentials) => void;
}

const Login = ({
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
      <Box sx={{ backgroundColor: "#112233", overflowY: "hidden" }}>
        <Container
          maxWidth="xl"
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "50%",
              position: "relative",
              minHeight: "100vh",
              display: "grid",
              placeContent: "center",
              zIndex: 1,
            }}
          >
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pr: 4,
              }}
            >
              <Box
                sx={{
                  width: 400,
                  height: 400,
                  borderRadius: 400,
                  backgroundColor: "skyblue",
                  position: "absolute",
                  top: "40px",
                  left: "150%",
                  opacity: ".1",
                  zIndex: 1,
                }}
              ></Box>
              <Box
                sx={{
                  width: 400,
                  height: 400,
                  borderRadius: 400,
                  backgroundColor: "skyblue",
                  position: "absolute",
                  top: "820px",
                  left: "0",
                  opacity: ".2",
                  zIndex: 1,
                }}
              ></Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 2,
                  position: "absolute",
                  top: 48,
                  left: 0,
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
                    src="/assets/logo_dark.png"
                  />
                </Link>
              </Box>
              <Typography variant="body1" color={"white"}>
                This is the sign in for existing Flexlists users; after logging
                in, your lists will be migrated to the new system and you can
                continue working. <br />
                If you already logged in before in the new version, please Sign
                in{" "}
                <Link
                  sx={{
                    color: "#54A6FB",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  href="/auth/login"
                >
                  here
                </Link>
                .
              </Typography>
              <br />
              <br />
              <Typography variant="body1" color={"white"}>
                If you need a lot of text you can add there and of course Lorem
                ipsum dolor sit, amet consectetur adipisicing elit.
                Necessitatibus quia error sunt aperiam voluptas illum aut, eum
                soluta, voluptate sint delectus. Animi omnis, reiciendis dolores
                inventore sit deleniti aliquid! Adipisci earum quidem iure
                exercitationem debitis amet modi dignissimos, sit quibusdam
                similique, odio labore repellat, facilis nobis aliquam. Quia
                nisi distinctio optio inventore dolorum excepturi debitis,
                exercitationem commodi? Dignissimos quia sit atque, odio nobis
                distinctio magnam sequi omnis veniam numquam quo, excepturi est
                eos aspernatur magni autem similique itaque ut quas labore
                explicabo! Saepe facilis laborum eveniet voluptas repellendus
                culpa libero, nulla ipsam consequuntur mollitia soluta, beatae
                optio neque veniam iure?
              </Typography>
            </Grid>
          </Box>

          <Box sx={{ width: "50%", zIndex: 5 }}>
            <Grid
              container
              rowSpacing={1}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: 4,
                px: { xs: 1, md: 4 },
                boxShadow: "none !important",
                backgroundColor: "rgba(255,255,255,.2)",
                color: "#fff !important",
                marginTop: 0,
                overflow: "auto",
                zIndex: 10,
                borderRadius: 2,
                backdropFilter: "blur(100px)",
              }}
            >
              <Grid item xs={12} sx={{ paddingTop: "0 !important" }}>
                <Typography variant="h3" gutterBottom textAlign="center">
                  Sign in - Existing User
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
                ></CustomTextField>
              </Grid>

              <Grid item xs={6}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        sx={{
                          color: "#54A6FB",
                          "&.Mui-checked": { color: "#54A6FB" },
                        }}
                      />
                    }
                    label="Remember me"
                  />
                </FormGroup>
              </Grid>

              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Link
                  href="/auth/forgotPassword"
                  variant="body1"
                  sx={{
                    color: "#54A6FB",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
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
                  sx={{
                    width: "100%",
                    backgroundColor: "#54A6FB",
                    color: "#0D0934",
                  }}
                  onClick={handleSubmit}
                >
                  Sign in - Existing User
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
                  mt: 4,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    display: "inline",
                  }}
                >
                  Don&apos;t have an account?
                </Typography>
                <Link
                  href="/auth/registerExisting"
                  variant="body1"
                  sx={{
                    paddingLeft: "4px",
                    color: "#54A6FB",

                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Sign Up
                </Link>
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
