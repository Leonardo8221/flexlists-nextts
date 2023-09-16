import { Box, Container, Typography, Grid, Button } from "@mui/material";
import React from "react";
import MainLayout from "src/layouts/main/MainLayout";
import MainFeatures from "src/components/products/MainFeatures";
import { LandingPricingPlans } from "src/components/landing";
import { GetServerSideProps } from "next";
import { TranslationText } from "src/models/SharedModels";
import { getTranslations, getTranslation } from "src/utils/i18n";

type ProductProps = {
  translations: TranslationText[];
};

const Product = ({
  translations
}: ProductProps) => {
  const t = (key: string): string => {
    if (!translations) return key;
    return getTranslation(key, translations);
  };

  return (
    <MainLayout translations={translations}>
      <Box
        sx={{
          mt: { xs: "64px", md: "88px" },
          background: "#fafafa",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            columnSpacing={8}
            sx={{ alignItems: "center", minHeight: "80vh", zIndex: 4 }}
          >
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 1, md: 2 },
                justifyContent: "center",
                alignItems: { xs: "center", md: "flex-start" },
              }}
            >
              <Typography variant="h3" gutterBottom>
                {t("Title")}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {t("Description")}
              </Typography>
              <Button variant="contained">{t("Try Demo Button")}</Button>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box
                component={"img"}
                src="/assets/home/heroimg.png"
                alt="placeholder"
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  boxShadow: "0 0 12px 0 rgba(0,0,0,.1)",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <MainFeatures translations={translations} />
      <LandingPricingPlans translations={translations} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await getTranslations("existing product", context);
};

export default Product;