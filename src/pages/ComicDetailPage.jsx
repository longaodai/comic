import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { request } from '../libs/axios';

export default function ComicDetailPage() {
  const { slug } = useParams();
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    request
      .get(`/truyen-tranh/${slug}`)
      .then((response) => {
        setComic(response.data.data.item);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch comic details.', err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!comic)
    return <p className="text-center text-gray-500">No comic found.</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="card lg:card-side bg-base-100 shadow-xl flex">
        <figure className="flex-1/2">
          <img
            src={`https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`}
            alt={comic.name}
            className="w-64 object-contain"
          />
        </figure>
        <div className="card-body">
          <h1 className="card-title text-3xl font-bold">{comic.name}</h1>
          <p
            className="text-gray-500"
            dangerouslySetInnerHTML={{ __html: comic.content }}
          ></p>
          <div className="mt-2">
            {comic.category?.map((cat) => (
              <span key={cat.id} className="badge badge-secondary mr-2">
                {cat.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Chapters:</h2>
        {comic?.chapters?.[0]?.server_data?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {comic.chapters[0].server_data.map((chapter) => (
              <div key={chapter.chapter_name}>
                <Link
                  to={`/comic-reader/${comic.slug}/${chapter.chapter_name}`}
                  className="btn btn-primary w-full text-left"
                >
                  Chapter {chapter.chapter_name}
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No chapters available.</p>
        )}
      </div>
    </div>
  );
}
