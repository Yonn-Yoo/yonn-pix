import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import HelloAnimation from '../animation/HelloAnimation';

const buttonStyle =
  'max-md:text-sm flex justify-center rounded-md border border-transparent font-medium focus:outline-none duration-150 ease-out';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeForDay = () => {
    const cookies = new Cookies();
    const date = new Date();
    const expireDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      23,
      59,
      59
    );
    cookies.set('welcomeModal', false, {
      path: '/',
      expires: expireDate,
    });
    setIsOpen(false);
  };

  useEffect(() => {
    new Cookies().get('welcomeModal') ? setIsOpen(false) : setIsOpen(true);
  }, []);

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
          <div className="flex min-h-full items-center justify-center md:p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 md:scale-90 max-md:translate-y-72"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 md:scale-90 max-md:translate-y-72"
            >
              <Dialog.Panel className="w-screen md:w-full md:max-w-md transform overflow-hidden rounded-3xl max-md:rounded-b-none bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h2"
                  className="text-lg md:text-xl font-semibold leading-6 text-zinc-900 text-center flex justify-center items-center"
                >
                  Welcome to{' '}
                  <strong className="text-blue-500 font-bold">YonnPix! </strong>
                  <i className="inline-block animate-shake mb-1 ml-1">👋🏻</i>
                </Dialog.Title>
                <HelloAnimation />
                <div className="mt-4 flex flex-col">
                  <p className="text-zinc-600 max-md:text-sm">
                    Looking for stunning, high-quality photos to enhance your
                    creative projects?{' '}
                    <strong className="text-blue-600">YonnPix</strong> is your
                    gateway to a world of visual inspiration, powered by the
                    Unsplash engine.
                  </p>
                  <div className="flex flex-col space-y-3 mt-3">
                    <button
                      type="button"
                      className={`${buttonStyle} bg-blue-100 text-blue-900 py-2 md:py-3 hover:bg-blue-200`}
                      onClick={closeModal}
                    >
                      OK, Let's dive in!
                    </button>
                    <button
                      type="button"
                      className={`${buttonStyle} bg-zinc-100 text-zinc-600 text-sm py-1 md:py-2 hover:bg-zinc-50`}
                      onClick={closeForDay}
                    >
                      Don't show me for today.
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
