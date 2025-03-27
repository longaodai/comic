const SkeletonCategoryPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-6 animate-pulse"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array(20)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 h-24 animate-pulse"
            ></div>
          ))}
      </div>
    </div>
  );
};

export default SkeletonCategoryPage;
