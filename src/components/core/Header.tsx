import CameraIcon from '../../svg/CameraIcon';

export default function Header() {
  return (
    <header className="fixed top-0 z-10 w-screen h-14 md:h-16 px-4 md:px-5 flex justify-between items-center border-b border-zinc-300 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center space-x-1">
        <CameraIcon className="w-6 h-6 md:w-8 md:h-8" />
        <h4 className="text-lg md:text-2xl font-semibold text-zinc-700">
          YonnPix
        </h4>
      </div>
      <button>sign in</button>
    </header>
  );
}
