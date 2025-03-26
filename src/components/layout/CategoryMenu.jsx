import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CategoryMenu() {
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const categoryRefs = useRef({});
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    fetch('https://otruyenapi.com/v1/api/the-loai')
      .then((res) => res.json())
      .then((data) => setCategories(data.data.items))
      .catch((err) => console.error('Error fetching categories:', err));
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

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="bg-base-200 shadow-lg rounded-md">
      <div className="container mx-auto relative">
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-base-300/80 rounded-full shadow-md hover:bg-base-300 transition hidden md:flex"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-base-300/80 rounded-full shadow-md hover:bg-base-300 transition hidden md:flex"
        >
          <ChevronRight size={20} />
        </button>

        <div className="relative ">
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-base-200 via-base-200/80 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-base-200 via-base-200/80 to-transparent pointer-events-none"></div>

          <div
            ref={scrollContainerRef}
            className="flex gap-3 px-4 py-4 lg:pt-8 overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-base-300 whitespace-nowrap scroll-smooth"
          >
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/categories/${category.slug}`}
                ref={(el) => (categoryRefs.current[category.slug] = el)}
                className={`btn btn-sm rounded-full transition-all duration-300 ${
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
