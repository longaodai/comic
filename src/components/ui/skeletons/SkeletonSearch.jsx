const SkeletonSearch = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="h-10 w-64 bg-gray-300 dark:bg-gray-700 rounded mb-6 mx-auto animate-pulse"></div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {Array(12)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 animate-pulse"
            ></div>
          ))}
      </div>

      <div className="flex justify-center mt-6">
        <div className="w-48 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonSearch;
