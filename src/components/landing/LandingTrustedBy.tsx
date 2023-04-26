
import Slider from 'react-slick';
import { motion } from 'framer-motion';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
//
import { varFadeInUp, MotionInView, varFadeIn } from 'src/components/animate';
import { CarouselControlsArrowsBasic2 } from 'src/components/carousel/controls';
import { useRef } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: '#ffffff',
  paddingTop: theme.spacing(5),
}));

const HeroImgStyle = styled(motion.img)(({ theme }) => ({
  width: '80px',
  margin: 'auto'
}));

// ----------------------------------------------------------------------

const IMAGES = ['nike', 'google', 'deichmann', 'adidas', 'apple', 'cocacola', 'nike', 'google', 'deichmann', 'adidas', 'apple', 'cocacola'];

export default function LandingTrustedBy() {
  const theme = useTheme();
  const carouselRef = useRef<Slider>(null);

  const settings = {
    slidesToShow: 6,
    centerMode: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    centerPadding: '0 80px',
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const handlePrevious = () => {
    carouselRef?.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef?.current?.slickNext();
  };

  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ padding: '0px !important', overflow: 'hidden' }}>
        <Box sx={{ mb: { xs: 8, md: 10 }, pl: { xs: 3 } }}>
          <MotionInView variants={varFadeInUp}>
            <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.primary' }}>
              Trusted By
            </Typography>
          </MotionInView>
        </Box>

        <Box sx={{ position: 'relative' }}>
          <Slider ref={carouselRef} {...settings}>
            {IMAGES.map((img, index) => (
              <MotionInView key={index} variants={varFadeIn} sx={{ textAlign: 'center' }}>
                <HeroImgStyle alt={img} src={`/assets/home/${img}.png`} variants={varFadeInUp} />
              </MotionInView>
            ))}
          </Slider>
          <CarouselControlsArrowsBasic2
            onNext={handleNext}
            onPrevious={handlePrevious}
            sx={{ transform: 'translateY(-64px)' }}
          />
        </Box>

        {/* <Grid container spacing={isDesktop ? 10 : 5}>
          {CARDS.map((card, index) => (
            <Grid key={card.title} item xs={12} md={4}>
              <MotionInView variants={varFadeInUp}>
                <CardStyle className={index === 0 ? 'cardLeft' : index === 1 ? 'cardCenter' : ''}>
                  <CardIconStyle
                    src={card.icon}
                    alt={card.title}
                    sx={{
                      ...(index === 0 && {
                        filter: (theme) => shadowIcon(theme.palette.info.main)
                      }),
                      ...(index === 1 && {
                        filter: (theme) => shadowIcon(theme.palette.error.main)
                      })
                    }}
                  />
                  <Typography variant="h5" paragraph>
                    {card.title}
                  </Typography>
                  <Typography sx={{ color: isLight ? 'text.secondary' : 'common.white' }}>
                    {card.description}
                  </Typography>
                </CardStyle>
              </MotionInView>
            </Grid>
          ))}
        </Grid> */}
      </Container>
    </RootStyle>
  );
}
