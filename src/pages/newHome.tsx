// material
import { styled } from "@mui/material/styles";
import { GetServerSideProps } from "next";
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
import { TranslationText } from "src/models/SharedModels";
import { getTranslations } from "src/utils/i18n";

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
type ContentProps = {

};
export default function Home({ translations }: ContentProps & { translations: TranslationText[] }) {
  return (
    <MainLayout>
      <LandingHero translations={translations} />
      <LandingWeHelpYou />
      <LandingTrustedBy />
      <LandingQuickCreate />
      {/* <LandingPricingPlans /> */}
      <LandingCTA />
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  return await getTranslations("new landing page", context)
}
