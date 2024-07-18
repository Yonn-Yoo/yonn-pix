import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ImageSection from '../src/components/home/ImageSection';
import SearchSection from '../src/components/home/SearchSection';
import { images, loader } from '../src/recoil/atom';
import { ImageDataType } from '../src/types/type';

export default function Home() {
  const [imageList, setImageList] = useRecoilState<ImageDataType[]>(images);
  const setIsLoading = useSetRecoilState(loader);

  // FIXME: commented out temporarily to save request count
  useEffect(() => {
    setIsLoading(true);
    // getRandomPhotos(30)
    //   .then((res) => setImageList(res.data.map((image: any) => image)))
    //   .catch(console.log)
    //   .finally(() => setIsLoading(false));

    fetch('/data/random.json')
      .then((res) => res.json())
      .then(setImageList)
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <main className="max-w-7xl w-full mx-auto">
        <SearchSection />
        <ImageSection imageList={imageList} setImageList={setImageList} />
      </main>
    </>
  );
}
