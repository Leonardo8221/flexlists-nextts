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
import { GetServerSideProps } from "next";
import { TranslationText } from "src/models/SharedModels";
import { getTranslations, getTranslation } from "src/utils/i18n";
import { Errors, FlexlistsError, isSucc } from "src/utils/responses";
import { authService } from "src/services/auth.service";
import { parse, serialize } from "cookie";
import { validateToken } from "src/utils/tokenUtils";
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

function Home({ translations }: ContentProps & { translations: TranslationText[] }) {
  const t = (key: string): string => {
    return getTranslation(key, translations)
  }

  return (
    <MainLayout translations={translations}>
      <LandingHero translations={translations} />
      <LandingWeHelpYou translations={translations} />
      <LandingTrustedBy translations={translations} />
      <LandingQuickCreate translations={translations} />
      {/* <LandingPricingPlans /> */}
      <LandingCTA translations={translations} />
    </MainLayout>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  var verifyToken = await validateToken(context)
  if(verifyToken){
    return verifyToken
  }
  return await getTranslations("existing landing page", context)
}
export default Home;