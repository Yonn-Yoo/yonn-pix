import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import Layout from '../src/components/core/Layout';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}
