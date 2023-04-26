import { useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Box, Grid, Card, Container, Typography } from '@mui/material';
//
import { varFadeInUp, MotionInView, varFadeInDown } from 'src/components/animate';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: '/assets/icons/ic_create.svg',
    iconHover: '/assets/icons/ic_create_hover.svg',
    title: 'Create',
    description: 'Lorem ipsum dolor sit amet consectetur. Pellentesque nulla egestas habitasse risus enim facilisi varius. Volutpat nunc turpis pharetra id.'
  },
  {
    icon: '/assets/icons/ic_edit.svg',
    iconHover: '/assets/icons/ic_edit_hover.svg',
    title: 'Edit',
    description: 'Lorem ipsum dolor sit amet consectetur. Pellentesque nulla egestas habitasse risus enim facilisi varius. Volutpat nunc turpis pharetra id.'
  },
  {
    icon: '/assets/icons/ic_view.svg',
    iconHover: '/assets/icons/ic_view_hover.svg',
    title: 'View',
    description: 'Lorem ipsum dolor sit amet consectetur. Pellentesque nulla egestas habitasse risus enim facilisi varius. Volutpat nunc turpis pharetra id.'
  },
  {
    icon: '/assets/icons/ic_share.svg',
    iconHover: '/assets/icons/ic_share_hover.svg',
    title: 'Share',
    description: 'Lorem ipsum dolor sit amet consectetur. Pellentesque nulla egestas habitasse risus enim facilisi varius. Volutpat nunc turpis pharetra id.'
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: '#ffffff',
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15)
  }
}));

const CardStyle = styled(Card)(({ theme }) => ({
    minHeight: 300,
    padding: 10,
    margin: 'auto',
    background: 'none',
    boxShadow: 'none',
    cursor: 'pointer',
    '&:hover': {
        background: '#54A6FB',
        color: '#ffffff'
    },
    '&.cardCenter': {
        backgroundColor: '#54A6FB',
        color: 'white !important',
        '&:hover': {
            background: 'none',
            color: 'black !important'
        },
    }
}));

const CardIconStyle = styled('img')(({ theme }) => ({
  width: 60,
  height: 60,
  marginBottom: theme.spacing(5),
}));

// ----------------------------------------------------------------------

export default function LandingQuickCreate() {
    const [ isHover, setIsHover ] = useState("");
    return (
        <RootStyle>
            <Container maxWidth="lg">
                <Grid container spacing={5} justifyContent="center">
                    <Grid item xs={12} md={7} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ mb: 5 }}>
                            <MotionInView variants={varFadeInDown}>
                                <Typography variant="h2" sx={{ textAlign: 'center', mb: 1 }}>
                                    Quickly create, edit and view all your lists.
                                </Typography>
                            </MotionInView>
                            <MotionInView variants={varFadeInUp}>
                                <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary', textAlign: 'center' }}>
                                    Lorem ipsum dolor sit amet consectetur. Pellentesque nulla egestas habitasse risus enim facilisi varius. Volutpat nunc turpis pharetra id.
                                </Typography>
                            </MotionInView>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    {CARDS.map((card, index) => (
                        <Grid key={card.title} item xs={12} md={3}>
                            <MotionInView variants={varFadeInUp}>
                                <CardStyle onMouseOver={() => setIsHover(card.title)} onMouseOut={() => setIsHover("")}>
                                    <CardIconStyle
                                        src={ isHover == card.title ? card.iconHover : card.icon}
                                        alt={card.title}
                                    />
                                    <Typography variant="h5" paragraph>
                                        {card.title}
                                    </Typography>
                                    <Typography component="p" variant="caption">
                                        {card.description}
                                    </Typography>
                                    <CardIconStyle
                                        src="/assets/icons/ic_arrow.svg"
                                        alt="Arrow"
                                        sx={{ mb: 0, height: 'auto', mt: 5 }}
                                    />
                                </CardStyle>
                            </MotionInView>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </RootStyle>
    );
}
