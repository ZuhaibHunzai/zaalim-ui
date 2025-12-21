import { ThemeProvider } from "zaalim-ui";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { defaultTheme } from "../components/theme/default";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider value={defaultTheme}>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}
