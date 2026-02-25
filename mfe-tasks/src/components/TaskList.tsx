import { useFetchTasks } from '../hooks/useTasks';
import { TaskFilter as TaskFilterType } from '../types';
import TaskCard from './TaskCard';
import SkeletonCard from './SkeletonCard';
import EmptyState from './EmptyState';

interface TaskListProps {
  filter: TaskFilterType;
}

const TaskList = ({ filter }: TaskListProps) => {
  const { data: tasks, isLoading, isError, error, refetch } = useFetchTasks(filter);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Failed to load tasks</h3>
        <p className="text-sm text-gray-500 mb-4">{(error as Error)?.message || 'Something went wrong'}</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return <EmptyState filter={filter} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
