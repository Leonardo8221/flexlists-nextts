import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const quillStyles = `
  .ql-container {
    border: none !important;
  }
`;
type WysiwygViewProps = {
  value: string;
};
const WysiwygView = ({ value }: WysiwygViewProps) => {
  
  return (
    <div>
    <style>{quillStyles}</style>
    <ReactQuill
        value={value}
        readOnly={true}
        theme="snow"
        modules={{ toolbar: false }}
    />
    </div>
  );
};

export default WysiwygView;
