import { useEffect, useState } from 'react';
import { request } from '../libs/axios';
import ComicCard from '../components/ui/ComicCard';

export default function HomePage() {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    request.get('/home').then((response) => {
      setComics(response.data.data.items || []);
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-6 text-primary">
        Latest Comics
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {comics.map((comic) => (
          <ComicCard comic={comic} key={comic._id} />
        ))}
      </div>
    </div>
  );
}
