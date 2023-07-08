// material
import { useTheme, styled } from "@mui/material/styles";
import { Box, Container } from "@mui/material";
import FeatureCard from "src/components/cards/Card";
// ICONS
import SearchIcon from "@mui/icons-material/Search";
import TaskIcon from "@mui/icons-material/Task";
import PublicIcon from "@mui/icons-material/Public";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import SavingsIcon from "@mui/icons-material/Savings";
import DataObjectIcon from "@mui/icons-material/DataObject";
import TranslateIcon from "@mui/icons-material/Translate";
import SpeedIcon from "@mui/icons-material/Speed";

const RootStyle = styled("div")(({ theme }) => ({
  backgroundColor: "#fafafa",
  minHeight: "80vh",
  display: "grid",
  placeContent: "center",
}));

const iconStyle = {
  color: "#54A6FB",
  fontSize: "32px",
};

const FeatureCards = [
  {
    icon: <SearchIcon sx={iconStyle} />,
    title: "Fully Featured Search Function",
    description: "Configurable filters, search by field...",
  },
  {
    icon: <TaskIcon sx={iconStyle} />,
    title: "Any File Format",
    description:
      "Store files in any format. Images, videos, documents PDFs etc",
  },
  {
    icon: <PublicIcon sx={iconStyle} />,
    title: "Pick your Region*",
    description:
      " *Paid accounts only. Default will be EU but you can pick US Asia etc.",
  },
  {
    icon: <RecordVoiceOverIcon sx={iconStyle} />,
    title: "User voice",
    description:
      "You vote on the development road map, and based on your input, developments will be prioritized",
  },
  {
    icon: <SavingsIcon sx={iconStyle} />,
    title: "Free or Paid Versions",
    description:
      "Three different levels of use. Free, Subscriber, or Enterprise - with your own private server. Click Here to see pricing details.",
  },
  {
    icon: <DataObjectIcon sx={iconStyle} />,
    title: "Ongoing development",
    description:
      "Flexlists will have continuous updates with a user-prioritized development road map.",
  },
  {
    icon: <TranslateIcon sx={iconStyle} />,
    title: "Fully Multilingual",
    description: "Description",
  },
  {
    icon: <SpeedIcon sx={iconStyle} />,
    title: "FAST!!",
    description: "All the while keeping the famous Flexlists speed.",
  },
];

export default function LandingTrustedBy() {
  return (
    <RootStyle>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 2, md: 3 },
            pt: 0,
          }}
        >
          {FeatureCards.map((card: any,index:number) => {
            return (
              <FeatureCard
                key = {index}
                icon={card.icon}
                title={card.title}
                description={card.description}
              ></FeatureCard>
            );
          })}
        </Box>
      </Container>
    </RootStyle>
  );
}
