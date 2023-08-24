import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type Props = {
  toolbar: any;
  onClick?: (e: any) => void;
};

export default function ToolBarItem({ toolbar, onClick }: Props) {
  const theme = useTheme();

  return (
    <Box
      key={toolbar.title}
      className="toolbar_item"
      sx={{
        display: "flex",
        cursor: "pointer",
        // marginBottom: isDesktop ? 'inherit' : 1,
        // marginRight: "6px",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      <Box
        component="span"
        className="svg-color"
        sx={{
          width: 18,
          height: 18,
          display: "inline-block",
          bgcolor: theme.palette.palette_style.text.primary,
          mask: `url(/assets/icons/${toolbar.icon}.svg) no-repeat center / contain`,
          WebkitMask: `url(/assets/icons/${toolbar.icon}.svg) no-repeat center / contain`,
          marginRight: 1,
          // marginTop: 0.2,
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            fontSize: "16px",
            color: theme.palette.palette_style.text.primary,
          }}
        >
          {toolbar.title}
        </Box>
      </Box>
    </Box>
  );
}
