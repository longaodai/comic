import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { request } from '../libs/axios';
import ComicCard from '../components/ui/ComicCard';
import Pagination from '../components/ui/Pagination';
import SectionTitle from '../components/ui/SectionTitle';
import SkeletonComicCategory from '../components/ui/skeletons/SkeletonComicCategory';

export default function ComicCategoryPage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [comics, setComics] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalItemsPerPage: 24,
    currentPage: 1,
    pageRanges: 5,
  });

  const currentPage = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    setLoading(true);
    request
      .get(`/the-loai/${slug}?page=${currentPage}`)
      .then((response) => {
        const data = response.data.data;
        setTitle(data.titlePage);
        setComics(data.items || []);
        setPagination(data.params.pagination);
      })
      .catch(() => {
        setComics([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug, currentPage]);

  if (loading) {
    return <SkeletonComicCategory />;
  }

  if (!comics.length)
    return <p className="text-center text-gray-500">No comic found.</p>;

  return (
    <div className="container mx-auto p-4">
      <SectionTitle title={title || 'Comic Category'} />

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
        {comics.map((comic) => (
          <ComicCard comic={comic} key={comic._id} />
        ))}
      </div>

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
