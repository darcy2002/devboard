const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-2.5">
        <div className="h-5 skeleton-shimmer rounded-full w-16" />
        <div className="h-4 skeleton-shimmer rounded w-14" />
      </div>
      <div className="h-4 skeleton-shimmer rounded w-full mb-1.5" />
      <div className="h-3 skeleton-shimmer rounded w-2/3 mb-3" />
      <div className="pt-1">
        <div className="h-5 skeleton-shimmer rounded-full w-14" />
      </div>
    </div>
  );
};

export default SkeletonCard;
