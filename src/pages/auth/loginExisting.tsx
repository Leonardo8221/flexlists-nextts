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
  AlertColor
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';
import SocialLogin from '../../sections/auth/SocialLoginButtons';
import LoginIcon from "@mui/icons-material/Login";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authService } from '../../services/auth.service';
import Iconify from '../../components/iconify';
import { isSucc } from "src/models/ApiResponse";
import { PATH_MAIN } from "src/routes/paths";
import { setMessage } from "src/redux/actions/authAction";
import { connect } from "react-redux";


interface LoginProps {
  message: any;
  setMessage: (message: any) => void;
}

const Login = ({ message, setMessage }: LoginProps) => {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const router = useRouter();
  //const [error, setError] = useState<string>();
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [flash, setFlash] = useState<{ message: string, type: string } | undefined>(undefined);

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

  const handleSubmit = async () => {
    try {
      if (!userName) {
        setError("User Name required")
        return;
      }
      if (!password) {
        setError("Password required")
        return;
      }
      var response = await authService.login(userName, password);
      if (isSucc(response)) {
        setMessage({ message: 'Login successful, going to your Dashboard!', type: 'success' })
        await router.push({ pathname: PATH_MAIN.views });
        return
      }
      setError('Invalid username or password. Please try again or request a new password.')
    } catch (error: any) {
      console.log(error)
      setError('Unknown error. Please try again.')
    }
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  }

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  return (
    <>
      <Box
        component="img"
        sx={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          zIndex: -1
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
            backgroundColor: 'white',
            marginTop: 0,
            maxHeight: '93vh',
            overflow: 'auto'
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
            <Typography variant="h3" textAlign="center">
              Sign in - Existing User
            </Typography>
            <Typography variant="body1" textAlign="center">
              This is the sign in for existing Flexlists users; after logging in, your lists will be
              migrated to the new system and you can continue working. If you already logged in before in
              the new version, please Sign in <Link href="/auth/login">here</Link>.
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
              placeholder="Current Flexlists Username"
              type="text"
              required
              value={userName}
              onChange={handleChangeEmail}
            ></TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Current Flexlists Password"
              required
              value={password}
              onChange={handleChangePassword}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>

          <Grid item xs={6}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked sx={{ color: '#FFD232', '&.Mui-checked': { color: '#FFD232', }, }} />}
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
            <Link href="/auth/forgotPassword" variant="body1" sx={{ color: '#0D0934' }}>
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
                backgroundColor: '#FFD232',
                color: '#0D0934'
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
              alignItems: "center"
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
                color: '#0D0934'
              }}
            >
              Sign Up
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);

