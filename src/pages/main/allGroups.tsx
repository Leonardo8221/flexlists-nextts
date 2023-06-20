import React from "react";
import { Container, Box, Typography, Button, Grid } from "@mui/material";
import MainLayout from "src/layouts/view/MainLayout";
import GroupCard from "src/components/groups/groupCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CampaignIcon from "@mui/icons-material/Campaign";

const GroupCards = [
  {
    icon: <AttachMoneyIcon />,
    title: "Sales",
    description: "14 members",
  },
  {
    icon: <CampaignIcon />,
    title: "Marketing",
    description: "7 members",
  },
];

function allGroups() {
  return (
    <>
      <MainLayout>
        <Container
          sx={{
            py: 3,
            maxWidth: "inherit !important",
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">All groups.</Typography>
            <Button size="medium" variant="contained">
              Create new group
            </Button>
          </Box>
          <Grid
            container
            spacing={3}
            sx={{
              pt: 3,
            }}
          >
            {GroupCards.map((card) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={2}
                  key={"/assets/home/heroimg.png"}
                >
                  <GroupCard
                    icon={card.icon}
                    title={card.title}
                    description={card.description}
                  ></GroupCard>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </MainLayout>
    </>
  );
}

export default allGroups;
