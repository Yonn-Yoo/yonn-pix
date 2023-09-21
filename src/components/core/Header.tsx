import Logo from '../../svg/Logo';

export default function Header() {
  return (
    <header className="fixed top-0 z-10 w-screen h-14 md:h-20 px-4 md:px-5 flex justify-between items-center border-b border-zinc-300 bg-white">
      <Logo />
      <button>sign in</button>
    </header>
  );
}
