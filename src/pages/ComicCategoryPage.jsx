import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { request } from '../libs/axios';
import ComicCard from '../components/ui/ComicCard';
import Pagination from '../components/ui/Pagination';

export default function ComicCategoryPage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [comics, setComics] = useState([]);
  const [title, setTitle] = useState('');
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalItemsPerPage: 24,
    currentPage: 1,
    pageRanges: 5,
  });

  const currentPage = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    request.get(`/the-loai/${slug}?page=${currentPage}`).then((response) => {
      const data = response.data.data;
      setTitle(data.titlePage);
      setComics(data.items || []);
      setPagination(data.params.pagination);
    });
  }, [slug, currentPage]);

  if (!comics.length)
    return <p className="text-center text-gray-500">No comic found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-6 text-primary">
        {title || 'Comic Category'}
      </h1>

      {/* Danh sách truyện */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
        {comics.map((comic) => (
          <ComicCard comic={comic} key={comic._id} />
        ))}
      </div>

      {/* Phân trang */}
      <Pagination
        totalItems={pagination.totalItems}
        itemsPerPage={pagination.totalItemsPerPage}
        currentPage={pagination.currentPage}
        pageRanges={pagination.pageRanges}
        onPageChange={(page) => setSearchParams({ page })}
      />
    </div>
  );
}
