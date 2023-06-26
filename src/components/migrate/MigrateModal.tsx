import React from "react";
import { Modal, Box, Typography, Button, LinearProgress } from "@mui/material";
import {
  LinearProgressProps,
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#54A6FB",
  },
}));

function ProgressBar(props: LinearProgressProps & { value: number }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        my: 2,
      }}
    >
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body1" gutterBottom color="#54A6FB">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
      <Box sx={{ width: "100%", mr: 1 }}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
}

function MigrateModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(true);

  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 1 : prevProgress + 1
      );
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, []);

  // --------------------AUTO OPEN TOUR VIEW START----------------------------------------------------
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true); // set the state to true after 1 second
    }, 1);

    return () => clearTimeout(timer); // clear the timeout on component unmount
  }, []);

  useEffect(() => {
    const button = document.getElementById("auto-open");
    if (isOpen && button) {
      const clickTimer = setTimeout(() => {
        button.click(); // simulate a button click after 1 second
      }, 1);

      return () => clearTimeout(clickTimer); // clear the timeout on component unmount
    }
  }, [isOpen]);

  // --------------------AUTO OPEN TOUR VIEW END----------------------------------------------------

  return (
    <Box>
      {/* --------------------BUTTON THAT AUTO OPENS MODAL ON PAGE LOAD---------------------------------------------------- */}
      <Button
        onClick={handleOpen}
        id="auto-open"
        sx={{ display: "none" }}
      ></Button>
      {/* --------------------BUTTON THAT AUTO OPENS MODAL ON PAGE LOAD---------------------------------------------------- */}

      <Modal
        open={open}
        onClose={handleClose}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            minWidth: "300px",
            maxWidth: "600px",
            backgroundColor: "#fff",
            p: 4,
            borderRadius: 1,
            textAlign: "center",
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom variant="h5">
              Importing your data
            </Typography>
            <Typography sx={{ color: "#666" }} variant="body1" gutterBottom>
              We are importing your data from previous version of FlexLists,
              this will only take a minute and is one time operation.
            </Typography>
          </Box>
          <ProgressBar variant="determinate" value={progress} />
          <Typography sx={{ color: "#666" }} variant="body2">
            Please wait...
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}

export default MigrateModal;
