import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Link,
  Snackbar,
  Alert,
  AlertColor
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';
import { connect } from 'react-redux';
import { setMessage } from 'src/redux/actions/authAction';
import { validateEmail } from 'src/utils/validateUtils';
import { forgotPassword } from 'src/services/auth.service';
import { FlexlistsError, isSucc } from 'src/models/ApiResponse';
import { useRouter } from 'next/router';
import { PATH_AUTH } from 'src/routes/paths';

interface ForgotPasswordProps {
  message: any;
  setMessage: (message: any) => void;
}

const ForgotPassword = ({ message, setMessage }: ForgotPasswordProps) => {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const [flash, setFlash] = useState<{ message: string, type: string } | undefined>(undefined);
  const [email, setEmail] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    function checkMessage() {

      if (message?.message) {
        setFlash(message)
      }
    }
    checkMessage()
  }, [message])

  function setError(message: string) {
    setFlashMessage(message)
  }
  function setFlashMessage(message: string, type: string = 'error') {
    setFlash({ message: message, type: type })
    setMessage({ message: message, type: type })
  }
  const handleClose = () => {
    setFlash(undefined)
    setMessage(null)
  }


  useEffect(() => {
    function routerCheck() {
      if (router.query.email) {
        setEmail(router.query.email as string)
      }

    }
    routerCheck()
  })

  async function handleSubmit(event: any) {
    if (!validateEmail(email)) {
      setFlashMessage('Invalid email address')
      return
    }
    try {
      const result = await forgotPassword(email)
      if (isSucc(result)) {
        setMessage({ message: "Email with instructions was sent to the email address provided", type: "success" })
        await router.push({ pathname: PATH_AUTH.forgotPasswordVerificationManual, query: { email: email } });
        return
      } else {
        setFlashMessage((result as FlexlistsError).message)
        return
      }
    } catch (error: any) {
      setFlashMessage(error.message)
    }
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Snackbar open={flash !== undefined} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={flash?.type as AlertColor} sx={{ width: '100%' }}>
          {flash?.message}
        </Alert>
      </Snackbar>
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
          backgroundColor: 'white'
        }}
      >
        <Grid item xs={12} sx={{ paddingTop: '0 !important' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
            <Link href="/">
              <Box
                component="img"
                sx={{
                  width: 60,
                  height: 45,
                  objectFit: 'contain',
                  marginTop: '2px'
                }}
                alt="Logo"
                src="/assets/logo_auth.png"
              />
            </Link>
          </Box>
          <Typography variant="h4" textAlign="center">
            Password Reset
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            fullWidth
            placeholder="Email"
            type="email"
            required
          ></TextField>
        </Grid>

        <Grid item xs={12}>
          <Button
            onClick={handleSubmit}
            href="#"
            size="large"
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: '#FFD232',
              color: '#0D0934'
            }}
          >
            Send recovery email
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  message: state.auth.message,
});

const mapDispatchToProps = {
  setMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);



