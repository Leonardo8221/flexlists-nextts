import { Button, Box, Container, Typography, Grid, List } from "@mui/material";
import { useRouter } from "next/router";
import { getTranslations, getTranslation } from "src/utils/i18n";
import { ArrowOutward as DiscoverMoreIcon } from "@mui/icons-material/";
import { motion } from "framer-motion";
import { GetServerSideProps } from "next";
import { TranslationText } from "src/models/SharedModels";

type ContentProps = {

};

function LandingHero({ translations }: ContentProps & { translations: TranslationText[] }) {
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
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              {t("Existing Landing Hero Title")}
              Exciting News! Your Trusted Flexlists Product is About to Get a
              Whole Lot Better!
            </Typography>
            <Typography
              variant="body1"
              component={motion.p}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              {t("Existing Landing Hero Title")}
              Dear Valued User, As a loyal user of our database product we want
              to share some great news with you. We&apos;re thrilled to announce
              that our team has been working tirelessly over the past 12 months
              on a significant update to the platform, which will soon be
              relaunched with cutting-edge features and improvements. Thanks to
              successful funding, we have been able to invest in the development
              of this <strong>new version</strong> , incorporating{" "}
              <strong>advanced technology</strong>{" "}
              <strong>user-requested features</strong> and that will greatly
              enhance your experience. In the upcoming days, you will hear more
              about the official launch of this upgraded product. <br />
              <br />
              Please <strong>sign up</strong> for the product launch
              information. Some of the fantastic new features in the updated
              product include:
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
              animate={{ x: 0, opacity: 1 }}
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
                Sign up now
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
                Try now{" "}
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
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
      >
        <Box
          component="img"
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
export const getServerSideProps: GetServerSideProps = async (context) => {
  return await getTranslations("existing landing hero", context)
}
export default LandingHero;