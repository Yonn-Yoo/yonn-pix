import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import ChevronDownIcon from '../../svg/ChevronDownIcon';
import { MapType, UrlsType } from '../../types/type';

const FULL_WIDTH = 2400;
const REGULAR_WIDTH = 1920;
const SMALL_WIDTH = 640;

type Props = {
  options: string[];
  handleOnDownload: (option: keyof UrlsType) => void;
  isOptionQuality?: boolean;
  size?: { width: number; height: number };
};

export default function Dropdown({
  options,
  handleOnDownload,
  isOptionQuality,
  size,
}: Props) {
  if (!options) return;

  const optionLabelMap: MapType = {
    raw: 'raw',
    full: 'large',
    regular: 'medium',
    small: 'small',
  };

  const getSize = (option: string) => {
    if (!size || !size.width || !size.height)
      throw new Error('Invalid size object or missing width/height');

    const { width, height } = size;

    const calculateHeight = (targetWidth: number) => {
      return Math.floor((targetWidth / width) * height);
    };

    switch (option) {
      case 'raw':
        return `${width} x ${height}`;
      case 'full':
        return `${FULL_WIDTH} x ${calculateHeight(FULL_WIDTH)}`;
      case 'regular':
        return `${REGULAR_WIDTH} x ${calculateHeight(REGULAR_WIDTH)}`;
      case 'small':
        return `${SMALL_WIDTH} x ${calculateHeight(SMALL_WIDTH)}`;
      default:
        throw new Error(`Unsupported option: ${option}`);
    }
  };

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
            {options.map((option: string) => (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleOnDownload(option as keyof UrlsType)}
                    className={`${
                      active && 'bg-gray-200'
                    } duration-75 ease-out group flex w-full justify-between items-end text-gray-900 rounded-md px-3 py-2.5 text-sm capitalize`}
                  >
                    <span>
                      {isOptionQuality ? optionLabelMap[option] : option}
                    </span>
                    {size && (
                      <span className="text-slate-500 text-xs">
                        {getSize(option)}
                      </span>
                    )}
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
