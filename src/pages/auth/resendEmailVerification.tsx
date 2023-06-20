import React, { useRef } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
} from "@mui/material";

const VerifyEmail = () => {
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
            // value={userName}
            // onChange={handleChangeEmail}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              href="#"
              size="large"
              variant="contained"
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

export default VerifyEmail;
