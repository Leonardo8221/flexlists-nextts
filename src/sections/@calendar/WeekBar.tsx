import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";

type Props = {
  mode: string;
  translations: TranslationText[];
};

const WeekBar = (props: Props) => {
  const { mode, translations } = props;
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');

  const weeks = [t("Sunday"), t("Monday"), t("Tuesday"), t("Wednesday"), t("Thursday"), t("Friday"), t("Saturday")];

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', backgroundColor: theme.palette.palette_style.text.selected, color: 'white', paddingRight: mode === 'month' ? 'inherit' : {md: '5px'} }}>
      {weeks.map((week) => (
        <Box key={week} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '56px', border: '1px solid rgba(0, 0, 0, 0.1)' }}>{isDesktop ? week : week.charAt(0)}</Box>
      ))}
    </Box>
  );
};

export default WeekBar;
