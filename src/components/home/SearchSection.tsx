import { Dispatch, SetStateAction, useState } from 'react';
import { searchPhotos } from '../../api/service';
import { colorArray } from '../../array/colorArray';
import CameraIcon from '../../svg/CameraIcon';
import MagnifierIcon from '../../svg/MagnifierIcon';
import { searchReqBodyType } from '../../types/reqBody';
import PhotoAnimation from '../animation/PhotoAnimation';

export default function SearchSection({
  setImageList,
}: {
  setImageList: Dispatch<SetStateAction<string[]>>;
}) {
  const [searchCondition, setSearchCondition] = useState<searchReqBodyType>({
    query: '',
  });

  const handleOnChange = (value: string, key: string) => {
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
    <section className="w-full md:w-[80%] mx-auto mb-5 md:mb-10">
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
                <CameraIcon className="w-6 h-6" />
              </div>
              <input
                type="text"
                spellCheck={false}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-none block w-full pl-10 p-2.5"
                placeholder="Search images with keyword."
                onChange={(e) => handleOnChange(e.target.value, 'query')}
              />
            </div>
            <button
              onClick={handleSearch}
              className="flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:outline-none duration-150 ease-out"
            >
              <MagnifierIcon />
              Search
            </button>
          </div>
          <div className="flex mt-3 text-xs font-semibold space-x-2">
            {colorArray.map(({ label, value, color }, idx) => (
              <span
                key={`colorBadge-${idx}`}
                onClick={() => handleOnChange(value, 'color')}
                className={`${color} px-2.5 py-0.5 rounded hover:opacity-70 duration-150 ease-out cursor-pointer ring-1 ${
                  value === searchCondition.color && 'ring-[3px] !ring-blue-400'
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}