import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Box } from "@mui/material";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const styles = {
  height: "300px",
};
type WysiwygEditorProps = {
  value: string;
  setValue: (editValue: string) => void;
};
const WysiwygEditor = ({ value, setValue }: WysiwygEditorProps) => {
  const handleEditorChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ minHeight: "400px" }}>
      <ReactQuill style={styles} value={value} onChange={handleEditorChange} />
    </Box>
  );
};

export default WysiwygEditor;
