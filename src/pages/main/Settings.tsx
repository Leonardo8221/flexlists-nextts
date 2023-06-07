import React from "react";
import { Container, Grid, Box } from "@mui/material";
import VerticalTabs from "src/components/profile-settings/VerticalTabs";
import MainLayout from "src/layouts/view/MainLayout";

function Settings() {
  return (
    <MainLayout disableOverflow={true}>
      <Container
        sx={{
          boxShadow: "0 0 24px 0 rgba(0,0,0,0.05)",
          position: "relative",
          mt: 4,
          mx: { lg: 4 },
          p: 0,
          pl: { md: 0 },
          overflow: "hidden",
          minHeight: "calc(100vh - 153px)",
          maxHeight: "calc(100vh - 153px)",
        }}
        maxWidth="xl"
      >
        <VerticalTabs />
      </Container>
    </MainLayout>
  );
}

export default Settings;
