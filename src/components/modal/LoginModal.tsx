import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import GoogleLogo from '../../svg/GoogleLogo';

export default function LoginModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const router = useRouter();

  const navigateToSignUp = () => {
    closeModal();
    router.push('/signup');
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
              <Dialog.Panel className="flex flex-col space-y-4 w-screen md:w-full md:max-w-md transform overflow-hidden rounded-xl max-md:rounded-b-none bg-white/80 backdrop-blur p-6 text-left shadow-xl">
                <Dialog.Title
                  as="h2"
                  className="text-lg md:text-xl text-center font-semibold leading-6 text-zinc-900"
                >
                  Welcome Back
                </Dialog.Title>
                <button
                  type="button"
                  className="text-white bg-[#e7484a] hover:bg-opacity-80 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center mx-auto duration-150 ease-out"
                >
                  <GoogleLogo />
                  Sign in with Google
                </button>
                <Divider />
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-1 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center mr-4">
                    <input
                      id="rememberId"
                      type="checkbox"
                      className="w-4 h-4 !text-teal-600 bg-gray-100 border-gray-300"
                    />
                    <label
                      htmlFor="rememberId"
                      className="ml-2 text-sm font-medium text-zinc-500"
                    >
                      Remember me
                    </label>
                  </div>
                  <button className="font-medium text-sm text-blue-500 hover:text-blue-400 duration-150 ease-out">
                    Forgot password?
                  </button>
                </div>
                <button
                  type="button"
                  className="w-full text-white bg-blue-500 hover:bg-opacity-80 font-medium rounded-lg text-sm py-2.5 duration-150 ease-out"
                >
                  Sign in to your account
                </button>
                <div className="flex text-sm font-medium space-x-1">
                  <span className="text-zinc-500">
                    Don't have an account yet?
                  </span>
                  <button
                    onClick={navigateToSignUp}
                    className="text-blue-500 hover:text-blue-400 duration-150 ease-out"
                  >
                    Sign up here
                  </button>
                </div>
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
