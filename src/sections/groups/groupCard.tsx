import { styled } from "@mui/material/styles";
import {
  Card,
  Typography,
  CardHeader,
  CardContent,
  Avatar,
  Box,
} from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { PATH_MAIN } from "src/routes/paths";

// const CardIconStyle = styled("img")(({ theme }) => ({
//   width: 40,
//   height: 40,
//   margin: "auto",
//   marginTop: 20,
// }));

type GroupCard = {
  groupId: number;
  icon: JSX.Element;
  title?: string;
  description?: string;
};

export default function GroupCard({
  groupId,
  icon,
  title,
  description,
  ...other
}: GroupCard) {
  const router = useRouter();
  return (
    <Link
      href=""
      onClick={() => {
        router.push(`${PATH_MAIN.groups}/${groupId}`);
      }}
      style={{ textDecoration: "none" }}
    >
      <Card
        component={motion.div}
        {...other}
        sx={{
          margin: "auto",
          maxHeight: "260px",
          px: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        whileHover={{ scale: 1.1 }}
      >
        {/* <CardIconStyle src={icon} alt={title} /> */}
        <Box sx={{ pt: 3 }}>
          <Avatar sx={{ backgroundColor: "green" }}>{icon}</Avatar>
        </Box>
        <CardHeader
          title={title}
          sx={{
            textAlign: "center",
          }}
        />
        <CardContent
          sx={{
            textAlign: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
            pt: 0,
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