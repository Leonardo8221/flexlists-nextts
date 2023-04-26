// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Button, Container, Typography } from '@mui/material';
//
import { varFadeInUp, MotionInView, varFadeInRight } from 'src/components/animate';

// ---------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 0, 14, 0),
  backgroundColor: '#ffffff',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    marginBottom: 0
  }
}));

// ----------------------------------------------------------------------

export default function LandingWeHelpYou() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <ContentStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography component="p" variant="overline" sx={{ mb: 2, color: 'info.main' }}>
                  SOLUTIONS
                </Typography>
              </MotionInView>

              <MotionInView variants={varFadeInUp}>
                <Typography variant="h2" sx={{ mb: 3 }}>
                  We help you simplify your workflow.
                </Typography>
              </MotionInView>

              <MotionInView variants={varFadeInUp}>
                <Typography
                  sx={{
                    mb: 5,
                    color: isLight ? 'text.secondary' : 'common.white'
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur. Pellentesque nulla egestas habitasse risus enim facilisi varius. Volutpat nunc turpis pharetra id.
                </Typography>
              </MotionInView>

              <MotionInView variants={varFadeInUp}>
                <Button
                  size="large"
                  variant="contained"
                >
                  Discover more
                </Button>
              </MotionInView>
            </ContentStyle>
          </Grid>

          <Grid item xs={12} md={6} dir="ltr">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                justifyContent: 'center'
              }}
            >
                <MotionInView variants={varFadeInRight}>
                    <img alt="We help you simplify your workflow." src={`/assets/home/wehelpyou.png`} />
                </MotionInView>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
