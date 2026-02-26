import { useState } from 'react';
import Button from 'sharedUi/Button';
import Badge from 'sharedUi/Badge';
import { useTask, useUpdateTask, useDeleteTask } from '../hooks/useTasks';
import { Task } from '../types';
import { KANBAN_COLUMNS } from '../types';
import ConfirmModal from './ConfirmModal';

interface TaskDetailModalProps {
  taskId: string;
  onClose: () => void;
  onDeleted?: () => void;
}

const statusBadgeVariant: Record<string, 'success' | 'info' | 'warning'> = {
  completed: 'success',
  in_progress: 'info',
  pending: 'warning',
};

const priorityBadgeVariant: Record<string, 'info' | 'warning' | 'danger'> = {
  low: 'info',
  medium: 'warning',
  high: 'danger',
};

export default function TaskDetailModal({ taskId, onClose, onDeleted }: TaskDetailModalProps) {
  const { data: task, isLoading } = useTask(taskId);
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const [editing, setEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [form, setForm] = useState<Partial<Task>>({});

  const handleSave = () => {
    if (!taskId || !form.title) return;
    updateTask.mutate(
      { id: taskId, payload: { title: form.title, description: form.description, priority: form.priority, dueDate: form.dueDate, status: form.status } },
      { onSuccess: () => setEditing(false) }
    );
  };

  const handleDelete = () => {
    deleteTask.mutate(taskId, {
      onSuccess: () => {
        setShowDeleteConfirm(false);
        onDeleted?.();
        onClose();
      },
    });
  };

  const startEdit = () => {
    if (task) {
      const d = task.dueDate ? new Date(task.dueDate) : null;
      setForm({
        title: task.title,
        description: task.description ?? '',
        priority: task.priority,
        dueDate: d ? d.toISOString().slice(0, 10) : '',
        status: task.status,
      });
      setEditing(true);
    }
  };

  if (isLoading || !task) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-modal-backdrop" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-auto p-8 animate-modal-panel" onClick={(e) => e.stopPropagation()}>
          <div className="h-6 skeleton-shimmer rounded w-3/4 mb-4" />
          <div className="h-4 skeleton-shimmer rounded w-full mb-2" />
          <div className="h-4 skeleton-shimmer rounded w-1/2" />
        </div>
      </div>
    );
  }

  const column = KANBAN_COLUMNS.find((c) => c.id === task.status);
  const formattedDate = new Date(task.dueDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const isOverdue = task.status !== 'completed' && new Date(task.dueDate) < new Date();

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-modal-backdrop"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col animate-modal-panel"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-100 flex items-start justify-between">
            {editing ? (
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="text-xl font-semibold text-gray-900 border border-gray-200 hover:border-gray-300 rounded-xl px-3 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition-all duration-200"
                autoFocus
              />
            ) : (
              <h2 className="text-xl font-semibold text-gray-900 pr-8">{task.title}</h2>
            )}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {editing ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={form.description ?? ''}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    rows={3}
                    className="w-full border border-gray-200 hover:border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition-all duration-200"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={form.priority}
                      onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value as Task['priority'] }))}
                      className="w-full border border-gray-200 hover:border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition-all duration-200"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due date</label>
                    <input
                      type="date"
                      value={form.dueDate ?? ''}
                      onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
                      className="w-full border border-gray-200 hover:border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as Task['status'] }))}
                    className="w-full border border-gray-200 hover:border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition-all duration-200"
                  >
                    {KANBAN_COLUMNS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <>
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</span>
                  <p className="mt-1">
                    <Badge variant={statusBadgeVariant[task.status] ?? 'default'} size="md">
                      {column?.title ?? task.status}
                    </Badge>
                  </p>
                </div>
                {task.description && (
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Description</span>
                    <p className="mt-1 text-gray-700">{task.description}</p>
                  </div>
                )}
                <div className="flex flex-wrap gap-2 items-center">
                  <Badge variant={priorityBadgeVariant[task.priority] ?? 'default'} size="md">
                    {task.priority} priority
                  </Badge>
                  <span className={`text-sm ${isOverdue ? 'text-rose-600 font-medium' : 'text-gray-500'}`}>
                    Due {formattedDate}
                    {isOverdue && ' (Overdue)'}
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="p-6 border-t border-gray-100 flex flex-wrap gap-3">
            {editing ? (
              <>
                <Button
                  onClick={handleSave}
                  disabled={updateTask.isPending || !form.title}
                  isLoading={updateTask.isPending}
                >
                  Save
                </Button>
                <Button variant="ghost" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button onClick={startEdit}>Edit</Button>
                <Button variant="danger" onClick={() => setShowDeleteConfirm(true)}>
                  Delete
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Close
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete task"
        message="This task will be removed. This action cannot be undone."
        isLoading={deleteTask.isPending}
      />
    </>
  );
}
