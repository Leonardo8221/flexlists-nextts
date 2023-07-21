import { Button, Box, Container, Typography, Grid, List } from "@mui/material";
import { useRouter } from "next/router";
import { getTranslations, getTranslation } from "src/utils/i18n";
import { ArrowOutward as DiscoverMoreIcon } from "@mui/icons-material/";
import { motion } from "framer-motion";
import { TranslationText } from "src/models/SharedModels";

type ContentProps = {

};

export default function LandingHero({ translations }: ContentProps & { translations: TranslationText[] }) {
  const t = (key: string): string => {
    return getTranslation(key, translations)
  }
  const router = useRouter();
  const gotoSignup = async () => {
    await router.push({
      pathname: "/auth/register",
    });
  };
  return (
    <Box
      sx={{
        // marginTop: { xs: "64px", md: "88px" },
        minHeight: "calc(100vh - 144px)",
      }}
    >
      <Box
        sx={{
          background: "#fafafa",
        }}
      >
        <Container maxWidth="xl" sx={{ position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 3,
              py: { xs: 4, md: 16 },
              px: 2,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {/* <Typography variant="h1">
              Manage your data in easy and flexible way.
            </Typography> */}
            <Typography
              variant="h2"
              component={motion.h2}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              {t("Title")}
            </Typography>
            <Typography
              variant="body1"
              component={motion.p}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <span dangerouslySetInnerHTML={{ __html: t("Body") }} />

            </Typography>
            {/* <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box
                sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}
              >
                <Typography variant="body1">&#9989; Tasks </Typography>
                <Typography variant="body1">&#9989; Addresses </Typography>
                <Typography variant="body1">&#9989; Todos </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}
              >
                <Typography variant="body1">&#9989; Wishes </Typography>
                <Typography variant="body1">&#9989; Movies </Typography>
                <Typography variant="body1">&#9989; Books </Typography>
                <Typography variant="body1">&#9989; Songs </Typography>
              </Box>
            </List> */}
            <Box
              component={motion.div}
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 2.2 }}
              sx={{
                display: "flex",
                gap: 3,
                width: { xs: "100%", md: "600px" },
                mt: { xs: 0, md: 4 },
                mb: { xs: 4, md: 0 },
              }}
            >
              <Button
                size="large"
                variant="contained"
                sx={{ flex: 1, fontSize: 16 }}
                onClick={() => gotoSignup}
              >
                {t('Sign up now')}
              </Button>
              <Button
                size="large"
                variant="text"
                sx={{
                  flex: 1,
                  fontSize: 16,
                  backgroundColor: "#111",
                  color: "#fff",
                  "&:hover": {
                    color: "#111",
                  },
                }}
              >
                {t('Try now')}
                <DiscoverMoreIcon
                  sx={{
                    ml: 1,
                    transform: "rotate(45deg)",
                    transition: "transform ease .5s",
                    ".MuiButton-text:hover &": {
                      transform: "rotate(0)",
                    },
                  }}
                />
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container
        maxWidth="xl"
        sx={{ position: "relative", minHeight: { xs: "30vh", md: "80vh" } }}
        component={motion.div}
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
      >
        <Box
          component={motion.img}
          alt="hero-img"
          src="\assets\home\heroimg.png"
          sx={{
            boxShadow: "0 4px 24px 0 rgba(0,0,0,0.1)",
            maxWidth: "100%",
            maxHeight: "100%",
            position: "absolute",
            top: { xs: "-24px", md: "-64px" },
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: 2,
          }}
        />
      </Container>

      {/* <Box
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          width: "100%",
          minHeight: 88,
          backgroundColor: "#fafafa",
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              component="img"
              alt="Logo"
              src="\assets\home\nike.png"
              height={64}
              sx={{ opacity: 0.2 }}
            />
            <Box
              component="img"
              alt="Logo"
              src="\assets\home\nike.png"
              height={64}
              sx={{ opacity: 0.2 }}
            />
            <Box
              component="img"
              alt="Logo"
              src="\assets\home\nike.png"
              height={64}
              sx={{ opacity: 0.2 }}
            />
            <Box
              component="img"
              alt="Logo"
              src="\assets\home\nike.png"
              height={64}
              sx={{ opacity: 0.2 }}
            />
            <Box
              component="img"
              alt="Logo"
              src="\assets\home\nike.png"
              height={64}
              sx={{ opacity: 0.2 }}
            />
          </Box>
        </Container>
      </Box> */}
    </Box>
  );
}
