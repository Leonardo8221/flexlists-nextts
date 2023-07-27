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
    <div key={id}>
      <Typography variant="subtitle2" sx={{ textTransform: "uppercase" }}>
        {name}
      </Typography>
      <div
        dangerouslySetInnerHTML={{
          __html: value?.toString(),
        }}
      />
    </div>
  );
};

export default HTMLEditor;