import { useState } from 'react';
import PhotoSection from '../src/components/home/PhotoSection';
import SearchSection from '../src/components/home/SearchSection';

export default function Home() {
  const [photoList, setPhotoList] = useState(['/tmp/1.jpg']);
  // useEffect(() => {
  //   getRandomPhotos(100)
  //     .then((res) => {
  //       console.log(res.data);
  //       setPhotoList(res.data.map((image: any) => image.urls.small));
  //     })
  //     .catch(console.log);
  // }, []);

  return (
    <main className="max-w-7xl w-full mx-auto">
      <SearchSection />
      <PhotoSection photoList={photoList} />
    </main>
  );
}
