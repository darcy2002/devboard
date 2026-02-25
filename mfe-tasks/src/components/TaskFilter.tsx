import { TaskFilter as TaskFilterType } from '../types';

interface TaskFilterProps {
  activeFilter: TaskFilterType;
  onFilterChange: (filter: TaskFilterType) => void;
}

const filters: { label: string; value: TaskFilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Completed', value: 'completed' },
];

const TaskFilter = ({ activeFilter, onFilterChange }: TaskFilterProps) => {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === f.value
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
