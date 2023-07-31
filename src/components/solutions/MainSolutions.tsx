// material
import { alpha, useTheme, styled } from "@mui/material/styles";
import * as React from "react";
import {
  Box,
  Grid,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  //   Accordion,
} from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

// ---------------------------------------------------------------------

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  //   border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    // borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : theme.palette.palette_style.background.paper,
  boxShadow: "0 0 12px 0 rgba(0, 0, 0, 0.1)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  //   borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function MainSolutions() {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 2, md: 8 },
        textAlign: { xs: "center", md: "left" },
      }}
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
            spacing={3}
            sx={{
              minHeight: "60vh",
              alignItems: "center",
              justifyContent: "space-between",
              py: 6,
            }}
          >
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                display: "flex",
                alignItems: "center",
                mt: { xs: 4, md: 0 },
              }}
            >
              <Box>
                <Typography variant="h3" sx={{ mb: { xs: 1, md: 3 } }}>
                  Mobile Version
                </Typography>

                <Typography
                  sx={{
                    mb: { xs: 1, md: 5 },
                    color: isLight ? "text.secondary" : "common.white",
                  }}
                >
                  Full use of Flexlists on mobile or on a tablet. You can do
                  everything on the mobile that you can do on the desktop -
                  view, search, create new tables etc
                </Typography>
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
                  src={`/assets/images/products/mobile.png`}
                  sx={{
                    boxShadow: "0 4px 24px 0 rgba(0,0,0,0.1)",
                    maxHeight: "50%",
                    float: "right",
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
          spacing={2}
          sx={{
            minHeight: { xs: "20vh", md: "60vh" },
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
          }}
        >
          <Grid
            item
            xs={12}
            md={5}
            sx={{ display: "flex", alignItems: "center", mt: { xs: 4, md: 0 } }}
          >
            <Box>
              <Typography variant="h3" sx={{ mb: { xs: 1, md: 3 } }}>
                Notifications
              </Typography>

              <Typography
                sx={{
                  mb: { xs: 1, md: 5 },
                  color: isLight ? "text.secondary" : "common.white",
                }}
              >
                Fully configurable notifications based on parameters set by you.
                You can be notified of any changes to data. You can be notified
                if a field value exceeds parameters that you set.
              </Typography>
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

        <Grid
          container
          spacing={3}
          sx={{
            minHeight: { xs: "20vh", md: "60vh" },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid
            item
            xs={12}
            md={5}
            sx={{ display: "flex", alignItems: "center", mt: { xs: 4, md: 0 } }}
          >
            <Box>
              <Typography variant="h3" sx={{ mb: { xs: 1, md: 3 } }}>
                All new field types
              </Typography>

              <Typography
                sx={{
                  mb: { xs: 1, md: 5 },
                  color: isLight ? "text.secondary" : "common.white",
                }}
              >
                Including: Currencies/ Financials/ Full address fields
                including: Cities/ Countries/ Phone numbers. All with content
                validation.
              </Typography>
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

        <Grid
          container
          spacing={3}
          sx={{
            minHeight: { xs: "20vh", md: "60vh" },
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
            mt: { xs: 4, md: 0 },
          }}
        >
          <Grid
            item
            xs={12}
            md={5}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box>
              <Typography variant="h3" gutterBottom>
                Hello people
              </Typography>
              <Typography variant="body1" gutterBottom>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Cupiditate optio obcaecati vero voluptas dolore harum maiores
                vel facere ipsam. Harum!
              </Typography>
              <Box
                sx={{
                  height: "4px",
                  width: "150px",
                  backgroundColor: theme.palette.palette_style.primary.main,
                  my: 2,
                }}
              ></Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Typography>Item #1</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                      blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel2"}
                  onChange={handleChange("panel2")}
                >
                  <AccordionSummary
                    aria-controls="panel2d-content"
                    id="panel2d-header"
                  >
                    <Typography>Item #2</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                      blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel3"}
                  onChange={handleChange("panel3")}
                >
                  <AccordionSummary
                    aria-controls="panel3d-content"
                    id="panel3d-header"
                  >
                    <Typography>Item #3</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                      blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
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
        <Box sx={{ minHeight: "60vh", pb: 2 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ pt: 6, pb: 2, textAlign: "center" }}
          >
            Cards
          </Typography>

          <Grid container spacing={3} sx={{ alignItems: "center" }}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: { xs: "100%", md: 345 } }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/assets/home/heroimg.png"
                    alt="card img"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: { xs: "100%", md: 345 } }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/assets/home/heroimg.png"
                    alt="card img"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: { xs: "100%", md: 345 } }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/assets/home/heroimg.png"
                    alt="card img"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: { xs: "100%", md: 345 } }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/assets/home/heroimg.png"
                    alt="card img"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
