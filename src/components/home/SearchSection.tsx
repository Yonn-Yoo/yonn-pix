import { Dispatch, SetStateAction, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { searchPhotos } from '../../api/service';
import { colorArray } from '../../array/searchArrays';
import useScroll from '../../hooks/useScroll';
import { searchFilter } from '../../recoil/atom';
import CameraIcon from '../../svg/CameraIcon';
import MagnifierIcon from '../../svg/MagnifierIcon';
import PhotoAnimation from '../animation/PhotoAnimation';

export default function SearchSection({
  setImageList,
}: {
  setImageList: Dispatch<SetStateAction<string[]>>;
}) {
  const [searchCondition, setSearchCondition] = useRecoilState(searchFilter);
  const scrollPosition = useScroll();

  useEffect(() => {
    console.log(scrollPosition);
  }, [scrollPosition]);

  const handleOnChange = (value: string | null, key: string) => {
    setSearchCondition((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    searchPhotos(searchCondition)
      .then((res) =>
        setImageList(res.data.results.map((image: any) => image.urls.small))
      )
      .catch(console.log);
  };

  return (
    <section className="w-full md:w-[80%] mx-auto mb-16 md:mb-20">
      <div className="w-full flex flex-col md:items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row">
        <div className="w-full md:h-auto md:w-48">
          <PhotoAnimation />
        </div>
        <div className="w-full flex flex-col justify-between p-5 md:p-4">
          <h3 className="mb-2 text-2xl font-bold">YonnPix</h3>
          <p className="mb-3 font-normal text-zinc800">Image search website</p>

          <div className="flex items-center w-full">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <CameraIcon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <input
                type="text"
                spellCheck={false}
                className="border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-none block w-full pl-9 md:pl-10 p-2.5"
                placeholder="Search images.."
                onChange={(e) => handleOnChange(e.target.value, 'query')}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                value={searchCondition.query}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={!searchCondition.query}
              className={`flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 duration-150 ease-out ${
                !searchCondition.query && '!bg-zinc-300 cursor-not-allowed'
              } `}
            >
              <MagnifierIcon />
              Search
            </button>
          </div>
          <div className="flex flex-wrap gap-3 md:gap-2 mt-5 text-xs font-semibold">
            {colorArray.map(({ label, value, color }, idx) => (
              <button
                key={`colorBadge-${idx}`}
                onClick={() => handleOnChange(value, 'color')}
                className={`${color} px-3 md:px-2.5 py-1 rounded hover:opacity-70 duration-150 ease-out cursor-pointer ring-1 ${
                  value === searchCondition.color && 'ring-2 !ring-blue-500'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
