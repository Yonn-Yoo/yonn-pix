import Head from 'next/head';
import { ReactNode } from 'react';
import Logo from '../../svg/Logo';
import WelcomeModal from '../common/WelcomeModal';

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
      <header className="fixed top-0 w-screen h-20 px-5 flex justify-between items-center">
        <Logo />
      </header>
      <main className="mt-20">{children}</main>
    </>
  );
}
