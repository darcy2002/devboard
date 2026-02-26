import { useQuery } from '@tanstack/react-query';
import { fetchTasks } from '../services/statsService';
import { Task } from '../types';

interface RecentTasksListProps {
  onSelectTask: (task: Task) => void;
}

const statusLabels: Record<string, string> = {
  pending: 'To Do',
  in_progress: 'In Progress',
  completed: 'Done',
};

const statusClass: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  in_progress: 'bg-indigo-100 text-indigo-700',
  completed: 'bg-emerald-100 text-emerald-700',
};

export default function RecentTasksList({ onSelectTask }: RecentTasksListProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-tasks'],
    queryFn: () => fetchTasks(),
    select: (res) => res.data?.slice(0, 8) ?? [],
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Tasks</h3>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 skeleton-shimmer rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Tasks</h3>
        <p className="text-sm text-gray-500">No tasks yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Tasks</h3>
      <ul className="space-y-2">
        {data.map((task) => {
          const due = new Date(task.dueDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });
          return (
            <li key={task._id}>
              <button
                type="button"
                onClick={() => onSelectTask(task)}
                className="w-full text-left p-3 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/50 active:scale-[0.99] transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={`font-medium text-gray-900 truncate ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </span>
                  <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${statusClass[task.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {statusLabels[task.status] ?? task.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Due {due} · {task.priority}</p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
