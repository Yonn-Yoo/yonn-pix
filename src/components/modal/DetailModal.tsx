import { Dialog, Transition } from '@headlessui/react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { modalAtom } from '../../recoil/atom';
import { ImageDataType, UrlsType } from '../../types/type';
import Dropdown from '../common/Dropdown';

export default function DetailModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const { data } = useRecoilValue(modalAtom);
  if (!data) return;
  const {
    user,
    urls,
    width,
    height,
    likes,
    downloads,
    views,
    alt_description: alt,
  } = data as ImageDataType;
  const router = useRouter();
  const qualityOptions = Object.keys(urls).filter(
    (item) => !item.includes('thumb') && !item.includes('small_s3')
  );

  const handleDownload = (option: keyof UrlsType = 'raw') => {
    const imageUrl = urls[option];
    fetch(imageUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Network res was not ok');
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${alt}.jpg`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      })
      .catch((err) =>
        console.error('Error fetching or downloading image:', err)
      );
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 max-md:bottom-0 max-md:inset-auto max-md:w-full">
          <div className="flex min-h-full items-center justify-center md:p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 md:scale-90 max-md:translate-y-72"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 md:scale-90 max-md:translate-y-72"
            >
              <Dialog.Panel className="flex flex-col space-y-4 w-screen md:w-full max-w-screen-md lg:max-w-screen-lg transform rounded-xl max-md:rounded-b-none bg-white backdrop-blur p-6 text-left shadow-xl">
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-9 h-9 rounded-full"
                      style={{
                        backgroundImage: `url(${user?.profile_image.small})`,
                      }}
                    />
                    <div className="flex flex-col -space-y-1">
                      <h2 className="text-lg md:text-xl capitalize font-semibold text-zinc-900">
                        {user?.first_name} {user?.last_name}{' '}
                        <strong className="font-normal text-zinc-500 text-sm md:text-base">
                          on Unsplash
                        </strong>
                      </h2>
                      <span className="text-sm text-slate-500">
                        {user?.username}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center bg-[#3DB46E] hover:bg-opacity-80 rounded-lg">
                    <button
                      onClick={() => handleDownload()}
                      className="text-sm text-white pl-4 pr-3 py-2"
                    >
                      Download
                    </button>
                    <div className="w-px h-3.5 bg-white" />
                    <Dropdown
                      options={qualityOptions}
                      handleOnDownload={handleDownload}
                      isOptionQuality
                      size={{ width, height }}
                    />
                  </div>
                </div>
                <img
                  className="h-[50vh] object-contain"
                  src={urls.regular}
                  alt={alt}
                />
                <section>
                  <div className="flex space-x-10">
                    <div className="flex flex-col">
                      <span className="lg:text-lg font-medium">Views</span>
                      <span className="text-slate-600">
                        {views?.toLocaleString() || 0}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="lg:text-lg font-medium">Likes</span>
                      <span className="text-slate-600">
                        {likes?.toLocaleString() || 0}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="lg:text-lg font-medium">Downloads</span>
                      <span className="text-slate-600">
                        {downloads?.toLocaleString() || 0}
                      </span>
                    </div>
                  </div>
                  <h2 className="mt-5 text-lg lg:text-xl font-semibold">
                    {alt}
                  </h2>
                  <time className="text-slate-500">
                    Posted at {moment(data.updated_at).format('YYYY. MM. DD')}
                  </time>
                </section>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
