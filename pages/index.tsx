import { useState } from 'react';
import ImageSection from '../src/components/home/ImageSection';
import SearchSection from '../src/components/home/SearchSection';

export default function Home() {
  const [imageList, setImageList] = useState(['/tmp/1.jpg']);

  // useEffect(() => {
  //   getRandomPhotos(30)
  //     .then((res) =>
  //       setImageList(res.data.map((image: any) => image.urls.small))
  //     )
  //     .catch(console.log);
  // }, []);

  return (
    <main className="max-w-7xl w-full mx-auto">
      <SearchSection setImageList={setImageList} />
      <ImageSection imageList={imageList} setImageList={setImageList} />
    </main>
  );
}
