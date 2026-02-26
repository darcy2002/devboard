import Card from 'sharedUi/Card';

const SkeletonStatCard = () => {
  return (
    <Card padding="md" className="p-5 overflow-hidden">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 skeleton-shimmer rounded-lg" />
        <div className="flex-1">
          <div className="h-4 skeleton-shimmer rounded w-20 mb-2" />
          <div className="h-7 skeleton-shimmer rounded w-12" />
        </div>
      </div>
    </Card>
  );
};

export default SkeletonStatCard;
