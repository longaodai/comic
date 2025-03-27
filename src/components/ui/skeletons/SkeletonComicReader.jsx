import React from 'react';

const SkeletonComicReader = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Skeleton Title */}
      <div className="skeleton h-8 w-2/3 mb-4"></div>

      {/* Skeleton Navigation */}
      <div className="flex justify-between items-center mb-4 gap-4">
        <div className="skeleton h-10 w-32"></div>
        <div className="skeleton h-10 w-40"></div>
        <div className="skeleton h-10 w-32"></div>
      </div>

      {/* Skeleton Images */}
      <div className="flex flex-col items-center gap-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="skeleton w-full max-w-3xl h-96 rounded-lg"
          ></div>
        ))}
      </div>

      {/* Skeleton Bottom Navigation */}
      <div className="mt-20"></div>
      <div className="flex justify-between items-center mb-4 gap-4">
        <div className="skeleton h-10 w-32"></div>
        <div className="skeleton h-10 w-40"></div>
        <div className="skeleton h-10 w-32"></div>
      </div>

      {/* Sticky Navigation Skeleton */}
      <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-80 p-3 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="skeleton h-10 w-32"></div>
          <div className="skeleton h-10 w-40"></div>
          <div className="skeleton h-10 w-32"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonComicReader;
