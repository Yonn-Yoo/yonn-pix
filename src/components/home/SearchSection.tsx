import { Dispatch, SetStateAction } from 'react';
import { useRecoilState } from 'recoil';
import { colorArray } from '../../array/searchArrays';
import useScroll from '../../hooks/useScroll';
import { searchFilter } from '../../recoil/atom';
import PhotoAnimation from '../animation/PhotoAnimation';
import SearchBar from '../common/SearchBar';

export default function SearchSection({
  setImageList,
}: {
  setImageList: Dispatch<SetStateAction<string[]>>;
}) {
  const [searchCondition, setSearchCondition] = useRecoilState(searchFilter);
  const scrollPosition = useScroll();

  const handleOnChange = (value: string | null, key: string) => {
    setSearchCondition((prev) => ({
      ...prev,
      [key]: value,
    }));
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
          <SearchBar />
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
