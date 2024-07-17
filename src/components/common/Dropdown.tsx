import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import ChevronDownIcon from '../../svg/ChevronDownIcon';

type Props = {
  options: string[];
  handleOnDownload: () => void;
};

export default function Dropdown({ options, handleOnDownload }: Props) {
  if (!options) return;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="text-white flex w-full py-2 px-3 items-center space-x-2 justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
        <ChevronDownIcon />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="py-1">
            {options.map((option) => (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleOnDownload(option)}
                    className={`${
                      active && 'bg-gray-200'
                    } duration-75 ease-out group flex w-full items-center text-gray-900 rounded-md px-3 py-2.5 text-sm`}
                  >
                    {option}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
