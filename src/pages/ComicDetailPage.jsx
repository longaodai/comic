import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { request } from '../libs/axios';
import SkeletonComicDetail from '../components/ui/skeletons/SkeletonComicDetail';

export default function ComicDetailPage() {
  const { slug } = useParams();
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllChapters, setShowAllChapters] = useState(false);

  useEffect(() => {
    request
      .get(`/truyen-tranh/${slug}`)
      .then((response) => {
        setComic(response.data.data.item);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch comic details.');
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <SkeletonComicDetail />;

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-error">{error}</p>
      </div>
    );
  }

  if (!comic) {
    return <p className="text-center text-gray-500">No comic found.</p>;
  }

  const chapters = [...(comic?.chapters?.[0]?.server_data || [])].sort(
    (a, b) => Number(b.chapter_name) - Number(a.chapter_name)
  );
  const visibleChapters = showAllChapters ? chapters : chapters.slice(0, 20);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row bg-base-100 shadow-xl rounded-xl overflow-hidden">
        <div className="relative w-full lg:w-1/4">
          <img
            src={`https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`}
            alt={comic.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 lg:w-3/4">
          <h1 className="text-3xl font-bold text-base-content">{comic.name}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="badge badge-primary text-xs">{comic.status}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {comic.category?.map((cat) => (
              <span key={cat.id} className="badge badge-secondary text-xs">
                {cat.name}
              </span>
            ))}
          </div>
          <p
            className="mt-4 text-base-content text-sm line-clamp-5"
            dangerouslySetInnerHTML={{ __html: comic.content }}
          ></p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Chapters</h2>
        {visibleChapters.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-4">
              {visibleChapters.map((chapter) => (
                <Link
                  key={chapter.chapter_name}
                  to={`/comic-reader/${comic.slug}/${chapter.chapter_name}`}
                  className="btn btn-sm btn-outline btn-primary text-center"
                >
                  Chap {chapter.chapter_name}
                </Link>
              ))}
            </div>
            {chapters.length > 20 && (
              <button
                onClick={() => setShowAllChapters(!showAllChapters)}
                className="mt-4 w-full text-primary font-bold hover:underline"
              >
                {showAllChapters
                  ? 'Thu gọn'
                  : `Xem thêm (${chapters.length - 20} chương)`}
              </button>
            )}
          </>
        ) : (
          <p className="text-gray-500">No chapters available.</p>
        )}
      </div>
    </div>
  );
}
