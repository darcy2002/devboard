import { useState } from 'react';
import { Task } from '../types';
import { useToggleStatus, useDeleteTask } from '../hooks/useTasks';
import PriorityBadge from './PriorityBadge';
import OverdueIndicator from './OverdueIndicator';
import ConfirmModal from './ConfirmModal';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const toggleStatus = useToggleStatus();
  const deleteTask = useDeleteTask();

  const isOverdue = task.status !== 'completed' && new Date(task.dueDate) < new Date();
  const isCompleted = task.status === 'completed';
  const statusLabel = task.status === 'completed' ? 'Completed' : task.status === 'in_progress' ? 'In Progress' : 'Pending';

  const borderColor = isCompleted
    ? 'border-l-green-500'
    : isOverdue
    ? 'border-l-red-500'
    : 'border-l-indigo-500';

  const formattedDate = new Date(task.dueDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <>
      <div className={`bg-white rounded-xl border border-gray-200 p-4 border-l-4 ${borderColor} transition-shadow hover:shadow-md`}>
        <div className="flex items-start justify-between mb-2">
          <h3 className={`font-semibold text-gray-900 ${isCompleted ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </h3>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            isCompleted ? 'bg-green-100 text-green-700' : task.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
          }`}>
            {statusLabel}
          </span>
        </div>

        {task.description && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{task.description}</p>
        )}

        <div className="flex items-center gap-2 flex-wrap mb-3">
          <PriorityBadge priority={task.priority} />
          <OverdueIndicator status={task.status} dueDate={task.dueDate} />
          <span className="text-xs text-gray-400 ml-auto">
            📅 {formattedDate}
          </span>
        </div>

        <div className="flex gap-2 pt-2 border-t border-gray-100">
          <button
            onClick={() => toggleStatus.mutate({ id: task._id, currentStatus: task.status })}
            disabled={toggleStatus.isPending}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 ${
              isCompleted
                ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                : 'bg-green-50 text-green-700 hover:bg-green-100'
            }`}
          >
            {toggleStatus.isPending ? (
              <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : null}
            {isCompleted ? 'Mark Pending' : 'Mark Complete'}
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          deleteTask.mutate(task._id, {
            onSuccess: () => setShowDeleteModal(false),
          });
        }}
        title="Delete Task"
        message="This action cannot be undone. Are you sure?"
        isLoading={deleteTask.isPending}
      />
    </>
  );
};

export default TaskCard;
