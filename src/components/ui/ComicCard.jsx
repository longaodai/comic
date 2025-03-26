import { Link } from 'react-router-dom';

export default function ComicCard({ comic }) {
  return (
    <div className="relative group overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
      {/* Ảnh Truyện */}
      <Link to={`/comic-detail/${comic.slug}`} className="block relative">
        <img
          src={`https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`}
          alt={comic.name}
          className="w-full h-64 object-cover rounded-xl"
        />
        {/* Hiệu ứng Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
        {/* Tiêu đề Truyện */}
        <h2 className="absolute bottom-2 left-3 text-white text-lg font-bold drop-shadow-md line-clamp-2">
          {comic.name}
        </h2>
      </Link>

      {/* Thông tin trạng thái & thể loại */}
      <div className="absolute top-2 left-2 flex flex-wrap gap-1">
        <span className="bg-primary text-xs text-white px-2 py-1 rounded">
          {comic.status}
        </span>
        {comic.category.slice(0, 2).map((cat) => (
          <span
            key={cat.id}
            className="bg-secondary text-xs text-white px-2 py-1 rounded"
          >
            {cat.name}
          </span>
        ))}
      </div>
    </div>
  );
}
