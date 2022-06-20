import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import Layout from '../components/layout/Layout';
import Head from 'next/head';
import { useEffect } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
  }, []);

  return (
    <RecoilRoot>
      <Head>
        <title>SeeYouThen</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="언제 만날지 못정했다구? 여기서 정해! Haven't you decided when to meet? Let's decide here!"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
