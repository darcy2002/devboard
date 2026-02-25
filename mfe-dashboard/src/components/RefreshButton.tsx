interface RefreshButtonProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

const RefreshButton = ({ onRefresh, isRefreshing }: RefreshButtonProps) => {
  return (
    <button
      onClick={onRefresh}
      disabled={isRefreshing}
      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
    >
      <svg
        className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      {isRefreshing ? 'Refreshing...' : 'Refresh'}
    </button>
  );
};

export default RefreshButton;
