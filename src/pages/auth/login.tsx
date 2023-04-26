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
          padding: "32px",
          borderRadius: "4px",
          boxShadow: "0 0 64px 0 rgba(0,0,0,0.1)",
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" textAlign="center">
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
              control={<Checkbox defaultChecked />}
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
          <Link href="/auth/forgotPassword" variant="body1">
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
            alignItems: "center",
            marginTop: "4rem",
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
            }}
          >
            Sign Up
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
