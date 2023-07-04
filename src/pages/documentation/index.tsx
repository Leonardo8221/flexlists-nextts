import React from "react";
import MainLayout from "src/layouts/docs/MainLayout";
import { Typography, Container } from "@mui/material";

function index() {
  return (
    <>
      <MainLayout>
        <Container
          sx={{
            display: "grid",
            placeContent: "center",
            height: "calc(100vh - 136px)",
          }}
          maxWidth="xl"
        >
          <Typography variant="h1">Documentation page</Typography>
        </Container>
      </MainLayout>
    </>
  );
}

export default index;
