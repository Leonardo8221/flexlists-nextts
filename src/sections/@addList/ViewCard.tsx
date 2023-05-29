import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const CardImage = styled("img")(({ theme }) => ({
  height: 140,
  margin: "0 auto",
}));

type ViewCard = {
  bgImage: string;
};

export default function ViewCard({ bgImage, ...other }: ViewCard) {
  return (
    <Card>
      <CardImage sx={{ mt: 2 }} src={bgImage} />
      <CardContent sx={{ py: 2 }}>
        <Typography gutterBottom variant="h5" component="div">
          View Name
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View description - Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Officiis, fugiat!
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 3, py: 2 }}>
        <Button variant="contained" size="small">
          Open View
        </Button>
      </CardActions>
    </Card>
  );
}
