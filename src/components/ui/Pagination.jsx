import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
  const { pathname } = useLocation();

  if (totalPages <= 1) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="flex justify-center items-center flex-wrap gap-2 mt-16">
      {currentPage > 1 && (
        <Link
          to={`${pathname}?page=${currentPage - 1}`}
          onClick={() => onPageChange(currentPage - 1)}
          className="btn btn-sm btn-outline transition-transform hover:scale-105"
        >
          ‹ Previous
        </Link>
      )}

      {startPage > 1 && (
        <>
          <Link
            to={`${pathname}?page=1`}
            onClick={() => onPageChange(1)}
            className="btn btn-sm btn-outline"
          >
            1
          </Link>
          {startPage > 2 && <span className="text-gray-400">...</span>}
        </>
      )}

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const page = startPage + i;
        return (
          <Link
            key={page}
            to={`${pathname}?page=${page}`}
            onClick={() => onPageChange(page)}
            className={`btn btn-sm transition ${
              page === currentPage
                ? 'btn-primary scale-110 shadow-md'
                : 'btn-outline hover:scale-105'
            }`}
          >
            {page}
          </Link>
        );
      })}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="text-gray-400">...</span>
          )}
          <Link
            to={`${pathname}?page=${totalPages}`}
            onClick={() => onPageChange(totalPages)}
            className="btn btn-sm btn-outline"
          >
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages && (
        <Link
          to={`${pathname}?page=${currentPage + 1}`}
          onClick={() => onPageChange(currentPage + 1)}
          className="btn btn-sm btn-outline transition-transform hover:scale-105"
        >
          Next ›
        </Link>
      )}
    </div>
  );
}
