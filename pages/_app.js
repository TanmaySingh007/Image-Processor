import '../styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Image Smoothing Filter - Advanced Image Processing</title>
        <meta name="description" content="Professional image smoothing filter with customizable neighborhood averaging, grayscale conversion, and real-time pixel analysis." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Image Smoothing Filter" />
        <meta property="og:description" content="Advanced image processing with customizable smoothing filters" />
        <meta property="og:type" content="website" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}