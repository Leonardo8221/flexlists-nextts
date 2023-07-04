import { motion } from "framer-motion";
// material
import { styled } from "@mui/material/styles";
import { Button, Box, Container, Typography, Stack } from "@mui/material";
//
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "src/components/animate";
import useOffSetTop from "src/hooks/useOffSetTop";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  // opacity: 0,
  position: "relative",
  backgroundColor: "#EDF2F5",
  [theme.breakpoints.up("md")]: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    display: "flex",
    position: "fixed",
    alignItems: "center",
  },
}));

const ContentStyle = styled(motion.div)(({ theme }) => ({
  zIndex: 11,
  maxWidth: 520,
  margin: "auto",
  marginTop: "20%",
  textAlign: "center",
  position: "relative",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    paddingBottom: theme.spacing(15),
    marginTop: "40%",
    margin: "unset",
    textAlign: "left",
  },
}));

const HeroImgStyle = styled(motion.img)(({ theme }) => ({
  top: 80,
  right: 0,
  zIndex: 10,
  width: "75%",
  margin: "auto",
  position: "absolute",
  [theme.breakpoints.up("xs")]: {
    left: 0,
  },
  [theme.breakpoints.up("md")]: {
    zIndex: 10,
    top: 0,
    right: 0,
    left: "auto",
    width: "37%",
    margin: "auto",
    position: "absolute",
  },
  [theme.breakpoints.up("lg")]: {
    top: "35%",
    right: "10%",
    left: "auto",
  },
}));

const HeroImgShadowStyle = styled(motion.img)(({ theme }) => ({
  top: 250,
  right: 0,
  zIndex: 10,
  width: "75%",
  margin: "auto",
  position: "absolute",
  [theme.breakpoints.up("xs")]: {
    left: 0,
  },
  [theme.breakpoints.up("md")]: {
    top: 0,
    right: 0,
    left: "auto",
    zIndex: 9,
    width: "40%",
    margin: "auto",
    position: "absolute",
  },
  [theme.breakpoints.up("lg")]: {
    top: "77%",
    right: "8%",
    left: "auto",
  },
}));

const HeroOverlayStyle = styled(motion.img)(({ theme }) => ({
  top: 0,
  right: 0,
  zIndex: 8,
  width: "100%",
  margin: "auto",
  position: "absolute",
  [theme.breakpoints.up("lg")]: {
    width: "auto",
    height: "90%",
  },
}));

const ButtonStyle = styled(motion.div)(({ theme }) => ({
  display: "flex",
  margin: "auto !important",
  marginTop: "24px !important",
  [theme.breakpoints.up("md")]: {
    margin: "0px !important",
    marginTop: "24px !important",
  },
}));

// ----------------------------------------------------------------------

export default function LandingHero() {
  const isOffset = useOffSetTop(50);
  const router = useRouter();
  const gotoSignup = async () => {
    await router.push({
      pathname: "/auth/register",
    });
  };
  return (
    <>
      <RootStyle
        initial="initial"
        animate="animate"
        variants={varWrapEnter}
        sx={{
          opacity: 1,
          ...(isOffset && {
            opacity: { xs: 1, md: 0.5 },
            transition: (theme) => theme.transitions.create("opacity"),
          }),
        }}
      >
        <HeroImgStyle
          alt="overlay"
          src="/assets/home/heroimg.png"
          variants={varFadeInUp}
        />
        <HeroImgShadowStyle
          alt="overlay"
          src="/assets/home/heroimgshadow.png"
          variants={varFadeInUp}
        />

        <HeroOverlayStyle
          alt="hero"
          src="/assets/home/bghero.png"
          variants={varFadeIn}
        />

        <Container maxWidth="xl">
          <ContentStyle>
            <Stack spacing={3}>
              <motion.div variants={varFadeInRight}>
                <Typography
                  variant="h2"
                  sx={{ color: "text.primary", mt: { xs: 30, md: 0 } }}
                >
                  Manage your data in easy and flexible way.
                </Typography>
              </motion.div>

              <motion.div variants={varFadeInRight}>
                <Typography sx={{ color: "text.primary" }}>
                  With FLEXlists you can create simple databases of anything you
                  want, with every field you need..
                </Typography>
              </motion.div>

              <motion.div variants={varFadeInRight}>
                <Typography
                  variant="caption"
                  sx={{
                    mx: "auto",
                    maxWidth: 630,
                    color: (theme) =>
                      theme.palette.mode === "light"
                        ? "text.secondary"
                        : "common.white",
                  }}
                >
                  Create lists of Tasks, Addresses, Todos, Songs, Books, Movies,
                  Wishes and more! And what about a glossary, a project plan or
                  bug tracking? It is all possible and easy!
                </Typography>
              </motion.div>

              <ButtonStyle variants={varFadeInRight}>
                <Button
                  size="large"
                  variant="contained"
                  sx={{ px: { xs: "10px" } }}
                  onClick={() => gotoSignup()}
                >
                  Sign up, it is free
                </Button>
                <Button size="large" variant="contained" sx={{ ml: "3px" }}>
                  Request a demo
                </Button>
              </ButtonStyle>
            </Stack>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: "100vh" } }} />
    </>
  );
}
