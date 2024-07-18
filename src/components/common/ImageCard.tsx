import { useSetRecoilState } from 'recoil';
import { modalAtom } from '../../recoil/atom';
import EyeIcon from '../../svg/EyeIcon';
import HeartIcon from '../../svg/HeartIcon';
import { ImageDataType } from '../../types/type';

type Props = {
  image: ImageDataType;
};

export default function ImageCard({ image }: Props) {
  const setModal = useSetRecoilState(modalAtom);
  const { urls, likes, views, user, alt_description: alt } = image;

  const openDetailModal = () => {
    setModal({
      isOpen: true,
      type: 'detail',
      data: image,
    });
  };

  if (!urls) return;

  return (
    <div
      onClick={openDetailModal}
      className="relative m-1 md:m-2 rounded-md group overflow-hidden cursor-pointer"
    >
      <img
        className="rounded-md group-hover:scale-105 duration-500 ease-out"
        loading="lazy"
        draggable={false}
        src={urls?.small}
        alt={alt}
      />
      <article className="absolute left-0 top-0 w-full h-full opacity-0 group-hover:opacity-100 bg-black/20 duration-300 ease-out">
        <div className="relative w-full h-full flex flex-col items-end justify-between p-4 text-white/90">
          <div className="w-full flex justify-between items-center">
            <span className="text-xs lg:text-sm">{user.username}</span>
            <div className="flex items-center space-x-1">
              <HeartIcon />
              <span className="text-xs lg:text-sm">{likes}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <EyeIcon />
            <span className="text-xs lg:text-sm">
              {views?.toLocaleString() || 0}
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}
