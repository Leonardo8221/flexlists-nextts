import { Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

const HTMLEditor = ({
  id,
  name,
  value,
  handleChange,
  preview,
}: {
  id: number;
  name: string;
  value: string;
  handleChange: (newValue: string) => void;
  preview?: boolean;
}) => {
  return !preview ? (
    <Box
      key={id}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        position: "relative",
        height: "300px",
        paddingBottom: "50px",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          textTransform: "capitalize",
          color: "rgba(0, 0, 0, 0.6)",
          fontSize: "12px",
          position: "absolute",
          top: "-10px",
          left: "12px",
          background: "#fff",
          px: 0.5,
        }}
      >
        {name}
      </Typography>
      <ReactQuill
        theme="snow"
        value={value}
        style={{ width: "97%", height: "100%" }}
        onChange={handleChange}
      />
    </Box>
  ) : (
    <div className="focusedNeed" tabIndex={8}>
      <Box
        key={id}
        className="markdownBox"
        sx={{
          border: "1px solid rgba(158, 158, 158, 0.32)",
          p: 2,
          position: "relative",
          borderRadius: "6px",
          ".focusedNeed:focus &": {
            border: "2px solid #1976d2",
          },
          "&:hover": {
            border: "1px solid rgba(0, 0, 0, 0.87)",
          },
        }}
      >
        <Typography
          variant="body2"
          component={"label"}
          sx={{
            textTransform: "capitalize",
            fontSize: 12,
            position: "absolute",
            top: "-10px",
            left: "10px",
            background: "#fff",
            zIndex: 2,
            px: 0.5,
            color: "rgba(0, 0, 0, 0.6)",
            ".focusedNeed:focus &": {
              color: "#1976d2",
              top: "-11px",
              left: "9px",
            },
          }}
        >
          {name}
        </Typography>
        <Box
          className="htmlViewer"
          dangerouslySetInnerHTML={{
            __html: value?.toString(),
          }}
          sx={{
            ".focusedNeed:focus &": {
              margin: "-1px",
            },
          }}
        />
      </Box>
    </div>
  );
};

export default HTMLEditor;
