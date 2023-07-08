import { Icon } from "@iconify/react";
import checkmarkFill from "@iconify/icons-eva/checkmark-fill";
// material
import { useTheme, styled, alpha } from "@mui/material/styles";
import {
  Box,
  Grid,
  Card,
  Stack,
  Button,
  Divider,
  Container,
  Typography,
} from "@mui/material";
//
import {
  varFadeInUp,
  MotionInView,
  varFadeInDown,
} from "src/components/animate";
import { motion } from "framer-motion";

// ----------------------------------------------------------------------

const LICENSES = ["Free", "Basic", "Business"];
const DESC = ["For 10 users", "For 20 users", "Unlimited users"];
const RATES = [0, 12, 24];

const PLANS = [...Array(3)].map((_, index) => ({
  license: LICENSES[index],
  description: DESC[index],
  rates: RATES[index],
}));

const RootStyle = styled("div")(({ theme }) => ({
  position: "relative",
  color: "white",
  background: "linear-gradient(294.81deg, #3A7EC5 -87.58%, #54A6FB 89.78%)",
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
  },
}));

const PriceImgStyle = styled(motion.img)(({ theme }) => ({
  top: 0,
  zIndex: 10,
  margin: "auto",
  position: "absolute",
}));

// ----------------------------------------------------------------------

function PlanCard({ plan, cardIndex }: any) {
  const theme = useTheme();
  const { license, description, rates } = plan;

  const isLight = theme.palette.mode === "light";

  return (
    <Card
      sx={{
        p: 5,
        boxShadow: (theme) =>
          `0px 48px 80px ${alpha(
            isLight ? theme.palette.grey[500] : theme.palette.common.black,
            0.12
          )}`,
        ...(cardIndex === 1 && {
          boxShadow: (theme) =>
            `0px 48px 80px ${alpha(
              isLight ? theme.palette.grey[500] : theme.palette.common.black,
              0.48
            )}`,
        }),
        borderTop: "8px solid #003249",
      }}
    >
      <Stack spacing={5}>
        <Stack spacing={2.5}>
          <div>
            <Typography variant="h4">{license}</Typography>
            <Typography
              variant="overline"
              sx={{ mb: 2, color: "text.disabled", display: "block" }}
            >
              {description}
            </Typography>
          </div>
          <Divider sx={{ borderStyle: "solid", my: 3 }} />
          <Typography variant="h4">€{rates}/month</Typography>
          <Divider sx={{ borderStyle: "solid", my: 3 }} />
          {[...Array(4)].map((_, index) => (
            <Stack
              key={index}
              spacing={1.5}
              direction="row"
              alignItems="center"
            >
              <Box
                component={Icon}
                icon={checkmarkFill}
                sx={{ color: "primary.main", width: 20, height: 20 }}
              />
              <Typography variant="body2">Feature Name</Typography>
            </Stack>
          ))}
        </Stack>

        <Button
          size="large"
          fullWidth
          variant={"contained"}
          sx={{ background: "#003249" }}
        >
          Get started
        </Button>
      </Stack>
    </Card>
  );
}

export default function LandingPricingPlans() {
  return (
    <RootStyle>
      <PriceImgStyle
        alt="overlay"
        src="/assets/home/pricingstyle.png"
        variants={varFadeInUp}
      />
      <Container maxWidth="lg">
        <Box
          sx={{ margin: "auto", my: 10, textAlign: "center", maxWidth: 650 }}
        >
          <MotionInView variants={varFadeInUp}>
            <Typography component="p" variant="overline" sx={{ mb: 2 }}>
              pricing
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h2" sx={{ mb: 3 }}>
              We are sure that we have an offer for everyone.
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInDown}>
            <Typography>
              Lorem ipsum dolor sit amet consectetur. Pellentesque nulla egestas
              habitasse risus enim facilisi varius. Volutpat nunc turpis
              pharetra id.
            </Typography>
          </MotionInView>
        </Box>

        <Grid container spacing={5}>
          {PLANS.map((plan, index) => (
            <Grid key={plan.license} item xs={12} md={4}>
              <MotionInView
                variants={index === 1 ? varFadeInDown : varFadeInUp}
              >
                <PlanCard plan={plan} cardIndex={index} />
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
