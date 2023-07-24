import * as React from "react";

import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  MenuItem,
  FormControl,
  Select,
  Divider,
  Switch,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ChangePassword from "./ChangePassword";
// ICONS----------------------------------------------
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import GppGoodIcon from "@mui/icons-material/GppGood";
import ProfileSetting from "./ProfileSetting";

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

export default function SettingTabs() {
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
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
        onChange={handleTabChange}
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
        {/* <Tab
          label="General"
          {...a11yProps(1)}
          icon={<SettingsIcon sx={{ mr: 1 }} />}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        /> */}
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
        {/* <Tab
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
        /> */}
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography variant="h4">Profile Settings</Typography>
        <Divider light sx={{ my: 4 }}></Divider>
        <ProfileSetting />
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
