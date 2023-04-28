import { useMemo, useState } from 'react';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import { palette_dark, palette_light } from './palette';
import shadows from './shadows';
import typography from './typography';
import GlobalStyles from './globalStyles';
import customShadows from './customShadows';
import componentsOverride from './overrides';
import { useRouter } from 'next/router';

type ThemeProviderProps = {
  children: any
};

export default function ThemeProvider({ children }:ThemeProviderProps) {
  const [mode, setMode] = useState('light');
  const router = useRouter();

  const themeOptions : any = useMemo(
    () => ({
      palette: {
        mode: mode,
        palette_style: mode === 'light' ? palette_light: palette_dark
      },
      shape: { borderRadius: 6 },
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
    }),
    [mode]
  );

  const handleMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {router.pathname !== '/' && !router.pathname.includes('auth') && !router.pathname.includes('dashboard') && <Box
          component="span"
          className="svg-color"
          sx={{
            width: 24,
            height: 24,
            display: 'inline-block',
            backgroundImage: mode === 'light' ? 'url(/assets/icons/header/light.svg)' : 'url(/assets/icons/header/dark.svg)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            cursor: 'pointer',
            position: 'fixed',
            zIndex: 1111,
            right: {xs: '84px', lg: '105px'},
            top: {xs: '12px', lg: '11px'}
          }}
          onClick={handleMode}
        />}
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
