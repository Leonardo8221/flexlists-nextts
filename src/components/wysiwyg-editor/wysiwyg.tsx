import React, { useState } from 'react';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { Box } from '@mui/material';

const styles = {
  height: "300px"
}

const WysiwygEditor: React.FC = () => {
  const [editorValue, setEditorValue] = useState<string>('');

  const handleEditorChange = (value: string) => {
    setEditorValue(value);
  };

  return (
    <Box sx={{minHeight: "400px"}}>
      <ReactQuill style={styles} value={editorValue} onChange={handleEditorChange} />
    </Box>
  );
};

export default WysiwygEditor;
