import React from "react";
import {
  Box,
  Button,
  Divider,
  Checkbox,
  FormGroup,
  TextField,
  Typography,
  FormControlLabel,
} from "@mui/material";
import CentralModal from "src/components/modal/CentralModal";
type DeleteViewProps = {
  open: boolean;
  handleClose: () => void;
};

const DeleteView = ({ open, handleClose }: DeleteViewProps) => {
  return (
    <CentralModal open={open} handleClose={handleClose}>
      <Typography variant="h6">Delete View</Typography>
      <Divider sx={{ my: 2 }}></Divider>
      <Box>
        <Typography variant="body1">
          Are you sure you want to delete this view?
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button sx={{ mt: 2 }} variant="contained">
          Delete
        </Button>
        <Button
          onClick={handleClose}
          sx={{ mt: 2, ml: 2, color: "#666" }}
          variant="text"
        >
          Cancel
        </Button>
      </Box>
    </CentralModal>
  );
};
export default DeleteView;
