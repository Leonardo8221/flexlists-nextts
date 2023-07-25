import {
  Box,
  Typography,
  TextField,
  Container,
  Grid,
  InputAdornment,
  Link,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import EmailIcon from "@mui/icons-material/Email";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

interface Custom500Props {
  styles?: any;
}
export default function Custom500({ styles }: Custom500Props) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  styles = {
    image: {
      width: 660,
      objectFit: "contain",
      float: "right",
    },
    FormLogoWrapper: {
      display: "flex",
    },
    FormLogo: {
      width: 60,
      height: 45,
      objectFit: "contain",
      marginTop: "2px",
    },
    textField: {
      "& .MuiInputBase-root": {
        backgroundColor: "#fcfeff",
        border: "none",
        color: "#666",
        boxShadow: "-4px 0 12px 0 rgba(0,0,0,0.1)",
      },

      "& ::placeholder": {
        color: "#ccc",
      },

      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          border: "none",
        },
      },
    },
    link: {
      color: theme.palette.palette_style.text.selected,
      textDecoration: "none",
      "&:hover": { textDecoration: "underline" },
    },
  };
  return (
    <Box>
      <Container
        sx={{
          height: 96,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        maxWidth="xl"
      >
        <Box sx={styles?.FormLogoWrapper}>
          <Link href="/">
            <Box
              component="img"
              sx={styles?.FormLogo}
              alt="Logo"
              src="/assets/logo.png"
            />
          </Link>
        </Box>
        <Link
          sx={{
            ...styles?.link,
            ...{ display: "flex", alignItems: "center", gap: 0.5 },
          }}
          href="mailto:support@flexlists.com"
        >
          <EmailIcon /> Contact support
        </Link>
      </Container>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <Grid
          container
          sx={{
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: { xs: 1, md: 3 },
            }}
          >
            <Box
              sx={{
                fontSize: { xs: 64, md: 96 },
                fontWeight: 800,
                color: theme.palette.palette_style.text.selected,
              }}
            >
              500
            </Box>
            <Typography variant="h4" gutterBottom>
              Our 500 error page seems to have gone on vacation.{" "}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Don't worry, we've sent out a search party to bring it back. In
              the meantime, why not enjoy a cup of virtual coffee and try
              exploring our other pages? Happy hunting!
            </Typography>
            <Box sx={{ position: "relative" }}>
              <TextField
                fullWidth
                sx={{ ...styles?.textField, ...{ border: "1px solid #ccc" } }}
                value={"123456"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      sx={{ cursor: "pointer" }}
                      onClick={handleClick}
                      position="start"
                    >
                      <ContentPasteIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Typography variant="caption">
                Send us this code to make sure what happened
              </Typography>
              <Snackbar
                sx={{
                  position: "absolute",
                  bottom: "-100% !important",
                  width: "100%",
                  left: { xs: 0, md: "100% !important" },
                  transform: { md: "translateX(-100%)" },
                }}
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={2000}
                message="Copied to clipboard"
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 6 }}>
              <Box
                sx={{
                  height: 64,
                  width: 88,
                  backgroundColor: theme.palette.palette_style.primary.main,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Link href="./existingHome">
                  <ArrowBackOutlinedIcon
                    sx={{
                      color: theme.palette.background.paper,
                      fontSize: 40,
                    }}
                  />
                </Link>
              </Box>
              <Link
                href="./existingHome"
                sx={{ ...styles?.link, ...{ color: "#333" } }}
              >
                Back to homepage
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={styles?.image}
              component="img"
              alt="Logo"
              src="/assets/illustrations/coffee.png"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
