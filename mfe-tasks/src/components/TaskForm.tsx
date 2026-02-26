import { useState } from 'react';
import Modal from 'sharedUi/Modal';
import Button from 'sharedUi/Button';
import { useCreateTask } from '../hooks/useTasks';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskForm = ({ isOpen, onClose }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createTask = useCreateTask();

  const today = new Date().toISOString().split('T')[0];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (title.length > 100) newErrors.title = 'Title cannot exceed 100 characters';
    if (!dueDate) newErrors.dueDate = 'Due date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    createTask.mutate(
      { title: title.trim(), description: description.trim(), priority, dueDate },
      {
        onSuccess: () => {
          setTitle('');
          setDescription('');
          setPriority('medium');
          setDueDate('');
          setErrors({});
          onClose();
        },
        onError: (err) => {
          setErrors({ server: err.message || 'Failed to create task' });
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Task" className="max-w-md">
      {errors.server && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {errors.server}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.title ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description (optional)"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date *</label>
            <input
              type="date"
              value={dueDate}
              min={today}
              onChange={(e) => setDueDate(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.dueDate ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.dueDate && <p className="mt-1 text-xs text-red-500">{errors.dueDate}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={createTask.isPending}>
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskForm;
