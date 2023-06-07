import * as React from "react";

import {
  Box,
  Typography,
  Tabs,
  Tab,
  Avatar,
  Button,
  TextField,
  Grid,
} from "@mui/material";
// ICONS----------------------------------------------
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GppGoodIcon from "@mui/icons-material/GppGood";
import UploadIcon from "@mui/icons-material/Upload";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%", overflowY: "scroll" }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100%",
        width: "100%",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          minHeight: "100%",
          width: "25%",
        }}
      >
        <Tab
          label="Profile"
          {...a11yProps(0)}
          icon={<GroupsIcon sx={{ mr: 1 }} />}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        />
        <Tab
          label="General"
          {...a11yProps(1)}
          icon={<SettingsIcon sx={{ mr: 1 }} />}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        />
        <Tab
          label="Security"
          {...a11yProps(2)}
          icon={<GppGoodIcon sx={{ mr: 1 }} />}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        />
        <Tab
          label="Notifications"
          {...a11yProps(3)}
          icon={<NotificationsIcon sx={{ mr: 1 }} />}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        />
        <Tab
          label="Item Five"
          {...a11yProps(4)}
          icon={<GroupsIcon sx={{ mr: 1 }} />}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        />
        <Tab
          label="Item Six"
          {...a11yProps(5)}
          icon={<GroupsIcon sx={{ mr: 1 }} />}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        />
        <Tab
          label="Item Seven"
          {...a11yProps(6)}
          icon={<GroupsIcon sx={{ mr: 1 }} />}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography variant="h4">Profile Settings</Typography>
        <Box mt={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                width: 128,
                height: 128,
                border: "solid 4px #fff",
                boxShadow: "0 16px 24px 0 rgba(0,0,0,0.05)",
                fontSize: 40,
                position: "relative",
                "&:hover .overlay": {
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                },
              }}
            >
              {/* check out and CHANGE AVATAR v2 option */}
              {/* <Box
                className="overlay"
                sx={{ display: "none", backgroundColor: "rgba(0,0,0,0.5)" }}
              >
                <UploadIcon />
                <Typography variant="body2">Upload image</Typography>
              </Box> */}
              FL
            </Avatar>
            <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
              <Button variant="contained">Change Avatar</Button>
              <Button variant="outlined" sx={{ mt: 1 }}>
                Delete Avatar
              </Button>
            </Box>
          </Box>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item md={6}>
              <Typography variant="subtitle2">First Name</Typography>
              <TextField sx={{ width: "100%" }} defaultValue="First Name" />
            </Grid>
            <Grid item md={6}>
              <Typography variant="subtitle2">Last Name</Typography>
              <TextField sx={{ width: "100%" }} defaultValue="Last Name" />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Email</Typography>
              <TextField
                sx={{ width: "100%" }}
                disabled
                defaultValue="email@email.com"
              />
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Bio</Typography>
              <TextField
                sx={{ width: "100%" }}
                multiline
                rows={8}
                defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, dolor!"
              />
            </Grid>
          </Grid>
          {/* remove disabled if user update profile info */}
          <Button sx={{ mt: 2 }} disabled variant="contained">
            Update Settings
          </Button>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h4">Profile Settings</Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box>
  );
}
