import { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Link
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
            py: 4,
            px: {xs: 1, md: 4},
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

export default ForgotPassword;
