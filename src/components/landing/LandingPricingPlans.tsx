import { Icon } from "@iconify/react";
import checkmarkFill from "@iconify/icons-eva/checkmark-fill";
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
import {
  varFadeInUp,
  MotionInView,
  varFadeInDown,
} from "src/components/animate";
import { motion } from "framer-motion";
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";

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

type LandingPricingPlansProps = {
  translations: TranslationText[];
};

const LandingPricingPlans = ({
  translations
}: LandingPricingPlansProps) => {
  const t = (key: string): string => {
    if (!translations) return key;
    return getTranslation(key, translations);
  };

  const LICENSES = [t("Free Plan Title"), t("Basic Plan Title"), t("Business Plan Title")];
  const DESC = [t("Free Plan Description"), t("Basic Plan Description"), t("Business Plan Description")];
  const RATES = [0, 12, 24];

  const PLANS = [...Array(3)].map((_, index) => ({
    license: LICENSES[index],
    description: DESC[index],
    rates: RATES[index],
  }));

  const PlanCard = ({ plan, cardIndex }: any) => {
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
            <Typography variant="h4">€{rates}/{t("Month")}</Typography>
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
                <Typography variant="body2">{t("Feature Name")}</Typography>
              </Stack>
            ))}
          </Stack>
  
          <Button
            size="large"
            fullWidth
            variant={"contained"}
            sx={{ background: "#003249" }}
          >
            {t("Get Started")}
          </Button>
        </Stack>
      </Card>
    );
  };

  return (
    <RootStyle>
      <PriceImgStyle
        alt="overlay"
        src="/assets/home/pricingstyle.png"
        variants={varFadeInUp}
      />
      <Container maxWidth="xl">
        <Box
          sx={{ margin: "auto", my: 10, textAlign: "center", maxWidth: 650 }}
        >
          <MotionInView variants={varFadeInUp}>
            <Typography component="p" variant="overline" sx={{ mb: 2 }}>
              {t("Pricing")}
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h2" sx={{ mb: 3 }}>
              {t("Pricing Title")}
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInDown}>
            <Typography>
              {t("Pricing Description")}
            </Typography>
          </MotionInView>
        </Box>

        <Grid container spacing={5}>
          {PLANS.map((plan, index) => (
            <Grid key={plan.license} item xs={12} md={4}>
              <PlanCard plan={plan} cardIndex={index} />

              {/* <MotionInView
                variants={index === 1 ? varFadeInDown : varFadeInUp}
              >
              </MotionInView> */}
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
};

export default LandingPricingPlans;