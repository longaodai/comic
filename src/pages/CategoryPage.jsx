import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://otruyenapi.com/v1/api/the-loai')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data.items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Danh Mục Thể Loại</h1>
      {loading ? (
        <div className="text-center text-lg">Đang tải...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
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
      )}
    </div>
  );
};

export default CategoryPage;
