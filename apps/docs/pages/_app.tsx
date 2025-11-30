import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  // Check if we're on a docs page
  const isDocsPage = pageProps?.isDocsPage ?? false;

  return <Component {...pageProps} />;
}
