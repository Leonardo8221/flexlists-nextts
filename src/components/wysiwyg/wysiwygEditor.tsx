import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Box } from "@mui/material";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const styles = {};
type WysiwygEditorProps = {
  value: string;
  setValue: (editValue: string) => void;
};
const WysiwygEditor = ({ value, setValue }: WysiwygEditorProps) => {
  const handleEditorChange = (newValue: string) => {
    setValue(newValue);
  };
  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]
  return (
    <Box
      sx={{
        "& .ql-editor": {
          height: "250px",
        },
      }}
    >
      <ReactQuill
        // style={styles}
        modules={modules}
        formats={formats}
        value={value}
        onChange={(newValue, delta, source) => {
          if (source === "user") {
            handleEditorChange(newValue);
          }
        }}
      />
    </Box>
  );
};

export default WysiwygEditor;
