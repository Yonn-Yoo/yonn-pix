import Head from 'next/head';
import { ReactNode } from 'react';
import WelcomeModal from '../modal/WelcomeModal';
import Header from './Header';
import TopButton from './TopButton';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>YonnPix</title>
        <meta name="description" content="Photo search website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WelcomeModal />
      <Header />
      <main className="mt-14 md:mt-20 p-5 md:p-8">{children}</main>
      <TopButton />
    </>
  );
}
