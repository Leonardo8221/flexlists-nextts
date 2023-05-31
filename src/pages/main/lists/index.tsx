import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import MainLayout from "src/layouts/view/MainLayout";
import Views from "src/sections/@view/views";

export default function ListPage() {
  const theme = useTheme();

  return (
    <MainLayout>
      <Box
        sx={{
          backgroundColor: theme.palette.palette_style.background.default,
          width: "100%",
          height: { xs: "calc(100% - 8px)", lg: "100%" },
          overflow: "hidden",
        }}
      >
        <Views />
      </Box>
    </MainLayout>
  );
}
