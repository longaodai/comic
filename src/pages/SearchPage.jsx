import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { request } from '../libs/axios';
import Pagination from '../components/ui/Pagination';
import ComicCard from '../components/ui/ComicCard';
import useDebounce from '../hooks/useDebounce';
import SkeletonSearch from '../components/ui/skeletons/SkeletonSearch';

const SearchPage = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalItemsPerPage: 24,
    currentPage: 1,
    pageRanges: 3,
  });
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const debouncedSearchQueryValue = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (searchQuery.trim()) {
      setLoading(true);
      request
        .get(`/tim-kiem?keyword=${searchQuery}&page=${currentPage}`)
        .then((response) => {
          setComics(response.data.data.items || []);
          setPagination({
            totalItems: response.data.data.params.pagination.totalItems || 0,
            totalItemsPerPage:
              response.data.data.params.pagination.totalItemsPerPage || 24,
            currentPage:
              response.data.data.params.pagination.currentPage || currentPage,
            pageRanges: response.data.data.params.pagination.pageRanges || 3,
          });
        })
        .catch(() => {
          setComics([]);
        })
        .finally(() => {
          setLoading(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQueryValue, currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery, page: 1 });
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-4xl font-bold text-center my-6 text-primary">
        Kết quả tìm kiếm
      </h1>

      <form
        onSubmit={handleSearch}
        className="flex items-center bg-base-200 rounded-full px-4 py-2 mb-6 max-w-lg mx-auto focus-within:ring-2 focus-within:ring-secondary shadow-sm hover:shadow-md"
      >
        <input
          type="text"
          placeholder="Nhập tên truyện..."
          className="bg-transparent outline-none px-3 py-2 w-full text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 bg-secondary text-white p-2 rounded-full hover:bg-primary transition-all"
        >
          <Search className="text-white" size={20} />
        </button>
      </form>

      {loading ? (
        <SkeletonSearch />
      ) : comics.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {comics.map((comic, index) => (
            <ComicCard comic={comic} key={comic.slug || index} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500"></p>
      )}

      {!loading && pagination.totalItems > pagination.totalItemsPerPage && (
        <Pagination
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.totalItemsPerPage}
          currentPage={pagination.currentPage}
          pageRanges={pagination.pageRanges}
          onPageChange={(page) => {
            setSearchParams({ q: searchQuery, page });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}
    </div>
  );
};

export default SearchPage;
