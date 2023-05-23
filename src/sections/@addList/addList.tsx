import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Grid,
  Container,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import HomeCard from "../@tour/HomeCard";
import { useState, useEffect } from "react";
import Link from "next/link";
import PlainSearchBar from "src/components/search-bar/PlainSearchBar";
import CategoriesSelect from "src/components/categories/categories";

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
    description: "Lorem ipsum dolor sit amet consectetur.",
    button: "Use template",
  },
  {
    icon: "/assets/icons/tour/ic_bug.svg",
    title: "Bug fixing",
    description: "Lorem ipsum dolor sit amet consectetur.",
    button: "Use template",
  },
];

export default function AddList() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [steps, setSteps] = useState(0);
  const [visibleMask, setVisibleMask] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);

    const closePopup = (e: any) => {
      if (e.target.classList.contains("tour_modal")) {
        handleClose();
        console.log(e);
      }
    };

    //  document.body.addEventListener('click', closePopup);
  }, []);

  const maskProperties = [
    {
      left: { xs: "115px", md: "215px" },
      top: { xs: "150px", md: "150px" },
      radius: { xs: "55px", md: "65px" },
    },
    {
      left: { xs: "115px", md: "325px" },
      top: { xs: "455px", md: "455px" },
      radius: { xs: "65px", md: "65px" },
    },
    {
      left: { xs: `${windowWidth - 96}px`, md: `${windowWidth - 118}px` },
      top: { xs: "24px", md: "24px" },
      radius: { xs: "20px", md: "20px" },
    },
    {
      left: { xs: `${windowWidth - 60}px`, md: `${windowWidth - 82}px` },
      top: { xs: "24px", md: "24px" },
      radius: { xs: "20px", md: "20px" },
    },
    {
      left: { xs: `${windowWidth - 23}px`, md: `${windowWidth - 40}px` },
      top: { xs: "24px", md: "24px" },
      radius: { xs: "20px", md: "20px" },
    },
    {
      left: { xs: "124px", md: "705px" },
      top: { xs: "25px", md: "25px" },
      radius: { xs: "25px", md: "30px" },
    },
  ];

  const [maskProperty, setMaskProperty] = useState(maskProperties[0]);

  const handleClickOpen = () => {
    setOpen(true);
    setVisibleMask(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSteps(0);
    setMaskProperty(maskProperties[0]);
    setVisibleMask(false);
  };

  const goPrevious = () => {
    setSteps(steps - 1);
    setMaskProperty(maskProperties[steps - 1]);
  };

  const goNext = () => {
    setSteps(steps + 1);
    setMaskProperty(maskProperties[steps + 1]);
  };

  const MaskedBackground = styled("div")(({ theme }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(84, 166, 251, 0.5)",
    pointerEvents: "none",
    mask: `radial-gradient(circle at ${maskProperty.left.xs} ${maskProperty.top.xs}, transparent ${maskProperty.radius.xs}, black 0)`,
    zIndex: 10000,
    [theme.breakpoints.up("md")]: {
      mask: `radial-gradient(circle at ${maskProperty.left.md} ${maskProperty.top.md}, transparent ${maskProperty.radius.md}, black 0)`,
    },
  }));

  return (
    <>
      <Container
        sx={{
          py: 3,
          maxWidth: "inherit !important",
          overflow: "auto",
          height: `${windowHeight - 96}px`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Your core files.</Typography>
          <Link href="/main/addList">
            <Button size="medium" variant="contained">
              Create new
            </Button>
          </Link>
        </Box>
        <Box sx={{ py: 6 }}>
          <Typography variant="body1">You have 0 files created.</Typography>
        </Box>
        <Divider light sx={{ py: 1 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 2,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Typography variant="h6" gutterBottom>
            Most popular templates
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: { xs: "center", md: "flex-end" },
              flexDirection: { xs: "column-reverse", md: "row" },
            }}
          >
            <CategoriesSelect />
            <PlainSearchBar />
          </Box>
        </Box>
        <Grid container spacing={3}>
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
      {visibleMask && <MaskedBackground />}
    </>
  );
}
