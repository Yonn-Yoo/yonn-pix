import { Menu, Transition } from '@headlessui/react';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { searchPhotos } from '../../api/service';
import { filterArray } from '../../array/searchArrays';
import { loader, searchFilter } from '../../recoil/atom';
import CheckIcon from '../../svg/CheckIcon';
import ChevronDownIcon from '../../svg/ChevronDownIcon';
import { ImageDataType } from '../../types/type';
import LoaderAnimation from '../animation/LoaderAnimation';
import ImageCard from '../common/ImageCard';

export default function ImageSection({
  imageList,
  setImageList,
}: {
  imageList: ImageDataType[];
  setImageList: Dispatch<SetStateAction<ImageDataType[]>>;
}) {
  const isLoading = useRecoilValue(loader);

  return (
    <section className="relative">
      <SearchOrderFilter imageList={imageList} setImageList={setImageList} />
      {isLoading ? (
        <LoaderAnimation />
      ) : (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 2, 500: 3, 900: 4, 1200: 5 }}
        >
          <Masonry>
            {imageList.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </section>
  );
}

function SearchOrderFilter({
  setImageList,
  imageList,
}: {
  setImageList: Dispatch<SetStateAction<ImageDataType[]>>;
  imageList: ImageDataType[];
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [searchCondition, setSearchCondition] = useRecoilState(searchFilter);
  const setIsLoading = useSetRecoilState(loader);

  const updateOrder = (value: 'relevant' | 'latest') => {
    setSearchCondition((prev) => ({
      ...prev,
      order_by: value,
    }));
  };

  useEffect(() => {
    if (!searchCondition.query) {
      return;
    }
    setIsLoading(true);
    searchPhotos(searchCondition)
      .then((res) =>
        setImageList(res.data.results.map((image: ImageDataType) => image))
      )
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, [searchCondition.order_by]);

  useEffect(() => {
    searchCondition.query ? setIsVisible(true) : setIsVisible(false);
  }, [imageList]);

  return (
    <div
      className={`absolute right-2 -top-7 z-10 ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-5 pointer-events-none'
      } duration-300 ease-out`}
    >
      <Menu as="div" className="w-fit relative text-right mb-5 md:mb-10">
        <div className="flex space-x-1 text-sm">
          <span className="font-light text-zinc-500">Order images by</span>
          <Menu.Button className="flex items-center space-x-3 font-semibold">
            <span>{searchCondition.order_by}</span>
            <ChevronDownIcon />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-30 absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="">
              {filterArray.map(({ label, value }) => (
                <Menu.Item key={value}>
                  {({ active }) => (
                    <button
                      onClick={() => updateOrder(value)}
                      className={`${
                        active && 'bg-zinc-100'
                      } group flex w-full justify-between items-center rounded-md p-3 text-sm duration-100 ease-out`}
                    >
                      <span>{label}</span>
                      {searchCondition.order_by === value && <CheckIcon />}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
