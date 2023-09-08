import { useTheme, styled } from "@mui/material/styles";
import { Box, Container, Typography } from "@mui/material";
import FeatureCard from "src/components/cards/Card";
import SearchIcon from "@mui/icons-material/Search";
import TaskIcon from "@mui/icons-material/Task";
import PublicIcon from "@mui/icons-material/Public";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import SavingsIcon from "@mui/icons-material/Savings";
import DataObjectIcon from "@mui/icons-material/DataObject";
import TranslateIcon from "@mui/icons-material/Translate";
import SpeedIcon from "@mui/icons-material/Speed";
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";

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

type LandingTrustedByProps = {
  translations: TranslationText[];
};

const LandingTrustedBy = ({
  translations
}: LandingTrustedByProps) => {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  
  const FeatureCards = [
    {
      icon: <SearchIcon sx={iconStyle} />,
      title: t("Features Fully Title"),
      description: t("Features Fully Description"),
    },
    {
      icon: <TaskIcon sx={iconStyle} />,
      title: t("Features Any Title"),
      description: t("Features Any Description"),
    },
    {
      icon: <PublicIcon sx={iconStyle} />,
      title: t("Features Pick Title"),
      description: t("Features Pick Description"),
    },
    {
      icon: <RecordVoiceOverIcon sx={iconStyle} />,
      title: t("Features User Title"),
      description: t("Features User Description"),
    },
    {
      icon: <SavingsIcon sx={iconStyle} />,
      title: t("Features Free Title"),
      description: t("Features Free Description"),
    },
    {
      icon: <DataObjectIcon sx={iconStyle} />,
      title: t("Features Ongoing Title"),
      description: t("Features Ongoing Description"),
    },
    {
      icon: <TranslateIcon sx={iconStyle} />,
      title: t("Features Multi Title"),
      description: t("Features Multi Description"),
    },
    {
      icon: <SpeedIcon sx={iconStyle} />,
      title: t("Features Fast Title"),
      description: t("Features Fast Description"),
    },
  ];

  return (
    <RootStyle>
      <Container
        maxWidth="xl"
        sx={{
          py: 4,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography variant="h2" gutterBottom sx={{ py: 2 }}>
          {t("Features Title")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 2, md: 3 },
          }}
        >
          {FeatureCards.map((card: any, index: number) => {
            return (
              <FeatureCard
                key={index}
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
};

export default LandingTrustedBy;
