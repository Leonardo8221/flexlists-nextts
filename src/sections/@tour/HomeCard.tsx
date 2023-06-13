import { styled } from "@mui/material/styles";
import {
  Card,
  Button,
  Typography,
  CardHeader,
  CardContent,
} from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";

const CardIconStyle = styled("img")(({ theme }) => ({
  width: 40,
  height: 40,
  margin: "auto",
  marginTop: 20,
}));

type HomeCard = {
  icon: string;
  title?: string;
  description?: string;
  button: string;
};

export default function HomeCard({
  icon,
  title,
  description,
  button,
  ...other
}: HomeCard) {
  return (
    <Link href="#chosenTemplate" style={{ textDecoration: "none" }}>
      <Card
        component={motion.div}
        {...other}
        sx={{ margin: "auto", maxHeight: "260px", px: 4 }}
        whileHover={{ scale: 1.1 }}
      >
        <CardIconStyle src={icon} alt={title} />
        <CardHeader title={title} sx={{ textAlign: "center", px: 0 }} />
        <CardContent
          sx={{
            textAlign: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
            p: 0,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              whiteSpace: "nowrap",
              lineHeight: 1,
              color: (theme) =>
                theme.palette.mode === "light"
                  ? "text.secondary"
                  : "common.white",
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
