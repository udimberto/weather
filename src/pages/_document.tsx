import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'

class CustomNextDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;800&display=swap" rel="stylesheet" />

          {/** Get out of the Search Engines 😂 */}
          <meta
            name="robots"
            content="no-index"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomNextDocument
