import React from "react";
import { Box, Container, Typography } from "@mui/material";
import TabView from "./tab-view/TabView";

function ViewsPresentation() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Container maxWidth="xl">
        <Typography gutterBottom variant="h2" sx={{ textAlign: "center" }}>
          Show your data using multiple views
        </Typography>
        <Typography
          gutterBottom
          variant="body1"
          sx={{ textAlign: "center", my: { xs: 2, md: 4 } }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. At animi
          repellendus optio sunt earum, iure pariatur veritatis blanditiis quia
          exercitationem suscipit inventore amet totam, tempora ducimus
          voluptates placeat? Corrupti nihil, ipsa atque maxime alias ex?
          Praesentium suscipit dignissimos nostrum nulla?
        </Typography>
        <TabView />
      </Container>
    </Box>
  );
}

export default ViewsPresentation;
