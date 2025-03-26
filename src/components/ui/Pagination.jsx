import { Link } from 'react-router-dom';

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  pageRanges,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startPage = Math.max(1, currentPage - Math.floor(pageRanges / 2));
  const endPage = Math.min(totalPages, startPage + pageRanges - 1);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      {/* Nút Previous */}
      {currentPage > 1 && (
        <Link
          to={`?page=${currentPage - 1}`}
          onClick={() => onPageChange(currentPage - 1)}
          className="btn btn-sm btn-outline"
        >
          ‹ Previous
        </Link>
      )}

      {/* Các số trang */}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const page = startPage + i;
        return (
          <Link
            key={page}
            to={`?page=${page}`}
            onClick={() => onPageChange(page)}
            className={`btn btn-sm ${
              page === currentPage ? 'btn-primary' : 'btn-outline'
            }`}
          >
            {page}
          </Link>
        );
      })}

      {/* Nút Next */}
      {currentPage < totalPages && (
        <Link
          to={`?page=${currentPage + 1}`}
          onClick={() => onPageChange(currentPage + 1)}
          className="btn btn-sm btn-outline"
        >
          Next ›
        </Link>
      )}
    </div>
  );
}
