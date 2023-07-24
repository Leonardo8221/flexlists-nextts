// material
import { styled } from "@mui/material/styles";
// components
// import Page from '../../components/Page';
import {
  LandingHero,
  LandingWeHelpYou,
  LandingQuickCreate,
  LandingPricingPlans,
  LandingTrustedBy,
  LandingCTA,
} from "src/components/landing";
import MainLayout from "src/layouts/main/MainLayout";

// ----------------------------------------------------------------------

// const RootStyle = styled(Page)({
//   height: '100%'
// });

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    palette_style?: any;
  }
}

const ContentStyle = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.background.default,
}));

export default function Home() {
  return (
    <MainLayout>
      <LandingHero translations={[]} />
      <LandingWeHelpYou />
      <LandingTrustedBy />
      <LandingQuickCreate />
      {/* <LandingPricingPlans /> */}
      <LandingCTA />
    </MainLayout>
  );
}
