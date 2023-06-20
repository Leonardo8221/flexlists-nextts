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
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authService } from "src/services/auth.service";
import { isSucc } from "src/models/ApiResponse";
import { useRouter } from "next/router";
import { PATH_AUTH } from "src/routes/paths";
import { setMessage } from "src/redux/actions/authAction";
import { connect } from "react-redux";

const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: "56px !important",
          width: "40px !important",

          "& input": {
            textAlign: "center",
            fontWeight: "600",
            fontSize: 24,
          },
        },
      },
    },
  },
});


interface VerifyEmailProps {
  message: any;
  setMessage: (message: any) => void;
}

const VerifyEmail = ({ message, setMessage }: VerifyEmailProps) => {

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [canSubmit, setCanSubmit] = React.useState(false);
  const [token, setToken] = React.useState<string>("      ");
  const router = useRouter();
  const [flash, setFlash] = React.useState<{ message: string, type: string } | undefined>(undefined);
  const [email, setEmail] = React.useState<string>('');

  useEffect(() => {
    function checkMessage() {
      if (message?.message) {
        setFlash(message)
      }
    }
    checkMessage()
  }, [message])


  function setFlashMessage(message: string, type: string = 'error') {
    setFlash({ message: message, type: type })
    setMessage({ message: message, type: type })
  }

  useEffect(() => {
    function routerCheck() {
      if (router.query.email) {
        setEmail(router.query.email as string)
      }

    }
    routerCheck()
  })

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputValue = event.target.value;
    const input = inputRefs.current[index];
    if (isNaN(parseInt(inputValue))) {
      input!.value = ''
      return
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
    let _token = token.toString()
    // set the _token[index] to inputValue 
    _token = _token.substring(0, index) + (input?.value && input.value.length > 0 ? input.value : ' ') + _token.substring(index + 1);
    setToken(_token)
    setCanSubmit(_token.split('').filter((x) => x !== ' ').length === 6 && email.length > 0)
  };

  const emptyInput = () => {
    for (let i = 0; i < 6; i++) {

      const input = inputRefs.current[i];
      input!.value = ''
    }
    setToken('      ')
    inputRefs.current[0]?.focus()
  }

  const handleSubmit = async () => {
    try {
      setCanSubmit(false)
      let verifyResponse = await authService.verifySignup(token, email)
      if (isSucc(verifyResponse) && verifyResponse.data && verifyResponse.data.isValidated) {
        await router.push({ pathname: PATH_AUTH.login });
        return;
      }
      else {
        emptyInput()
        setFlashMessage('Verification failed, invalid code.')
      }
    }
    catch (err) {
      emptyInput()
      setFlashMessage('Verification failed, invalid code.')
    }
  }

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
        let _token = token.toString()
        // set the _token[index] to inputValue 
        _token = _token.substring(0, index) + ' ' + _token.substring(index + 1);
        setToken(_token)
        setCanSubmit(_token.split('').filter((x) => x !== ' ').length === 6 && email.length > 0)
        return
      }

    }



    setCanSubmit(token.split('').filter((x) => x !== ' ').length === 6 && email.length > 0)

  };

  const handleClose = () => {
    setFlash(undefined)
    setMessage(null)
  }

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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
            py: 4,
            px: { xs: 1, md: 4 },
            borderRadius: "4px",
            boxShadow: "0 0 64px 0 rgba(0,0,0,0.1)",
            backgroundColor: "white",
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h4">
              Email with verification code sent.{" "}
            </Typography>
            <Typography variant="body1">
              Please insert code from email below.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Email"
              type="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setCanSubmit(token.split('').filter((x) => x !== ' ').length === 6 && event.target.value.length > 0)
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
              sx={{
                width: "100%",
                backgroundColor: "#FFD232",
                color: "#0D0934",
                textTransform: "uppercase",
              }}
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
            <Snackbar open={flash !== undefined} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={flash?.type as AlertColor} sx={{ width: '100%' }}>
                {flash?.message}
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </Container >
    </>
  );
};

const mapStateToProps = (state: any) => ({
  message: state.auth.message,
});

const mapDispatchToProps = {
  setMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);

