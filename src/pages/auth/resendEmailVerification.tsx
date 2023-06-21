import React, { useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { setMessage } from "src/redux/actions/authAction";
import { authService } from "src/services/auth.service";
import { isSucc } from "src/models/ApiResponse";
interface VerifyEmailProps {
  message: any;
  setMessage: (message: any) => void;
}

const VerifyEmail = ({ message, setMessage }: VerifyEmailProps) => {
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
  const handleClose = () => {
    setFlash(undefined)
    setMessage(null)
  }

  const handleResend = async () => {
    if (email) {
      const res = await authService.resendSignupEmail(email)
      if (isSucc(res)) {
        setFlashMessage('Verification code sent successfully. Please check your email.')
      } else {
        setFlashMessage('Something went wrong. Please try again.')
      }
    }

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
              Oops something went wrong.
            </Typography>
            <Typography variant="body1">
              Please click button below to send verification link again.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Email"
              type="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              href="#"
              size="large"
              variant="contained"
              onClick={() => handleResend()}

              sx={{
                width: "100%",
                backgroundColor: "#FFD232",
                color: "#0D0934",
                textTransform: "uppercase",
              }}
            >
              Send me code
            </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);