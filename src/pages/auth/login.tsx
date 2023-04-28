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
  Box
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';
import SocialLogin from '../../sections/auth/SocialLoginButtons';
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
import { useRouter } from "next/router";
import { authService } from '../../services/auth.service';
import Iconify from '../../components/iconify';

const Login = () => {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [showPassword, setShowPassword] = useState(false);
  const [userName,setUserName] = useState<string>('');
  const [password,setPassword] = useState<string>('');

  const handleSubmit = async() => {
      try {
         if(!userName)
         {
          setError("User Name required")
          return;
         }
         if(!password)
         {
          setError("Password required")
          return;
         }
         var response = await authService.login(userName,password);
         if(response && response.code == 0 && response.result)
         {
           router.push({pathname:'/dashboard'});
         }
      } catch (error) {
        
      }
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
     setUserName(event.target.value);
  }

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
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
            px: {xs: 1, md: 4},
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
              Sign in
            </Typography>
          </Grid>

          <Grid
            item
            container
          >
            {error && <Alert severity="error">{error}</Alert>}
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Email"
              type="email"
              required
              value={userName}
              onChange = {handleChangeEmail}
            ></TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Password"
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
              Sign in
            </Button>
          </Grid>

          <SocialLogin />

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
              href="/auth/register"
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

export default Login;
