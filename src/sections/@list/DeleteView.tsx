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
import { useRouter } from "next/router";
import { listViewService } from "src/services/listView.service";
import { isSucc } from "src/models/ApiResponse";
import { PATH_MAIN } from "src/routes/paths";
type DeleteViewProps = {
  viewId: number;
  open: boolean;
  handleClose: () => void;
};

const DeleteView = ({ viewId, open, handleClose }: DeleteViewProps) => {
  const router = useRouter();
  const onSubmit = async () => {
    let response = await listViewService.softDeleteView(viewId)
    if (isSucc(response)) {
      await router.push(PATH_MAIN.views)
    }
  }
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
        <Button sx={{ mt: 2 }} variant="contained" onClick={() => onSubmit()}>
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
