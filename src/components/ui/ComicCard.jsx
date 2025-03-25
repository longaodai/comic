import { Link } from 'react-router-dom';

export default function ComicCard({ comic }) {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
      <figure>
        <img
          src={`https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`}
          alt={comic.name}
          className="w-full h-56 object-cover"
        />
      </figure>
      <div className="card-body relative">
        <h2 className="card-title">{comic.name}</h2>
        <div className="badge badge-primary">{comic.status}</div>
        <div className="flex flex-wrap gap-1 mt-2">
          {comic.category.map((cat) => (
            <span key={cat.id} className="badge badge-secondary">
              {cat.name}
            </span>
          ))}
        </div>
        <div className="card-actions justify-end mt-4 absolute bottom-2.5 ">
          <Link
            to={`/comic-detail/${comic.slug}`}
            className="btn btn-lg btn-neutral"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}
