const SkeletonStatCard = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-lg" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-20 mb-2" />
          <div className="h-7 bg-gray-200 rounded w-12" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonStatCard;
