// material
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
// import Page from '../../components/Page';
import {
  LandingHero,
  LandingTrustedBy,
  LandingWeHelpYou,
  LandingQuickCreate,
  LandingPricingPlans,
} from 'src/components/landing';
import MainLayout from 'src/layouts/main/MainLayout';

// ----------------------------------------------------------------------

// const RootStyle = styled(Page)({
//   height: '100%'
// });

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

export default function Home() {
  return (
    <MainLayout>
    <Box sx={{heigh:'100%'}}>
      <LandingHero />
      <ContentStyle>
        <LandingTrustedBy />
        <LandingWeHelpYou />
        <LandingQuickCreate />
        <LandingPricingPlans />
      </ContentStyle>
    </Box>
    </MainLayout>
  );
}
