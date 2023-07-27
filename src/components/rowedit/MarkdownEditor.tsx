import { Box, Typography, TextField } from "@mui/material";
import ReactMarkdown from "react-markdown";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import remarkGfm from "remark-gfm";

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
    <div
      key={id}
      style={{
        border: "1px solid rgba(158, 158, 158, 0.32)",
        paddingBlock: 8,
        paddingInline: 8,
        position: "relative",
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
          background: "#fff",
          zIndex: 2,
          px: 0.5,
          color: "rgba(0, 0, 0, 0.6)",
        }}
      >
        {name}
      </Typography>
      <div className="markdownWrapper">
        <ReactMarkdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
          {value}
        </ReactMarkdown>
      </div>
    </div>
  );
};
export default MarkdownEditor;
