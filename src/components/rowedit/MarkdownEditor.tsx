import { Box, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";

const SimpleMdeReact = dynamic(
  () => {
    return import("react-simplemde-editor");
  },
  { ssr: false }
);

const MarkdownEditor = ({
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
          zIndex: 2,
        }}
      >
        {name}
      </Typography>
      <SimpleMdeReact
        value={value}
        style={{ width: "100%" }}
        onChange={handleChange}
      />
    </Box>
  ) : (
    <div key={id}>
      <Typography variant="subtitle2" sx={{ textTransform: "uppercase" }}>
        {name}
      </Typography>
      <ReactMarkdown>{value}</ReactMarkdown>
    </div>
  );
};
export default MarkdownEditor;
