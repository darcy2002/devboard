import Card from 'sharedUi/Card';

const SkeletonStatCard = () => {
  return (
    <Card padding="md" className="p-5 overflow-hidden">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 skeleton-shimmer rounded-xl" />
        <div className="flex-1">
          <div className="h-3 skeleton-shimmer rounded w-16 mb-2" />
          <div className="h-7 skeleton-shimmer rounded w-10" />
        </div>
      </div>
    </Card>
  );
};

export default SkeletonStatCard;
