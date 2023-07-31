import { Box, Container, Typography, Button } from "@mui/material";
import { ArrowOutward as DiscoverMoreIcon } from "@mui/icons-material/";
import React from "react";

export default function LandingCTA() {
  return (
    <Box sx={{ m: 2 }}>
      <Container
        maxWidth="xl"
        sx={{
          background:
            "linear-gradient(315deg, hsla(211, 95%, 66%, 1) 0%, hsla(211, 56%, 49%, 1) 71%)",
          py: 8,
          textAlign: "center",
          borderRadius: 4,
          color: "#fff",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            px: { xs: 4, md: 8 },
          }}
        >
          Try the new Flexlists using your existing data in complete safety!
          <br />
          Import your data into the new version of Flexlists, and try it.
        </Typography>
        <Button
          size="large"
          variant="text"
          sx={{
            fontSize: 16,
            backgroundColor: "#fff",
            color: "#111",
            mt: 4,
            px: 8,
            transition: "all ease .5s",
            "&:hover": {
              color: "#fff",
              backgroundColor: "#111",
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
        <Typography variant="body2" sx={{ mt: 4 }}>
          Your original data remains untouched and you can always revert back.
        </Typography>
      </Container>
    </Box>
  );
}
