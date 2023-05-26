import {
  Modal,
  Typography,
  Box,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  TextField,
  Divider,
  Button,
  Avatar,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import ListAccess from "src/components/list-access/ListAccess";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const style = {
  position: "absolute" as "absolute",
  padding: 2,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", md: "50%" },
  maxHeight: "80vh",
  backgroundColor: "white",
  border: "none",
  borderRadius: "8px",
  boxShadow: 24,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
};

const scaleUp = {
  hidden: {
    x: "-50%",
    y: "-50%",
    scale: 0.5,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
      type: "spring",
      damping: 30,
      stiffness: 700,
    },
  },
  close: {
    opacity: 0,
  },
};

const ShareList = (props: Props) => {
  const { open, handleClose } = props;
  const closeModal = () => {
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        component={motion.div}
        variants={scaleUp}
        initial="hidden"
        animate="visible"
        exit="close"
      >
        <Typography gutterBottom variant="h5" sx={{ my: 1 }}>
          Share
        </Typography>

        <Typography gutterBottom variant="body2" sx={{ my: 1 }}>
          You can also let us mail the URL to the other users with the following
          form.
        </Typography>
        <Divider sx={{ my: 1 }}></Divider>
        <Box>
          <FormLabel>
            <Typography variant="subtitle1">People with access:</Typography>
          </FormLabel>
          <ListAccess />
          <Divider sx={{ my: 1 }}></Divider>
        </Box>
        <FormControl sx={{ my: 1 }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="read-only"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="read-only"
              control={<Radio />}
              label={<Typography variant="body2">Read Only</Typography>}
            />
            <FormControlLabel
              value="read-add"
              control={<Radio />}
              label={<Typography variant="body2">Read/Add</Typography>}
            />
            <FormControlLabel
              value="read-edit"
              control={<Radio />}
              label={
                <Typography variant="body2">
                  Read and Edit permissions
                </Typography>
              }
            />
            <FormControlLabel
              value="full-access"
              control={<Radio />}
              label={
                <Typography variant="body2">
                  Full Management permissions
                </Typography>
              }
            />
          </RadioGroup>
        </FormControl>
        <TextField sx={{ my: 1 }} placeholder="Email address" />
        <FormLabel sx={{ fontSize: 14 }} id="multiple-email-address">
          (separate multiple addresses with a comma)
        </FormLabel>
        <Button variant="contained" sx={{ my: 2, width: "25%" }}>
          Send
        </Button>
      </Box>
    </Modal>
  );
};

export default ShareList;
