import { useRecoilState, useSetRecoilState } from 'recoil';
import { searchPhotos } from '../../api/service';
import useScroll from '../../hooks/useScroll';
import { images, loader, searchFilter } from '../../recoil/atom';
import CameraIcon from '../../svg/CameraIcon';
import MagnifierIcon from '../../svg/MagnifierIcon';

export default function SearchBar({ isHeader }: { isHeader?: boolean }) {
  const [searchCondition, setSearchCondition] = useRecoilState(searchFilter);
  const setImageList = useSetRecoilState(images);
  const setIsLoading = useSetRecoilState(loader);
  const scrollPosition = useScroll();

  const handleSearch = () => {
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
  };

  const handleOnChange = (value: string | null, key: string) => {
    setSearchCondition((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div
      className={`flex items-center duration-300 ${
        isHeader
          ? `max-w-[180px] md:max-w-xl w-full ${
              scrollPosition > 400 ? 'translate-y-0' : '-translate-y-32'
            }`
          : 'w-full'
      }`}
    >
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <CameraIcon className="max-md:hidden w-6 h-6" />
        </div>
        <input
          type="text"
          spellCheck={false}
          className="border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-none block w-full pl-2 md:pl-10 p-2.5"
          placeholder="Search images.."
          onChange={(e) => handleOnChange(e.target.value, 'query')}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          value={searchCondition.query}
        />
      </div>
      <button
        onClick={handleSearch}
        disabled={!searchCondition.query}
        className={`flex items-center space-x-2 py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 duration-150 ease-out ${
          !searchCondition.query && '!bg-zinc-300 cursor-not-allowed'
        } ${isHeader && 'absolute right-1 md:right-2 !p-1.5'}`}
      >
        <MagnifierIcon />
        <span className={`${isHeader && 'hidden'}`}>Search</span>
      </button>
    </div>
  );
}
