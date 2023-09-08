import { useTheme } from "@mui/material/styles";
import { Box, Grid, Button, Container, Typography } from "@mui/material";
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";

type LandingWeHelpYouProps = {
  translations: TranslationText[];
};

const LandingWeHelpYou = ({
  translations
}: LandingWeHelpYouProps) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };

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
                  {t("Solutions")}
                </Typography>

                <Typography variant="h3" sx={{ mb: 3 }}>
                  {t("Mobile Version Title")}
                </Typography>

                <Typography
                  sx={{
                    mb: 5,
                    color: isLight ? "text.secondary" : "common.white",
                  }}
                >
                  {t("Mobile Version Description")}
                </Typography>

                <Button size="large" variant="contained">
                  {t("Discover More Button")}
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
                {t("Solutions")}
              </Typography>

              <Typography variant="h3" sx={{ mb: 3 }}>
                {t("Notifications Title")}
              </Typography>

              <Typography
                sx={{
                  mb: 5,
                  color: isLight ? "text.secondary" : "common.white",
                }}
              >
                {t("Notifications Description")}
              </Typography>

              <Button size="large" variant="contained">
                {t("Discover More Button")}
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
                {t("Solutions")}
              </Typography>

              <Typography variant="h3" sx={{ mb: 3 }}>
                {t("All New Field Title")}
              </Typography>

              <Typography
                sx={{
                  mb: 5,
                  color: isLight ? "text.secondary" : "common.white",
                }}
              >
                {t("All New Field Description")}
              </Typography>

              <Button size="large" variant="contained">
                {t("Discover More Button")}
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
};

export default LandingWeHelpYou;