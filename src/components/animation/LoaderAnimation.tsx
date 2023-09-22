import Lottie from 'react-lottie';
import animationData from './json/loader.json';

export default function LoaderAnimation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div>
      <Lottie
        options={defaultOptions}
        height={100}
        width={100}
        isClickToPauseDisabled
      />
    </div>
  );
}
