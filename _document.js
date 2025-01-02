import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preload CSS */}
        <link rel="preload" href="/_next/static/css/styles.css" as="style" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
