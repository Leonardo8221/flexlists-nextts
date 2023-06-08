import React from "react";

import { Box, Modal, Button, Typography, TextField } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 400, md: 600 },
  bgcolor: "background.paper",
  border: "none",
  boxShadow: "none",
  p: 4,
  borderRadius: "8px",
};

function ChangePassword() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        Change password
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Change your password
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Typography
              id="modal-modal-title"
              variant="subtitle2"
              component="span"
            >
              Current Password
            </Typography>
            <TextField fullWidth />
          </Box>
          <Box sx={{ mb: 4 }}>
            <Typography
              id="modal-modal-title"
              variant="subtitle2"
              component="span"
            >
              New Password
            </Typography>
            <TextField fullWidth />
          </Box>
          <Box sx={{ mb: 4 }}>
            <Typography
              id="modal-modal-title"
              variant="subtitle2"
              component="span"
            >
              Confirm New Password
            </Typography>
            <TextField fullWidth />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Button variant="contained" disabled>
              Update
            </Button>
            <Button sx={{ ml: 2 }} onClick={handleClose} variant="text">
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ChangePassword;
