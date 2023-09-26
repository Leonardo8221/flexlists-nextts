import React, { useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Alert,
  Snackbar,
  AlertColor,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authService } from "src/services/auth.service";
import { isSucc } from "src/models/ApiResponse";
import { useRouter } from "next/router";
import { PATH_AUTH } from "src/routes/paths";
import { setMessage } from "src/redux/actions/authAction";
import { connect } from "react-redux";
import Iconify from "../../components/iconify";
import { useTheme } from "@mui/material";
import { GetServerSideProps } from "next";
import { validateToken } from "src/utils/tokenUtils";
import { getTranslations, getTranslation } from "src/utils/i18n";
import { TranslationText } from "src/models/SharedModels";
import LoadingPage from "../LoadingPage";

// const theme = createTheme({
//   components: {
//     MuiInputBase: {
//       styleOverrides: {
//         root: {
//           height: "56px !important",
//           width: "40px !important",

//           "& input": {
//             textAlign: "center",
//             fontWeight: "600",
//             fontSize: 24,
//           },
//         },
//       },
//     },
//   },
// });

interface VerifyEmailProps {
  message: any;
  styles?: any;
  translations: TranslationText[];
  setMessage: (message: any) => void;
}

const VerifyEmail = ({
  message,
  styles,
  translations,
  setMessage
}: VerifyEmailProps) => {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const router = useRouter();
  const theme = useTheme();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [canSubmit, setCanSubmit] = React.useState(false);
  const [token, setToken] = React.useState<string>("      ");
  const [flash, setFlash] = React.useState<
    { message: string; type: string } | undefined
  >(undefined);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState(false);

  useEffect(() => {
    function checkMessage() {
      if (message?.message) {
        setFlash(message);
      }
    }
    checkMessage();
  }, [message]);

  const setFlashMessage = (message: string, type: string = "error") => {
    setFlash({ message: message, type: type });
    setMessage({ message: message, type: type });
  };

  useEffect(() => {
    function routerCheck() {
      if (router.query.email) {
        setEmail(router.query.email as string);
      }
    }
    routerCheck();
  });

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputValue = event.target.value;
    const input = inputRefs.current[index];
    if (isNaN(parseInt(inputValue))) {
      input!.value = "";
      return;
    }
    if (inputValue.length <= 1) {
      if (input) {
        input.value = inputValue;
        if (inputValue.length === 1) {
          input.blur(); // Remove focus from the current input
          const nextInput = inputRefs.current[index + 1];
          if (nextInput) {
            nextInput.focus(); // Move focus to the next input
            if (nextInput.value.length === 0) {
              nextInput.value = ""; // Clear the next input field only if it's empty
            }
          }
        }
      }
    } else {
      // If more than one character is entered, keep only the first character
      if (input) {
        input.value = inputValue.charAt(0);
      }
    }
    let _token = token.toString();
    // set the _token[index] to inputValue
    _token =
      _token.substring(0, index) +
      (input?.value && input.value.length > 0 ? input.value : " ") +
      _token.substring(index + 1);
    setToken(_token);
    setCanSubmit(
      _token.split("").filter((x) => x !== " ").length === 6 && email.length > 0
    );
  };

  const emptyInput = () => {
    for (let i = 0; i < 6; i++) {
      const input = inputRefs.current[i];
      input!.value = "";
    }
    setToken("      ");
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = async () => {
    try {
      setCanSubmit(false);
      let verifyResponse = await authService.verifySignup(token, email);
      if (
        isSucc(verifyResponse) &&
        verifyResponse.data &&
        verifyResponse.data.isValidated
      ) {
        setMessage({
          message: "Your account has been activated, please login!",
          type: "success",
        });
        await router.push({
          pathname: PATH_AUTH.login,
          query: { email: email },
        });
        return;
      } else {
        emptyInput();
        setFlashMessage(
          "Verification failed, invalid code. Please request a new code.",
          "error"
        );
        await router.push({
          pathname: PATH_AUTH.resendEmailVerification,
          query: { email: email },
        });
        return;
        // emptyInput()
        // setFlashMessage('Verification failed, invalid code.')
      }
    } catch (err) {
      emptyInput();
      setFlashMessage(
        "Verification failed, invalid code. Please request a new code.",
        "error"
      );
      await router.push({
        pathname: PATH_AUTH.resendEmailVerification,
        query: { email: email },
      });
      return;
      // emptyInput()
      // setFlashMessage('Verification failed, invalid code.')
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      const currentInput = event.target as HTMLInputElement;

      if (currentInput.value.length === 0) {
        const currentIndex = inputRefs.current.findIndex(
          (ref) => ref === currentInput
        );

        const previousInput = inputRefs.current[currentIndex - 1];
        if (previousInput) {
          previousInput.focus(); // Move focus to the previous input
        }
      } else {
        const index = inputRefs.current.findIndex(
          (ref) => ref === currentInput
        );
        let _token = token.toString();
        // set the _token[index] to inputValue
        _token = _token.substring(0, index) + " " + _token.substring(index + 1);
        setToken(_token);
        setCanSubmit(
          _token.split("").filter((x) => x !== " ").length === 6 &&
            email.length > 0
        );
        return;
      }
    }

    setCanSubmit(
      token.split("").filter((x) => x !== " ").length === 6 && email.length > 0
    );
  };

  const handleClose = () => {
    setFlash(undefined);
    setMessage(null);
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
    button: {
      width: "100%",
      backgroundColor: theme.palette.palette_style.primary.main,
    },
  };

  return (
    <LoadingPage>
      <Box sx={styles?.body}>
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
          rowSpacing={3}
          sx={{
            width: "100%",
            py: 4,
            px: { xs: 1, md: 4 },
            borderRadius: "4px",
            boxShadow: "0 0 64px 0 rgba(0,0,0,0.1)",
            backgroundColor: "white",
            textAlign: "center",
          }}
        >
          <Grid item xs={12}>
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
            <Typography variant="h4" gutterBottom>
              {t("Title")}{" "}
            </Typography>
            <Typography variant="body1">
              {t("Description")}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder={t("Email")}
              type="email"
              required
              value={email}
              sx={styles?.textField}
              onChange={(event) => {
                setEmail(event.target.value);
                setCanSubmit(
                  token.split("").filter((x) => x !== " ").length === 6 &&
                    event.target.value.length > 0
                );
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder={t("New Password")}
              required
              value={password}
              sx={styles?.textField}
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

          <Grid item xs={12} xl={12}>
            <ThemeProvider theme={theme}>
              <Box
                sx={{ width: "100%", display: "flex", gap: { xs: 1, md: 2 } }}
              >
                <TextField
                  size="small"
                  inputRef={(ref) => (inputRefs.current[0] = ref)}
                  onChange={(event: any) => handleInputChange(event, 0)}
                  onKeyDown={handleInputKeyDown}
                  sx={{ ...styles?.textField, ...{ border: "1px solid #eee" } }}
                  inputProps={{
                    maxLength: 1,
                    type: "text",
                  }}
                ></TextField>
                <TextField
                  size="small"
                  inputRef={(ref) => (inputRefs.current[1] = ref)}
                  onChange={(event: any) => handleInputChange(event, 1)}
                  onKeyDown={handleInputKeyDown}
                  sx={{ ...styles?.textField, ...{ border: "1px solid #eee" } }}
                  inputProps={{
                    maxLength: 1,
                    type: "text",
                  }}
                ></TextField>
                <TextField
                  size="small"
                  inputRef={(ref) => (inputRefs.current[2] = ref)}
                  onChange={(event: any) => handleInputChange(event, 2)}
                  onKeyDown={handleInputKeyDown}
                  sx={{ ...styles?.textField, ...{ border: "1px solid #eee" } }}
                  inputProps={{
                    maxLength: 1,
                    type: "text",
                  }}
                ></TextField>
                <TextField
                  size="small"
                  inputRef={(ref) => (inputRefs.current[3] = ref)}
                  onChange={(event: any) => handleInputChange(event, 3)}
                  onKeyDown={handleInputKeyDown}
                  sx={{ ...styles?.textField, ...{ border: "1px solid #eee" } }}
                  inputProps={{
                    maxLength: 1,
                    type: "text",
                  }}
                ></TextField>
                <TextField
                  size="small"
                  inputRef={(ref) => (inputRefs.current[4] = ref)}
                  onChange={(event: any) => handleInputChange(event, 4)}
                  onKeyDown={handleInputKeyDown}
                  sx={{ ...styles?.textField, ...{ border: "1px solid #eee" } }}
                  inputProps={{
                    maxLength: 1,
                    type: "text",
                  }}
                ></TextField>
                <TextField
                  size="small"
                  inputRef={(ref) => (inputRefs.current[5] = ref)}
                  onChange={(event: any) => handleInputChange(event, 5)}
                  onKeyDown={handleInputKeyDown}
                  sx={{ ...styles?.textField, ...{ border: "1px solid #eee" } }}
                  inputProps={{
                    maxLength: 1,
                    type: "text",
                  }}
                ></TextField>
              </Box>
            </ThemeProvider>
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              href="#"
              size="large"
              variant="contained"
              disabled={!canSubmit}
              sx={styles?.button}
              onClick={() => handleSubmit()}
            >
              {t("Submit")}
            </Button>
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
          </Grid>
        </Grid>
      </Container>
    </Box>
    </LoadingPage>
    
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

  return await getTranslations("forgot password verification manual", context);
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
