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
  MenuItem,
  FormControl,
  Select,
  Divider,
  Switch,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { SelectChangeEvent } from "@mui/material/Select";
import ChangePassword from "./ChangePassword";
// ICONS----------------------------------------------
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GppGoodIcon from "@mui/icons-material/GppGood";
import UploadIcon from "@mui/icons-material/Upload";

const ThemeChoiceImage = styled("img")(({ theme }) => ({
  width: 180,
  height: 180,
  border: "solid 2px #eee",
  borderRadius: "16px",
  transition: "all .2s ease",
  "&:hover": {
    cursor: "pointer",
    borderColor: "#54A6FB",
  },
}));
const AvatarImg = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
}));

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
  const [age, setAge] = React.useState("");

  const handleDateChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

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
        variant="scrollable"
        scrollButtons={false}
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          maxHeight: "100%",
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
        <Divider light sx={{ my: 4 }}></Divider>

        <Box mt={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                width: 128,
                height: 128,
                border: "solid 6px #fff",
                boxShadow: "0 4px 24px 0 rgba(0,0,0,0.1)",
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
              <AvatarImg src="/assets/images/avatars/avatar_12.jpg" />
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
        <Typography variant="h4">General Settings</Typography>
        <Divider light sx={{ my: 4 }}></Divider>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">Choose preferred theme:</Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <ThemeChoiceImage src="/assets/images/settings/DarkTheme.svg" />
            <ThemeChoiceImage src="/assets/images/settings/LightTheme.svg" />
            <ThemeChoiceImage src="/assets/images/settings/HighContrastDark.svg" />
            <ThemeChoiceImage src="/assets/images/settings/HighContrastLight.svg" />
          </Box>
          <Divider sx={{ my: 4 }}></Divider>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid item md={6}>
              <Typography variant="body1">
                Set your time and date format.
              </Typography>
            </Grid>
            <Grid item md={6}>
              <FormControl
                fullWidth
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <Select sx={{ width: "100%", mr: 2 }} value={0}>
                  <MenuItem>MM/DD/YYYY (e.g., 06/15/2023)</MenuItem>
                  <MenuItem>DD/MM/YYYY (e.g., 15/06/2023)</MenuItem>
                  <MenuItem>YYYY-MM-DD (e.g., 2023-06-15)</MenuItem>
                  <MenuItem>Month DD, YYYY (e.g., June 15, 2023)</MenuItem>
                </Select>
                <Select sx={{ width: "100%" }}>
                  <MenuItem>HH:mm (e.g., 18:30)</MenuItem>
                  <MenuItem>h:mm A (e.g., 6:30 PM)</MenuItem>
                  <MenuItem>HH:mm:ss (e.g., 18:30:15)</MenuItem>
                  <MenuItem>h:mm:ss A (e.g., 6:30:15 PM)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Grid item md={6}>
              <Typography variant="body1">Set your currency.</Typography>
            </Grid>
            <Grid item md={6}>
              <FormControl
                fullWidth
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <Select sx={{ width: "100%" }} value={0}>
                  <MenuItem>Euro (EUR) - €</MenuItem>
                  <MenuItem>United States Dollar (USD) - $</MenuItem>
                  <MenuItem>British Pound (GBP) - £</MenuItem>
                  <MenuItem>Japanese Yen (JPY) - ¥</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="h4">Security Settings</Typography>
        <Divider light sx={{ my: 4 }}></Divider>

        <Box mt={4}>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Password
          </Typography>
          <Divider light sx={{ my: 2 }} />
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography variant="body1">
              Enhance your account security by setting a new password.
            </Typography>
            <ChangePassword />
          </Box>
          <Typography variant="subtitle1" sx={{ mt: 4 }}>
            Two-step security options
          </Typography>
          <Divider light sx={{ my: 2 }}></Divider>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Box>
              <Typography variant="body1" gutterBottom>
                Authenticator app
              </Typography>
              <Typography component="span" variant="body2" color="#aaa">
                Google Authenticator{" "}
              </Typography>
            </Box>
            <Switch defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Box>
              <Typography variant="body1" gutterBottom>
                SMS
              </Typography>
              <Typography component="span" variant="body2" color="#aaa">
                Receive message on: +123 456 789
              </Typography>
            </Box>
            <Switch defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Box>
              <Typography variant="body1" gutterBottom>
                Email notify
              </Typography>
              <Typography component="span" variant="body2" color="#aaa">
                email@email.com
              </Typography>
            </Box>
            <Switch />
          </Box>
        </Box>
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
