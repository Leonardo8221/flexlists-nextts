import React from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  Button,
  CardHeader,
  Link,
  CardContent,
  Card,
  Divider,
} from "@mui/material";
import HomeCard from "src/sections/@tour/HomeCard";
import PlainSearchBar from "src/components/search-bar/PlainSearchBar";
import CategoriesSelect from "src/components/categories/categories";
import MainLayout from "src/layouts/view/MainLayout";
import { motion } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";

const HomeCards = [
  {
    icon: "/assets/icons/tour/ic_tick.svg",
    title: "Todo list",
    description: "Lorem ipsum dolor sit amet consectetur.",
    button: "Use template",
  },
  {
    icon: "/assets/icons/tour/ic_music.svg",
    title: "Music playlist",
    description: "Lorem ipsum dolor sit amet consectetur.",
    button: "Use template",
  },
  {
    icon: "/assets/icons/tour/ic_project_m.svg",
    title: "Project management",
    description:
      "Lorem ipsum dolor sit amet consectetur.eweffasfsafdasasdasfsddscyasdfasfasfasdfasdasdsadasda",
    button: "Use template",
  },
  {
    icon: "/assets/icons/tour/ic_bug.svg",
    title: "Bug fixing",
    description: "Lorem ipsum dolor sit amet consectetur.",
    button: "Use template",
  },
];

function chooseTemplate() {
  return (
    <MainLayout>
      <Container
        sx={{
          py: 3,
          maxWidth: "inherit !important",
          overflow: "auto",
          height: "calc(100vh - 96px)",
          backgroundColor: "#fff",
        }}
      >
        <Box>
          <Typography variant="h6" gutterBottom>
            Most popular templates
          </Typography>
          <Typography variant="body2">
            Elevate your productivity and effortlessly streamline your tasks
            with the user-friendly templates on FlexLists.com, allowing you to
            choose pre-made templates or unleash your creativity to create
            stunning views from scratch.
          </Typography>
        </Box>
        <Divider light sx={{ my: 4 }}></Divider>
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "center" },
            flexDirection: { xs: "column-reverse", md: "row" },
          }}
        >
          <CategoriesSelect />
          <PlainSearchBar />
        </Box>
        <Grid container spacing={3} sx={{ my: 0 }}>
          <Grid item xs={12} sm={6} md={2}>
            <Card
              component={motion.div}
              sx={{
                margin: "auto",
                height: 160,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                flexDirection: "column",
              }}
              whileHover={{ scale: 1.1 }}
            >
              <CardContent sx={{ p: 0 }}>
                <Link href="/main/views/newView">
                  <Button
                    variant="contained"
                    sx={{
                      textAlign: "center !important",
                      minWidth: 32,
                      aspectRatio: "1 / 1",
                      borderRadius: "100px",
                    }}
                  >
                    <AddIcon />
                  </Button>
                </Link>
              </CardContent>
              <CardHeader
                title="New from scratch"
                sx={{ textAlign: "center", py: 0 }}
              />
            </Card>
          </Grid>
          {HomeCards.map((card: any) => {
            return (
              <Grid item xs={12} sm={6} md={2} key={card.icon}>
                <HomeCard
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  button={card.button}
                ></HomeCard>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </MainLayout>
  );
}

export default chooseTemplate;