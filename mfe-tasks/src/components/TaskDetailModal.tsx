import { useState } from 'react';
import { useTask, useUpdateTask, useDeleteTask } from '../hooks/useTasks';
import { Task } from '../types';
import { KANBAN_COLUMNS } from '../types';
import ConfirmModal from './ConfirmModal';

interface TaskDetailModalProps {
  taskId: string;
  onClose: () => void;
  onDeleted?: () => void;
}

const priorityColors: Record<string, string> = {
  low: 'bg-sky-100 text-sky-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-rose-100 text-rose-700',
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-8 animate-pulse" onClick={(e) => e.stopPropagation()}>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-full mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col animate-modal-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-100 flex items-start justify-between">
            {editing ? (
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="text-xl font-semibold text-gray-900 border border-gray-300 rounded-lg px-3 py-2 w-full"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={form.priority}
                      onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value as Task['priority'] }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as Task['status'] }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
                  <p className={`mt-1 inline-flex px-2 py-0.5 rounded-full text-sm font-medium ${column?.id === 'completed' ? 'bg-emerald-100 text-emerald-700' : column?.id === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                    {column?.title ?? task.status}
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
              </>
            )}
          </div>

          <div className="p-6 border-t border-gray-100 flex flex-wrap gap-3">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={updateTask.isPending || !form.title}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                  {updateTask.isPending ? 'Saving…' : 'Save'}
                </button>
                <button onClick={() => setEditing(false)} className="px-4 py-2 text-gray-600 hover:text-gray-900">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button onClick={startEdit} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Edit
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  Delete
                </button>
                <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-900">
                  Close
                </button>
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
