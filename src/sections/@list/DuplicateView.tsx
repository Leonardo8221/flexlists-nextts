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
type DuplicateViewProps = {
  open: boolean;
  handleClose: () => void;
};

const DuplicateView = ({ open, handleClose }: DuplicateViewProps) => {
  return (
    <CentralModal open={open} handleClose={handleClose}>
      <Typography variant="h6">Duplicate View</Typography>
      <Divider sx={{ my: 2 }}></Divider>
      <Box>
        <Typography variant="subtitle2">Name</Typography>
        <TextField
          fullWidth
          defaultValue="Untitled Base :)"
          placeholder="List Name"
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mt: 2 }}>
          Description
        </Typography>
        <TextField
          multiline
          rows={4}
          fullWidth
          defaultValue="Base description"
        />
      </Box>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Copy content"
        />
      </FormGroup>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button sx={{ mt: 2 }} variant="contained">
          Duplicate
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
export default DuplicateView;
