import React from "react";
import MainLayout from "src/layouts/view/MainLayout";
import WysiwygEditor from "src/components/wysiwyg-editor/wysiwyg";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Divider,
} from "@mui/material";
export default function newList() {
  return (
    <MainLayout removeFooter={true}>
      <Box
        sx={{
          display: "flex",
          bgcolor: "#fff",
        }}
      >
        <Box sx={{ py: 4, mx: 2, flexGrow: 1 }}>
          <Typography variant="h4">Create list</Typography>
          <Divider sx={{ my: 2 }} light />
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" gutterBottom>
              Name
            </Typography>
            <TextField fullWidth id="fullWidth" />
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Description
            </Typography>
            <WysiwygEditor />
          </Box>
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" gutterBottom>
              Category
            </Typography>
            <Select fullWidth displayEmpty>
              <MenuItem value="">
                <Typography variant="body1">Choose...</Typography>
              </MenuItem>
              <MenuItem>Category 1</MenuItem>
              <MenuItem>Category 2</MenuItem>
              <MenuItem>Category 3</MenuItem>
            </Select>
          </Box>
          <Button variant="contained">Create list</Button>
        </Box>
        {/* <Box sx={{ borderLeft: "solid 1px #ccc", p: 2 }}>
          <Typography variant="h4">List details</Typography>
          <Typography variant="body1">
            Color picker, users and their permissions
          </Typography>
        </Box> */}
      </Box>
    </MainLayout>
  );
}
