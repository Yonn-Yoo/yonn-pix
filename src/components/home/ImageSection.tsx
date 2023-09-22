import { Menu, Transition } from '@headlessui/react';
import { Dispatch, Fragment, SetStateAction, useEffect } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { searchPhotos } from '../../api/service';
import { filterArray } from '../../array/searchArrays';
import { photoArr } from '../../photoArray';
import { loader, searchFilter } from '../../recoil/atom';
import CheckIcon from '../../svg/CheckIcon';
import ChevronDownIcon from '../../svg/ChevronDownIcon';
import LoaderAnimation from '../animation/LoaderAnimation';

export default function ImageSection({
  imageList,
  setImageList,
}: {
  imageList: string[];
  setImageList: Dispatch<SetStateAction<string[]>>;
}) {
  const isLoading = useRecoilValue(loader);

  return (
    <section className="relative">
      <SearchOrderFilter setImageList={setImageList} />
      {isLoading ? (
        <LoaderAnimation />
      ) : (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 2, 500: 3, 900: 4, 1200: 5 }}
        >
          <Masonry>
            {imageList.map((url, idx) => (
              <div
                key={`image-${idx}`}
                className="relative m-1 md:m-2 rounded-md group overflow-hidden cursor-pointer"
              >
                <img
                  className="rounded-md group-hover:scale-105 duration-500 ease-out"
                  loading="lazy"
                  draggable={false}
                  src={url}
                  alt="photo"
                />
                <div className="absolute left-0 top-0 w-full h-full group-hover:bg-black/20 duration-300 ease-out" />
              </div>
            ))}
            {photoArr.map(({ path }, idx) => (
              <div
                key={`key-${idx}`}
                className="relative m-2 rounded-md group overflow-hidden cursor-pointer"
              >
                <img
                  className="rounded-md group-hover:scale-105 duration-500 ease-out"
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
      )}
    </section>
  );
}

function SearchOrderFilter({
  setImageList,
}: {
  setImageList: Dispatch<SetStateAction<string[]>>;
}) {
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
        setImageList(res.data.results.map((image: any) => image.urls.small))
      )
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, [searchCondition.order_by]);

  return (
    <div className="absolute right-2 -top-7">
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
