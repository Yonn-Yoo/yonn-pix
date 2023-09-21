import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { photoArr } from '../../photoArray';

export default function PhotoSection({ photoList }: { photoList: string[] }) {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 4, 900: 5 }}>
      <Masonry>
        {photoList.map((url, idx) => (
          <div className="relative m-2 rounded-lg group overflow-hidden cursor-pointer">
            <img
              key={`key2-${idx}`}
              className="rounded-lg group-hover:scale-105 duration-500 ease-out"
              loading="lazy"
              draggable={false}
              src={url}
              alt="photo"
            />
            <div className="absolute left-0 top-0 w-full h-full group-hover:bg-black/20 duration-300 ease-out" />
          </div>
        ))}
        {photoArr.map(({ path }, idx) => (
          <div className="relative m-2 rounded-lg group overflow-hidden cursor-pointer">
            <img
              key={`key-${idx}`}
              className="rounded-lg group-hover:scale-105 duration-500 ease-out"
              loading="lazy"
              draggable={false}
              src={path}
              alt="photo"
            />
            <div className="absolute left-0 top-0 w-full h-full group-hover:bg-black/20 duration-300 ease-out" />
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
