import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { PATH_MAIN } from "src/routes/paths";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import WysiwygView from "src/components/wysiwyg/wysiwygView";

const CardImage = styled("img")(({ theme }) => ({
  height: 140,
  margin: "0 auto",
}));

type ViewCardProps = {
  id: number;
  bgImage: string;
  viewName?: string;
  viewDesc?: string;
};

export default function ViewCard({
  id,
  bgImage,
  viewName,
  viewDesc,
  ...other
}: ViewCardProps) {
  const router = useRouter();
  const openViewDetail = async (id: number) => {
    await router.push(`${PATH_MAIN.views}/${id}`);
  };
  const theme = useTheme();
  return (
    <Card
      onClick={() => openViewDetail(id)}
      sx={{ cursor: "pointer" }}
      component={motion.div}
      whileHover={{ scale: 1.1 }}
    >
      <CardImage sx={{ mt: 2 }} src={bgImage} />
      <CardContent sx={{ py: 2 }}>
        <Typography gutterBottom variant="h6" component="div">
          {viewName}
        </Typography>
        <WysiwygView
                value={viewDesc}
            />
        {/* <Typography
          sx={{
            maxHeight: 64,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          variant="body2"
          color="text.secondary"
          component={"div"}
        >
          {viewDesc}
        </Typography> */}
      </CardContent>
      {/* <CardActions sx={{ px: 3, py: 2 }}>
        <Button variant="contained" size="small">
          Open
        </Button>
      </CardActions> */}
    </Card>
  );
}
