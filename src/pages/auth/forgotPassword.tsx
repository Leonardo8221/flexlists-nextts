import { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';

const ForgotPassword = () => {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');

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
              Password Reset
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Email"
              type="email"
              required
            ></TextField>
          </Grid>

          <Grid item xs={12}>
            <Button
              href="#"
              size="large"
              variant="contained"
              sx={{
                width: "100%",
              }}
            >
              Send recovery email
            </Button>
          </Grid>
        </Grid>
      </Container>
  );
};

export default ForgotPassword;
