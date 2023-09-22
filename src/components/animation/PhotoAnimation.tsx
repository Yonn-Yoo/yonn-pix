import Lottie from 'react-lottie';
import animationData from './json/photo-card.json';
export default function PhotoAnimation() {
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
        height={200}
        width={200}
        isClickToPauseDisabled
      />
    </div>
  );
}
