import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { modalAtom } from '../../recoil/atom';
import { ImageDataType } from '../../types/type';
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
    likes,
    profile_image,
    alt_description: alt,
  } = data as ImageDataType;
  const router = useRouter();
  const qualityOptions = Object.keys(urls);

  const handleDownload = (option: ImageDataType['urls']) => {
    const imageUrl = urls.raw;

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
              <Dialog.Panel className="flex flex-col space-y-4 w-screen md:w-full md:max-w-[90%] transform rounded-xl max-md:rounded-b-none bg-white backdrop-blur p-6 text-left shadow-xl">
                <div className="w-full flex items-center justify-between">
                  <Dialog.Title
                    as="h2"
                    className="text-lg md:text-xl font-semibold leading-6 text-zinc-900"
                  >
                    {user.username}
                  </Dialog.Title>
                  <div className="flex items-center bg-[#3DB46E] hover:bg-opacity-80 rounded-lg">
                    <button
                      onClick={handleDownload}
                      className="text-sm text-white pl-4 pr-3 py-2"
                    >
                      Download
                    </button>
                    <div className="w-px h-3.5 bg-white" />
                    <Dropdown
                      options={qualityOptions}
                      handleOnDownload={handleDownload}
                    />
                  </div>
                </div>
                <img
                  className="h-[50vh] object-contain"
                  src={urls.full}
                  alt={alt}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-between space-x-3">
      <div className="w-full h-[2px] bg-zinc-300" />
      <span className="text-zinc-500">or</span>
      <div className="w-full h-[2px] bg-zinc-300" />
    </div>
  );
}
