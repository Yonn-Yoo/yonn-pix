import useScroll from '../../hooks/useScroll';
import ArrowUpIcon from '../../svg/ArrowUpIcon';

export default function TopButton() {
  const scrollPosition = useScroll();

  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  return (
    <button
      onClick={scrollToTop}
      className={`w-12 h-12 md:w-14 md:h-14 fixed bottom-5 md:bottom-10 right-1/2 translate-x-1/2 flex justify-center items-center border border-zinc-600 bg-white/40 backdrop-blur-2xl rounded-full duration-500 ease-out group ${
        scrollPosition < 800
          ? 'opacity-0 translate-y-24'
          : 'opacity-100 translate-y-0'
      }`}
    >
      <ArrowUpIcon />
    </button>
  );
}
