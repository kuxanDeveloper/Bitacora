import Document,{ Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="es-CO">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="application-name" content="Bitácora BD" />
          <link
            rel="apple-touch-icon"
            sizes="64x64"
            href="/img/Becton_Dickinson_logo 64x64.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="128x128"
            href="/img/Becton_Dickinson_logo 128x128.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="256x256"
            href="/img/Becton_Dickinson_logo 256x256.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="512x512"
            href="/img/Becton_Dickinson_logo 512x512.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="1024x1024"
            href="/img/Becton_Dickinson_logo 1024x1024.png"
          />
          <meta name="theme-color" content="#FFFFFF" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
