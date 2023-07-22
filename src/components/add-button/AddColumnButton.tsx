import { useTheme } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import ViewWeekOutlinedIcon from "@mui/icons-material/ViewWeekOutlined";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  modalHandle: (value: boolean) => void;
}

export default function AddColumnButton({ modalHandle }: Props) {
  const theme = useTheme();

  return (
    // <Box
    //   component="span"
    //   onClick={() => modalHandle(true)}
    //   className="svg-color"
    //   sx={{
    //     width: 18,
    //     height: 18,
    //     display: "inline-block",
    //     bgcolor: theme.palette.palette_style.text.primary,
    //     mask: `url(/assets/icons/table/plus.svg) no-repeat center / contain`,
    //     WebkitMask: `url(/assets/icons/table/plus.svg) no-repeat center / contain`,
    //     cursor: "pointer",
    //   }}
    // />
    <Button
      onClick={() => modalHandle(true)}
      fullWidth
      size="large"
      variant="contained"
    >
      <AddIcon sx={{ mr: 1 }} />
      Edit Fields
    </Button>
  );
}
