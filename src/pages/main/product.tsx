import { Box, Container, Typography, Grid, Button } from "@mui/material";
import React from "react";
import MainLayout from "src/layouts/main/MainLayout";

export default function product() {
  return (
    <MainLayout>
      <Box sx={{ mt: "144px" }}>
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            <Grid item xs={12} md={5}>
              <Typography variant="h3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
                molestiae.
              </Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aliquam, beatae ipsa ea vitae saepe ut?
              </Typography>
              <Button variant="contained">Try Demo</Button>
            </Grid>
            <Grid item xs={12} md={7}>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/eEzD-Y97ges"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </MainLayout>
  );
}
