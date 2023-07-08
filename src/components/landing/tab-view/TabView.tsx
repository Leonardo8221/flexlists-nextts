import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, Grid } from "@mui/material";
import { useTheme } from "@emotion/react";

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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box component={"div"} sx={{ py: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

const details = [
  {
    image: "/assets/home/heroimg.png",
    alt: "list-view",
    description: "List View Description goes here lorem ipsum",
  },
  {
    image: "/assets/home/heroimg.png",
    alt: "calendar-view",
    description: "Calendar View Description goes here lorem ipsum",
  },
  {
    image: "/assets/home/heroimg.png",
    alt: "gallery-view",
    description: "Gallery View Description goes here lorem ipsum",
  },
  {
    image: "/assets/home/heroimg.png",
    alt: "kanban-view",
    description: "Kanban View Description goes here lorem ipsum",
  },
  {
    image: "/assets/home/heroimg.png",
    alt: "chart-view",
    description: "Chart View Description goes here lorem ipsum",
  },
  {
    image: "/assets/home/heroimg.png",
    alt: "gantt-view",
    description: "Gantt View Description goes here lorem ipsum",
  },
  {
    image: "/assets/home/heroimg.png",
    alt: "timeline-view",
    description: "Timeline View Description goes here lorem ipsum",
  },
];

const items = [
  { title: "List View" },
  { title: "Calendar View" },
  { title: "Gallery View" },
  { title: "Kanban View" },
  { title: "Chart View" },
  { title: "Gantt View" },
  { title: "Timeline View" },
];

function TabView() {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const theme = useTheme();
  return (
    <Box sx={{ my: { xs: 2, md: 4 } }}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
          <Tabs
            variant="scrollable"
            allowScrollButtonsMobile
            value={value}
            onChange={handleChange}
          >
            {items.map((item, index) => (
              <Tab
                key={index}
                label={item.title}
                sx={{ minWidth: "fit-content", flex: 1 }}
              />
            ))}
          </Tabs>
        </Box>
      </Box>
      {details.map((detail, index) => (
        <TabPanel key={index} value={value} index={index}>
          <Grid container spacing={2} sx={{ py: 2, p: 0 }}>
            <Grid
              item
              md={6}
              sx={{
                position: "relative",
              }}
            >
              <img
                style={{ width: "100%" }}
                src={detail.image}
                alt={detail.alt}
              />
            </Grid>
            <Grid item md={6}>
              <Typography variant="body1">{detail.description}</Typography>
            </Grid>
          </Grid>
        </TabPanel>
      ))}
    </Box>
  );
}

export default TabView;
