import Head from 'next/head';
import { ReactNode } from 'react';
import useScroll from '../../hooks/useScroll';
import ArrowUpIcon from '../../svg/ArrowUpIcon';
import WelcomeModal from '../common/WelcomeModal';
import Header from './Header';

export default function Layout({ children }: { children: ReactNode }) {
  const scrollPosition = useScroll();

  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

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

      <button
        onClick={scrollToTop}
        className={`w-12 h-12 md:w-14 md:h-14 fixed bottom-5 md:bottom-10 right-1/2 translate-x-1/2 flex justify-center items-center border border-zinc-600 bg-white/40 backdrop-blur-2xl rounded-full duration-500 ease-out ${
          scrollPosition < 800
            ? 'opacity-0 translate-y-24'
            : 'opacity-100 translate-y-0'
        }`}
      >
        <ArrowUpIcon />
      </button>
    </>
  );
}
