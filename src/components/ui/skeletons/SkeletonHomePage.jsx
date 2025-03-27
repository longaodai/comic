import React from 'react';
import SkeletonCategoryPage from './SkeletonCategoryPage';

const SkeletonHomePage = () => {
  return (
    <div className="container mx-auto p-2 sm:p-4 space-y-8 sm:space-y-10 pt-0">
      {/* Skeleton Slider */}
      <div className="skeleton h-56 w-full rounded-lg"></div>

      {/* Skeleton Sections */}
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="rounded-xl shadow-xl mt-16">
          <div className="skeleton h-8 w-48 mb-6"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="skeleton w-full aspect-[3/4] rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonHomePage;
