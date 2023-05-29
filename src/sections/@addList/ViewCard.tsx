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
  viewName?: string;
  viewDesc?: string;
};

export default function ViewCard({
  bgImage,
  viewName,
  viewDesc,
  ...other
}: ViewCard) {
  return (
    <Card>
      <CardImage sx={{ mt: 2 }} src={bgImage} />
      <CardContent sx={{ py: 2 }}>
        <Typography gutterBottom variant="h5" component="div">
          {viewName}
        </Typography>
        <Typography
          sx={{
            maxHeight: 64,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          variant="body2"
          color="text.secondary"
          component={"div"}
        >
          {viewDesc}
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
