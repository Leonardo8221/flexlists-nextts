import {
  Box,
  Typography,
  TextField,
  Container,
  Grid,
  InputAdornment,
  Button,
  Link,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import EmailIcon from "@mui/icons-material/Email";
import { setReturnUrl } from "src/redux/actions/adminAction";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { PATH_AUTH, PATH_MAIN } from "src/routes/paths";

interface UnauthorizedProps {
  setReturnUrl: (returnUrl: string) => void
}
function Unauthorized({ setReturnUrl  }: UnauthorizedProps) {
  const router = useRouter();
  
  const theme = useTheme();
  const styles = {
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
  const onSubmit = async() => {
    setReturnUrl(router.asPath);
    await router.push({pathname: PATH_AUTH.login});
  };
  const gotoHomePage = async() => {
    console.log('aaa')
    await router.push({pathname: '/'})
  }
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
          minHeight: "calc(50vh - 96px)",
        }}
      >
        <Grid container>
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
              404
            </Box>
            <Typography variant="h4" gutterBottom>
               You currently do not have access to this page
            </Typography>
            {/* <Typography variant="body1" gutterBottom>
              Don&apos;t worry, we&apos;ve sent out a search party to bring it back. In
              the meantime, why not enjoy a cup of virtual coffee and try
              exploring our other pages? Happy hunting!
            </Typography> */}
            <Box>
              {/* <TextField
                fullWidth
                sx={styles?.textField}
                placeholder="How can we help you?"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              /> */}
               <Button onClick={onSubmit} variant="text">
                  Click here to login
              </Button>
            </Box>
            {/* <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 6 }}>
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
                <Link href="" onClick={gotoHomePage}>
                  <ArrowBackOutlinedIcon
                    sx={{
                      color: theme.palette.background.paper,
                      fontSize: 40,
                    }}
                  />
                </Link>
              </Box>
              <Link
                onClick={gotoHomePage}
                href=""
                sx={{ ...styles?.link, ...{ color: "#333" } }}
              >
                Back to homepage
              </Link>
            </Box> */}
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
const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = {
  setReturnUrl
};

export default connect(mapStateToProps, mapDispatchToProps)(Unauthorized);
