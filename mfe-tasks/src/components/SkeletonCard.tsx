const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 border-l-4 border-l-gray-200 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-5 bg-gray-200 rounded w-12" />
      </div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
      <div className="flex items-center gap-2 mb-4">
        <div className="h-5 bg-gray-200 rounded-full w-16" />
        <div className="h-5 bg-gray-200 rounded-full w-20" />
      </div>
      <div className="flex gap-2">
        <div className="h-8 bg-gray-200 rounded-lg w-28" />
        <div className="h-8 bg-gray-200 rounded-lg w-16" />
      </div>
    </div>
  );
};

export default SkeletonCard;
