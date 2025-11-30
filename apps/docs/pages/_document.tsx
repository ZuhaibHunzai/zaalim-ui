import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      {/* @ts-ignore */}
      <Head>
        <meta
          name="description"
          content="Zaalim UI - A beautiful React component library"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        {/* @ts-ignore */}
        <NextScript />
      </body>
    </Html>
  );
}
