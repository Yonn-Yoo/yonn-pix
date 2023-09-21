import Lottie from 'react-lottie';
import animationData from './json/hello-animation.json';
export default function HelloAnimation() {
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
        height={300}
        width={200}
        isClickToPauseDisabled
      />
    </div>
  );
}
