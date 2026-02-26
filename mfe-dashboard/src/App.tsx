import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Button from 'sharedUi/Button';
import EmptyState from 'sharedUi/EmptyState';
import { useStats } from './hooks/useStats';
import StatsGrid from './components/StatsGrid';
import TaskChart from './components/TaskChart';
import PriorityChart from './components/PriorityChart';
import RefreshButton from './components/RefreshButton';
import SkeletonStatCard from './components/SkeletonStatCard';
import EmptyDashboard from './components/EmptyDashboard';
import RecentTasksList from './components/RecentTasksList';
import TaskDetailModal from './components/TaskDetailModal';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
      retry: 1,
    },
  },
});

const DashboardContent = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const { stats, isLoading, isError, refetch, isRefetching } = useStats();

  if (isLoading) {
    return (
      <div className="p-6 sm:p-8 bg-white h-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">Overview of your tasks</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonStatCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 sm:p-8 bg-white h-full">
        <EmptyState
          icon={
            <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          }
          title="Failed to load stats"
          action={<Button onClick={() => refetch()}>Retry</Button>}
        />
      </div>
    );
  }

  if (!stats || stats.total === 0) {
    return (
      <div className="p-6 sm:p-8 bg-white h-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">Overview of your tasks</p>
          </div>
          <RefreshButton onRefresh={() => refetch()} isRefreshing={isRefetching} />
        </div>
        <EmptyDashboard />
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 bg-white h-full overflow-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">Overview of your tasks and stats</p>
        </div>
        <RefreshButton onRefresh={() => refetch()} isRefreshing={isRefetching} />
      </div>

      <div className="mb-8">
        <StatsGrid stats={stats} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TaskChart stats={stats} />
          <PriorityChart stats={stats} />
        </div>
        <div>
          <RecentTasksList onSelectTask={(task) => setSelectedTaskId(task._id)} />
        </div>
      </div>

      {selectedTaskId && (
        <TaskDetailModal taskId={selectedTaskId} onClose={() => setSelectedTaskId(null)} />
      )}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DashboardContent />
  </QueryClientProvider>
);

export default App;
