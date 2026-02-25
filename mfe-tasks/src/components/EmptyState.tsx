import { TaskFilter } from '../types';

interface EmptyStateProps {
  filter: TaskFilter;
}

const messages: Record<TaskFilter, { title: string; description: string }> = {
  all: {
    title: 'No tasks yet',
    description: 'Create your first task to get started!',
  },
  pending: {
    title: 'No pending tasks',
    description: 'All tasks are completed. Great job!',
  },
  completed: {
    title: 'No completed tasks',
    description: 'Complete some tasks to see them here.',
  },
};

const EmptyState = ({ filter }: EmptyStateProps) => {
  const msg = messages[filter];
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{msg.title}</h3>
      <p className="text-sm text-gray-500">{msg.description}</p>
    </div>
  );
};

export default EmptyState;
