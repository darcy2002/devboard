import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import Badge from 'sharedUi/Badge';
import { Task } from '../types';
import { KANBAN_COLUMNS } from '../types';

interface KanbanCardProps {
  task: Task;
  onOpenDetail: (task: Task) => void;
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

export default function KanbanCard({ task, onOpenDetail }: KanbanCardProps) {
  const column = KANBAN_COLUMNS.find((c) => c.id === task.status);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task._id,
    data: { task },
  });

  const style = transform
    ? { transform: CSS.Translate.toString(transform), transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)' }
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
        group rounded-xl bg-white p-4 shadow-sm border border-gray-100
        transition-all duration-200 ease-out
        hover:shadow-md hover:-translate-y-0.5 hover:border-gray-200
        active:scale-[0.98] active:translate-y-0 active:shadow-sm
        cursor-grab active:cursor-grabbing
        ${isDragging ? 'opacity-80 shadow-xl ring-2 ring-indigo-300 scale-[1.03] z-50 rotate-1' : ''}
      `}
    >
      {/* Status + date row */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <Badge variant={statusBadgeVariant[task.status] ?? 'default'}>
          {column?.title ?? task.status}
        </Badge>
        <span className={`shrink-0 text-[11px] ${isOverdue ? 'text-rose-500 font-semibold' : 'text-gray-400'}`}>
          {isOverdue && '⚠ '}
          {formattedDate}
        </span>
      </div>

      {/* Title */}
      <h3 className={`font-semibold text-gray-900 text-sm leading-snug mb-1.5 line-clamp-2 group-hover:text-indigo-700 transition-colors duration-200 ${
        task.status === 'completed' ? 'line-through !text-gray-400' : ''
      }`}>
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">{task.description}</p>
      )}

      {/* Priority */}
      <div className="flex items-center justify-between pt-1">
        <Badge variant={priorityBadgeVariant[task.priority] ?? 'default'}>
          {task.priority}
        </Badge>
      </div>
    </div>
  );
}
