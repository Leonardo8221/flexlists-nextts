import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
} from "@mui/material/";

type FeatureCard = {
  icon: string;
  title?: string;
  description?: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
  ...other
}: FeatureCard) {
  return (
    <Card
      sx={{
        width: { xs: "calc(50% - 8px)", md: "calc(25% - 18px)" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        pt: 4,
        textAlign: "center",
      }}
      {...other}
    >
      <Avatar
        sx={{ bgcolor: "#54A6FB11", height: "64px", width: "64px" }}
        aria-label="recipe"
      >
        {icon}
      </Avatar>
      <CardHeader title={title} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
