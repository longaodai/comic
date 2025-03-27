export default function SkeletonCategoryMenu() {
  return (
    <div className="bg-base-100 shadow-lg rounded-md">
      <div className="container mx-auto relative">
        <div className="relative">
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-base-100 via-base-100/80 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-base-100 via-base-100/80 to-transparent pointer-events-none"></div>

          <div className="flex gap-3 px-4 py-4 lg:pt-8 overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-base-200 whitespace-nowrap scroll-smooth">
            {Array.from({ length: 15 }).map((_, index) => (
              <div
                key={index}
                className="w-24 h-8 bg-base-300 skeleton rounded-md btn btn-sm transition-all duration-300"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
