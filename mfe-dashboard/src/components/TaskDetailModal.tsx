import { useQuery } from '@tanstack/react-query';
import { fetchTask } from '../services/statsService';
import { Task } from '../types';

interface TaskDetailModalProps {
  taskId: string;
  onClose: () => void;
}

const priorityColors: Record<string, string> = {
  low: 'bg-sky-100 text-sky-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-rose-100 text-rose-700',
};

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

export default function TaskDetailModal({ taskId, onClose }: TaskDetailModalProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => fetchTask(taskId),
    enabled: !!taskId,
    select: (res) => res.data,
  });

  const task = data;

  if (isLoading || !task) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 animate-pulse" onClick={(e) => e.stopPropagation()}>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-full mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  const formattedDate = new Date(task.dueDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const isOverdue = task.status !== 'completed' && new Date(task.dueDate) < new Date();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6 border-b border-gray-100 flex items-start justify-between">
          <h2 className="text-xl font-semibold text-gray-900 pr-10">{task.title}</h2>
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</span>
            <p className={`mt-1 inline-flex px-2 py-0.5 rounded-full text-sm font-medium ${statusClass[task.status] ?? 'bg-gray-100'}`}>
              {statusLabels[task.status] ?? task.status}
            </p>
          </div>
          {task.description && (
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Description</span>
              <p className="mt-1 text-gray-700">{task.description}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex px-2.5 py-1 rounded-full text-sm font-medium ${priorityColors[task.priority]}`}>
              {task.priority} priority
            </span>
            <span className={`text-sm ${isOverdue ? 'text-rose-600 font-medium' : 'text-gray-500'}`}>
              Due {formattedDate}
              {isOverdue && ' (Overdue)'}
            </span>
          </div>
        </div>
        <div className="p-6 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
