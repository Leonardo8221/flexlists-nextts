import { LanguagesProvider } from 'src/contexts/LanguageContext';
import 'src/styles/globals.css'
import type { AppProps } from 'next/app'
import ThemeProvider from 'src/theme';
import { StyledChart } from 'src/components/chart';
import AuthGuard from 'src/guards/AuthGuard';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <LanguagesProvider>
        {/* <ScrollToTop /> */}
        <StyledChart />
        <AuthGuard>
        <Component {...pageProps} />
        </AuthGuard>
      </LanguagesProvider>
    </ThemeProvider>
  );
}
