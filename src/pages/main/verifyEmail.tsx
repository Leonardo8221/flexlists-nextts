import React, { useRef } from "react";
import {
  Container,
  Typography,
  Link,
  Grid,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  Box,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const inputProps = {
  type: "number",
};

const VerifyEmail = () => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 1) {
      const input = inputRefs.current[index];
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
      const input = inputRefs.current[index];
      if (input) {
        input.value = inputValue.charAt(0);
      }
    }
  };

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
      }
    }
  };
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
          <Grid item xs={12} xl={12}>
            <ThemeProvider theme={theme}>
              <Box
                sx={{ width: "100%", display: "flex", gap: { xs: 1, md: 2 } }}
              >
                <TextField
                  size="small"
                  inputRef={(ref) => (inputRefs.current[0] = ref)}
                  onChange={(event) => handleInputChange(event, 0)}
                  onKeyDown={handleInputKeyDown}
                  inputProps={{
                    maxLength: 1,
                    type: "number",
                  }}
                ></TextField>
                <TextField
                  size="small"
                  inputRef={(ref) => (inputRefs.current[1] = ref)}
                  onChange={(event) => handleInputChange(event, 1)}
                  onKeyDown={handleInputKeyDown}
                  inputProps={{
                    maxLength: 1,
                    type: "number",
                  }}
                ></TextField>
                <TextField
                  size="small"
                  inputRef={(ref) => (inputRefs.current[2] = ref)}
                  onChange={(event) => handleInputChange(event, 2)}
                  onKeyDown={handleInputKeyDown}
                  inputProps={{
                    maxLength: 1,
                    type: "number",
                  }}
                ></TextField>
                <TextField
                  size="small"
                  inputRef={(ref) => (inputRefs.current[3] = ref)}
                  onChange={(event) => handleInputChange(event, 3)}
                  onKeyDown={handleInputKeyDown}
                  inputProps={{
                    maxLength: 1,
                    type: "number",
                  }}
                ></TextField>
                <TextField
                  size="small"
                  inputRef={(ref) => (inputRefs.current[4] = ref)}
                  onChange={(event) => handleInputChange(event, 4)}
                  onKeyDown={handleInputKeyDown}
                  inputProps={{
                    maxLength: 1,
                    type: "number",
                  }}
                ></TextField>
                <TextField
                  size="small"
                  inputRef={(ref) => (inputRefs.current[5] = ref)}
                  onChange={(event) => handleInputChange(event, 5)}
                  onKeyDown={handleInputKeyDown}
                  inputProps={{
                    maxLength: 1,
                    type: "number",
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
              sx={{
                width: "100%",
                backgroundColor: "#FFD232",
                color: "#0D0934",
                textTransform: "uppercase",
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default VerifyEmail;
