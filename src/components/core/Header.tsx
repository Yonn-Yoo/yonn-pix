import { useRouter } from 'next/router';
import { useState } from 'react';
import CameraIcon from '../../svg/CameraIcon';
import SearchBar from '../common/SearchBar';
import LoginModal from '../modal/LoginModal';


export default function Header() {
  const [loginModal, setLoginModal] = useState(false);
  const router = useRouter();
  return (

    <>
      <LoginModal isOpen={loginModal} closeModal={() => setLoginModal(false)} />
      <header className="fixed top-0 z-10 w-screen h-14 md:h-16 px-4 md:px-5 flex justify-between items-center border-b border-zinc-300 bg-white/80 backdrop-blur-sm">
        <button
          onClick={() => router.push('/')}
          className="flex items-center space-x-1"
        >
          <CameraIcon className="w-5 h-5 md:w-8 md:h-8 max-[380px]:hidden" />
          <h4 className="text-sm md:text-2xl font-semibold text-zinc-700">
            YonnPix
          </h4>
        </button>
        <SearchBar isHeader />
        <button
          onClick={() => setLoginModal(true)}
          className="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white focus:ring-0"
        >
          <span className="relative px-3 py-1 md:px-4 md:py-2 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            Log in
          </span>
        </button>
      </header>
    </>

  );
}
