import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { request } from '../../libs/axios';
import SkeletonCategoryMenu from '../ui/skeletons/SkeletonCategoryMenu';

export default function CategoryMenu() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const categoryRefs = useRef({});
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    request
      .get(`/the-loai`)
      .then((response) => {
        setCategories(response.data.data.items || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const activeSlug = location.pathname.split('/').pop();
    if (activeSlug && categoryRefs.current[activeSlug]) {
      categoryRefs.current[activeSlug].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [categories, location.pathname]);

  if (loading) return <SkeletonCategoryMenu />;

  return (
    <div className="bg-base-100 shadow-lg rounded-md">
      <div className="container mx-auto relative">
        <div className="relative">
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-base-100 via-base-100/80 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-base-100 via-base-100/80 to-transparent pointer-events-none"></div>

          <div
            ref={scrollContainerRef}
            className="flex gap-3 px-4 py-4 lg:pt-8 overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-base-200 whitespace-nowrap scroll-smooth"
          >
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/categories/${category.slug}`}
                ref={(el) => (categoryRefs.current[category.slug] = el)}
                className={`btn btn-sm transition-all duration-300 ${
                  location.pathname.includes(category.slug)
                    ? 'btn-primary shadow-md scale-105'
                    : 'btn-outline hover:scale-105'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
