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
  InputAdornment,
  Divider,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { motion } from "framer-motion";
import { getShareURL } from "src/services/listView.service";

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

const PublishList = (props: Props) => {
  const { open, handleClose } = props;
  const [shareURL, setShareURL] = useState<string | undefined>(undefined);

  const closeModal = () => {
    handleClose();
  };

  useEffect(() => {
    const getShareURLFromAPI = async () => {
      // const url = await getShareURL();
      // setShareURL(url);
    };
    getShareURLFromAPI();
  }, []);

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
          Publish
        </Typography>

        <Typography gutterBottom variant="body2" sx={{ my: 1 }}>
          With Web export you can add the list to your website by simply adding
          a bit of javascript. Simply copy the code below into your site.
        </Typography>
        <Divider sx={{ my: 1 }}></Divider>
        <FormControl sx={{ my: 1 }}>
          <FormLabel id="demo-radio-buttons-group-label">Publish as</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="iframe"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="iframe"
              control={<Radio />}
              // onChange={() => {

              // })
              label={<Typography variant="body2">iframe</Typography>}
            />
            <FormControlLabel
              value="javascript"
              control={<Radio />}
              label={<Typography variant="body2">JavaScript</Typography>}
            />
            {/* <FormControlLabel
              value="other"
              control={<Radio />}
              label={<Typography variant="body2">Other</Typography>}
            /> */}
          </RadioGroup>
        </FormControl>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <ContentCopyIcon sx={{ cursor: "pointer" }} />
              </InputAdornment>
            ),
          }}
          sx={{ my: 1 }}
        />
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{ my: 2, width: "25%" }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default PublishList;
