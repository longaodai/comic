import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { request } from '../libs/axios';
import SectionTitle from '../components/ui/SectionTitle';
import SkeletonCategoryPage from '../components/ui/skeletons/SkeletonCategoryPage';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await request.get(`/the-loai`);
        setCategories(response.data.data.items || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <SkeletonCategoryPage />;
  }

  return (
    <div className="container mx-auto p-4">
      {categories.length > 0 ? (
        <>
          <SectionTitle title="Danh Mục Thể Loại" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/categories/${category.slug}`}
                className="group"
              >
                <div className="bg-base-100 shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl p-4 flex flex-col items-center text-center border border-primary dark:border-secondary group-hover:border-primary dark:group-hover:border-secondary">
                  <h2 className="text-lg font-bold text-secondary group-hover:text-secondary">
                    {category.name}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-10 text-gray-500">
          {error
            ? 'Lỗi khi tải danh mục. Vui lòng thử lại sau!'
            : 'Không có danh mục nào để hiển thị.'}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
