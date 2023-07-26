import { Box, Container, Typography, Grid, Button } from "@mui/material";
import React from "react";
import MainLayout from "src/layouts/main/MainLayout";
import MainSolutions from "src/components/solutions/MainSolutions";

export default function solutions() {
  return (
    <MainLayout>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
                molestiae.
              </Typography>
              <Typography variant="body1" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aliquam, beatae ipsa ea vitae saepe ut?
              </Typography>
              <Button variant="contained">Try Demo</Button>
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
                  mt: { xs: 2, md: 0 },
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <MainSolutions />
    </MainLayout>
  );
}
