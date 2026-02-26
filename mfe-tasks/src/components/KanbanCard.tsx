import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../types';
import { KANBAN_COLUMNS } from '../types';

interface KanbanCardProps {
  task: Task;
  onOpenDetail: (task: Task) => void;
}

const priorityColors: Record<string, string> = {
  low: 'bg-sky-100 text-sky-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-rose-100 text-rose-700',
};

export default function KanbanCard({ task, onOpenDetail }: KanbanCardProps) {
  const column = KANBAN_COLUMNS.find((c) => c.id === task.status);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task._id,
    data: { task },
  });

  const style = transform
    ? { transform: CSS.Translate.toString(transform), transition: 'transform 200ms ease' }
    : undefined;

  const formattedDate = new Date(task.dueDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const isOverdue = task.status !== 'completed' && new Date(task.dueDate) < new Date();

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => onOpenDetail(task)}
      className={`
        group rounded-xl border border-gray-200 bg-white p-4 shadow-sm
        transition-all duration-200 ease-out
        hover:shadow-md hover:border-gray-300
        cursor-grab active:cursor-grabbing
        ${isDragging ? 'opacity-90 shadow-lg ring-2 ring-indigo-200 scale-[1.02]' : ''}
      `}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            column?.id === 'completed'
              ? 'bg-emerald-100 text-emerald-700'
              : column?.id === 'in_progress'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-amber-100 text-amber-700'
          }`}
        >
          {column?.title ?? task.status}
        </span>
        <span
          className={`shrink-0 text-xs ${isOverdue ? 'text-rose-600 font-medium' : 'text-gray-400'}`}
        >
          {isOverdue && '⚠ '}
          {formattedDate}
        </span>
      </div>
      <h3
        className={`font-semibold text-gray-900 mb-1 line-clamp-2 ${
          task.status === 'completed' ? 'line-through text-gray-500' : ''
        }`}
      >
        {task.title}
      </h3>
      {task.description && (
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{task.description}</p>
      )}
      <div className="flex items-center justify-between">
        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
    </div>
  );
}
