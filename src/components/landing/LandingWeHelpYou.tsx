// material
import { alpha, useTheme, styled } from "@mui/material/styles";
import { Box, Grid, Button, Container, Typography } from "@mui/material";
// ---------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0, 14, 0),
  backgroundColor: "#ffffff",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
}));

const ContentStyle = styled("div")(({ theme }) => ({
  width: "100%",
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    textAlign: "left",
    marginBottom: 0,
  },
}));

// ----------------------------------------------------------------------

export default function LandingWeHelpYou() {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, md: 8 } }}
    >
      <Box
        sx={
          {
            // backgroundColor: "#fafafa",
          }
        }
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={5}
            sx={{
              minHeight: "80vh",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid
              item
              xs={12}
              md={5}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box>
                <Typography
                  component="p"
                  variant="overline"
                  sx={{ mb: 2, color: "info.main" }}
                >
                  Solutions
                </Typography>

                <Typography variant="h3" sx={{ mb: 3 }}>
                  Mobile Version
                </Typography>

                <Typography
                  sx={{
                    mb: 5,
                    color: isLight ? "text.secondary" : "common.white",
                  }}
                >
                  Full use of Flexlists on mobile or on a tablet. You can do
                  everything on the mobile that you can do on the desktop -
                  view, search, create new tables etc
                </Typography>

                <Button size="large" variant="contained">
                  Discover more
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} dir="ltr">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  justifyContent: "center",
                }}
              >
                <Box
                  component={"img"}
                  alt="We help you simplify your workflow."
                  src={`/assets/home/heroimg.png`}
                  sx={{
                    boxShadow: "0 4px 24px 0 rgba(0,0,0,0.1)",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Grid
          container
          spacing={5}
          sx={{
            minHeight: "80vh",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
          }}
        >
          <Grid
            item
            xs={12}
            md={5}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box>
              <Typography
                component="p"
                variant="overline"
                sx={{ mb: 2, color: "info.main" }}
              >
                Solutions
              </Typography>

              <Typography variant="h3" sx={{ mb: 3 }}>
                Notifications
              </Typography>

              <Typography
                sx={{
                  mb: 5,
                  color: isLight ? "text.secondary" : "common.white",
                }}
              >
                Fully configurable notifications based on parameters set by you.
                You can be notified of any changes to data. You can be notified
                if a field value exceeds parameters that you set.
              </Typography>

              <Button size="large" variant="contained">
                Discover more
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} dir="ltr">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                justifyContent: "center",
              }}
            >
              <Box
                component={"img"}
                alt="We help you simplify your workflow."
                src={`/assets/home/heroimg.png`}
                sx={{
                  boxShadow: "0 4px 24px 0 rgba(0,0,0,0.1)",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="xl">
        <Grid
          container
          spacing={5}
          sx={{
            minHeight: "80vh",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid
            item
            xs={12}
            md={5}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box>
              <Typography
                component="p"
                variant="overline"
                sx={{ mb: 2, color: "info.main" }}
              >
                Solutions
              </Typography>

              <Typography variant="h3" sx={{ mb: 3 }}>
                All new field types
              </Typography>

              <Typography
                sx={{
                  mb: 5,
                  color: isLight ? "text.secondary" : "common.white",
                }}
              >
                Including: Currencies/ Financials/ Full address fields
                including: Cities/ Countries/ Phone numbers. All with content
                validation.
              </Typography>

              <Button size="large" variant="contained">
                Discover more
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} dir="ltr">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                justifyContent: "center",
              }}
            >
              <Box
                component={"img"}
                alt="We help you simplify your workflow."
                src={`/assets/home/heroimg.png`}
                sx={{
                  boxShadow: "0 4px 24px 0 rgba(0,0,0,0.1)",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
