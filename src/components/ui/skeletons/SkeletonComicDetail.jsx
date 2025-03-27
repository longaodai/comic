const SkeletonComicDetail = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row bg-base-100 shadow-xl rounded-xl overflow-hidden animate-pulse">
        <div className="w-full lg:w-1/4 bg-gray-300 h-72"></div>
        <div className="p-6 lg:w-3/4">
          <div className="h-8 w-48 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-24 bg-gray-300 rounded mb-3"></div>
          <div className="h-6 w-40 bg-gray-300 rounded mb-3"></div>
          <div className="h-20 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="mt-6">
        <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Array(12)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="h-10 bg-gray-300 rounded"></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonComicDetail;
