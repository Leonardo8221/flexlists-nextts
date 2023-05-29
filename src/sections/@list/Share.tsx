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
  Grid,
  Tab,
  Select,
  MenuItem,
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import ListAccess from "src/components/list-access/ListAccess";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import GroupsIcon from "@mui/icons-material/Groups";
import { SelectChangeEvent } from "@mui/material/Select";
import ManageKeys from "src/components/share-list/ManageKeys";

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
  overflowY: "scroll",
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

function ShareTabs() {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [age, setAge] = React.useState("");

  const handleSelectChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <React.Fragment>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            variant="fullWidth"
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab icon={<PersonIcon />} label="Users" value="users" />
            <Tab icon={<KeyIcon />} label="Manage / Share Keys" value="keys" />
            <Tab icon={<GroupsIcon />} label="Invite Groups" value="groups" />
          </TabList>
        </Box>
        <TabPanel value="users">
          <Box>
            <FormLabel>
              <Typography variant="subtitle1">People with access:</Typography>
            </FormLabel>
            <ListAccess />
            <Divider sx={{ my: 1 }}></Divider>
          </Box>
        </TabPanel>
        <TabPanel value="keys" sx={{ px: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={5} sx={{ display: "flex", flexDirection: "column" }}>
              <FormLabel>
                <Typography variant="body2">Access / Role</Typography>
              </FormLabel>
              <Select value={age} onChange={handleSelectChange}>
                <MenuItem value="1">Role 1</MenuItem>
                <MenuItem value="2">Role 2</MenuItem>
                <MenuItem value="3">Role 3</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={5} sx={{ display: "flex", flexDirection: "column" }}>
              <FormLabel>
                <Typography variant="body2">Info</Typography>
              </FormLabel>
              <TextField placeholder="Name of reciever for example..."></TextField>
            </Grid>
            <Grid item xs={2} sx={{ display: "flex", alignItems: "flex-end" }}>
              <Button variant="contained" fullWidth sx={{ height: "56px" }}>
                Create Key
              </Button>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3, mb: 2 }}></Divider>
          <Typography gutterBottom variant="h5">
            All keys
          </Typography>
          <ManageKeys />
        </TabPanel>
        <TabPanel value="groups">Item Two</TabPanel>
      </TabContext>
    </React.Fragment>
  );
}

// function ManageKeys() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <Grid onClick={handleOpen} container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <Box
//             className="grid-item"
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               border: "solid 1px #ccc",
//               borderRadius: "8px",
//               py: "16px",
//               cursor: "pointer",
//               "&:hover": {
//                 borderColor: "primary.main",
//               },
//               transition: "all ease .2s",
//             }}
//           >
//             <KeyIcon
//               sx={{
//                 width: "40px",
//                 height: "40px",
//                 transition: "all ease .2s",
//                 ".grid-item:hover &": { color: "primary.main" },
//               }}
//             />
//             <Typography
//               variant="body1"
//               sx={{
//                 transition: "all ease .2s",
//                 ".grid-item:hover &": { color: "primary.main" },
//               }}
//             >
//               Manage / Share Keys
//             </Typography>
//           </Box>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Box
//             className="grid-item"
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               border: "solid 1px #ccc",
//               borderRadius: "8px",
//               py: "16px",
//               cursor: "pointer",
//               "&:hover": {
//                 borderColor: "primary.main",
//               },
//               transition: "all ease .2s",
//             }}
//           >
//             <GroupsIcon
//               sx={{
//                 width: "40px",
//                 height: "40px",
//                 transition: "all ease .2s",
//                 ".grid-item:hover &": { color: "primary.main" },
//               }}
//             />
//             <Typography
//               variant="body1"
//               sx={{
//                 transition: "all ease .2s",
//                 ".grid-item:hover &": { color: "primary.main" },
//               }}
//             >
//               Invite Groups
//             </Typography>
//           </Box>
//         </Grid>
//       </Grid>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="child-modal-title"
//         aria-describedby="child-modal-description"
//       >
//         <Box
//           sx={style}
//           component={motion.div}
//           variants={scaleUp}
//           initial="hidden"
//           animate="visible"
//           exit="close"
//         >
//           <Typography> Test</Typography>
//         </Box>
//       </Modal>
//     </React.Fragment>
//   );
// }

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

        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          Invite user
        </Typography>
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
        <Grid container spacing={1}>
          <Grid item xs={12} md={10}>
            <TextField sx={{ my: 1 }} placeholder="Email address" fullWidth />
            <FormLabel
              sx={{
                fontSize: { xs: 12, md: 14 },
                display: { xs: "block", md: "none" },
              }}
              id="multiple-email-address"
            >
              (separate multiple addresses with a comma)
            </FormLabel>
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            sx={{ display: "flex", alignItems: "center", position: "relative" }}
          >
            <Button
              disabled
              fullWidth
              variant="outlined"
              sx={{
                textTransform: "none",
                height: "56px",
              }}
            >
              Add user(s)
            </Button>
          </Grid>
        </Grid>
        <FormLabel
          sx={{
            fontSize: { xs: 12, md: 14 },
            display: { xs: "none", md: "block" },
          }}
          id="multiple-email-address"
        >
          (separate multiple addresses with a comma)
        </FormLabel>
        <Typography variant="subtitle1" sx={{ my: 2 }}>
          Additional options
        </Typography>
        {/* <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              className="grid-item"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "solid 1px #ccc",
                borderRadius: "8px",
                py: "16px",
                cursor: "pointer",
                "&:hover": {
                  borderColor: "primary.main",
                },
                transition: "all ease .2s",
              }}
            >
              <KeyIcon
                sx={{
                  width: "40px",
                  height: "40px",
                  transition: "all ease .2s",
                  ".grid-item:hover &": { color: "primary.main" },
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  transition: "all ease .2s",
                  ".grid-item:hover &": { color: "primary.main" },
                }}
              >
                Manage / Share Keys
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              className="grid-item"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "solid 1px #ccc",
                borderRadius: "8px",
                py: "16px",
                cursor: "pointer",
                "&:hover": {
                  borderColor: "primary.main",
                },
                transition: "all ease .2s",
              }}
            >
              <GroupsIcon
                sx={{
                  width: "40px",
                  height: "40px",
                  transition: "all ease .2s",
                  ".grid-item:hover &": { color: "primary.main" },
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  transition: "all ease .2s",
                  ".grid-item:hover &": { color: "primary.main" },
                }}
              >
                Invite Groups
              </Typography>
            </Box>
          </Grid>
        </Grid> */}
        <ShareTabs />

        {/* <ManageKeys /> */}
        <Button variant="contained" sx={{ my: 2, mt: 3, width: "25%" }}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default ShareList;
