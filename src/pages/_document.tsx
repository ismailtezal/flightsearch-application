import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Flight search application for finding the best flight deals." />
        <meta name="keywords" content="flight search, flight deals, travel" />
        <meta name="author" content="Your Name" />
        <title>Flight Search Application</title>
      </Head>
      <body className='bg-blue-500'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
