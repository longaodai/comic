import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { request } from '../libs/axios';

export default function ComicDetailPage() {
  const { slug } = useParams();
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllChapters, setShowAllChapters] = useState(false); // Trạng thái để hiển thị tất cả chương

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-20 h-20 rounded-full bg-gray-300 animate-pulse"></div>
        <p className="text-gray-500 mt-2">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  if (!comic)
    return <p className="text-center text-gray-500">No comic found.</p>;

  // Lấy danh sách chương, sắp xếp từ mới nhất -> cũ nhất
  const chapters = comic?.chapters?.[0]?.server_data || [];
  chapters.sort((a, b) => Number(b.chapter_name) - Number(a.chapter_name));

  // Giới hạn hiển thị chương
  const visibleChapters = showAllChapters ? chapters : chapters.slice(0, 20);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Card chi tiết truyện */}
      <div className="flex flex-col lg:flex-row bg-base-100 shadow-xl rounded-xl overflow-hidden">
        {/* Ảnh truyện */}
        <div className="relative w-full lg:w-1/4">
          <img
            src={`https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`}
            alt={comic.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Thông tin truyện */}
        <div className="p-6 lg:w-3/4">
          <h1 className="text-3xl font-bold">{comic.name}</h1>

          {/* Hiển thị trạng thái truyện */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="bg-primary text-xs text-white px-3 py-1 rounded-full">
              {comic.status}
            </span>
          </div>

          {/* Danh mục truyện */}
          <div className="flex flex-wrap gap-2 mt-3">
            {comic.category?.map((cat) => (
              <span
                key={cat.id}
                className="bg-secondary text-xs text-white px-3 py-1 rounded-full"
              >
                {cat.name}
              </span>
            ))}
          </div>

          {/* Mô tả truyện */}
          <p
            className="mt-4 text-gray-500 text-sm line-clamp-5"
            dangerouslySetInnerHTML={{ __html: comic.content }}
          ></p>
        </div>
      </div>

      {/* Danh sách chương */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Chapters</h2>

        {visibleChapters.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-4">
              {visibleChapters.map((chapter) => (
                <Link
                  key={chapter.chapter_name}
                  to={`/comic-reader/${comic.slug}/${chapter.chapter_name}`}
                  className="px-4 py-2 bg-gray-800 text-white text-center rounded-lg shadow-md hover:bg-primary transition"
                >
                  Chap {chapter.chapter_name}
                </Link>
              ))}
            </div>

            {/* Nút Xem thêm nếu chương > 20 */}
            {chapters.length > 20 && (
              <button
                onClick={() => setShowAllChapters(!showAllChapters)}
                className="mt-4 w-full text-center text-primary font-bold hover:underline"
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
