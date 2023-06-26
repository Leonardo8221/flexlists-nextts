import { Alert, AlertColor, Box, Button, Container, Grid, IconButton, InputAdornment, Snackbar, Stack, TextField, Typography } from "@mui/material"
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { connect } from "react-redux";
import { isSucc } from "src/models/ApiResponse";
import { setMessage } from "src/redux/actions/authAction";
import { PATH_AUTH } from "src/routes/paths";
import { authService } from "src/services/auth.service";
import Iconify from "../../../components/iconify";

interface VerifyEmailTokenProps {
  message: any;
  setMessage: (message: any) => void;
}

const VerifyEmailToken = ({ message, setMessage }: VerifyEmailTokenProps) => {
  const router = useRouter();
  const [flash, setFlash] = useState<{ message: string, type: string } | undefined>(undefined);
  // const [email, setEmail] = useState<string>('');
  // const [verifyResult, setVerifyResult] = useState<string>('Verifying')
  // const [isValidated, setIsValidated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

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

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  async function handleSubmit() {
    try {
      let verifyResponse = await authService.verifySignup(router.query.token as string, router.query.email as string)
      if (isSucc(verifyResponse) && verifyResponse.data && verifyResponse.data.isValidated) {
        setMessage({ message: 'Your account has been activated, please login!', type: 'success' })
        await router.push({ pathname: PATH_AUTH.login });
        return;
        // setVerifyResult("Verify successfully")
        // setIsValidated(true)
      }
      else {
        setMessage({ message: 'Verification failed, invalid code. Please request a new code.', type: 'error' })
        await router.push({ pathname: PATH_AUTH.resendEmailVerification, query: { email: router.query.email as string } });
        return;
        //setVerifyResult("Verify fail")
      }
    }
    catch (err) {
      setMessage({ message: 'Verification failed, invalid code. Please request a new code.', type: 'error' })
      await router.push({ pathname: PATH_AUTH.resendEmailVerification, query: { email: router.query.email as string } });
      return;
      //console.log(err)
      //setVerifyResult("Verify fail")
    }

  }
  useEffect(() => {

    if (router.query.token && router.isReady) {
      //verifyEmail()
    }
  }, [router.query.token])
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
            <Typography variant="h4" gutterBottom>
              Enter a new password for your account below.
            </Typography>
            <Typography variant="body1">
              Please do not close this window.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="New Password"
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
            <Button
              fullWidth
              href="#"
              size="large"
              variant="contained"
              disabled={false}
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
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  message: state.auth.message,
});

const mapDispatchToProps = {
  setMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailToken);

