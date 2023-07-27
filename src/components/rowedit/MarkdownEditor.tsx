import { Box, Typography, TextField } from "@mui/material";
import ReactMarkdown from "react-markdown";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import remarkGfm from "remark-gfm";
import { useTheme } from "@mui/styles";

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
  const theme = useTheme();
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
    <div className="focusedNeed" tabIndex={8}>
      <Box
        key={id}
        //   component={"input"}
        className="markdownBox"
        sx={{
          border: "1px solid rgba(158, 158, 158, 0.32)",
          p: 2,
          position: "relative",
          borderRadius: "6px",
          boxSizing: "border-box",
          ".focusedNeed:focus &": {
            border: "2px solid #1976d2",
            outline: 0,
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
        <div className="markdownWrapper">
          <ReactMarkdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
            {value}
          </ReactMarkdown>
        </div>
      </Box>
    </div>
  );
};
export default MarkdownEditor;
