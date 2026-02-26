import { useDroppable } from '@dnd-kit/core';
import { Task } from '../types';
import { KANBAN_COLUMNS } from '../types';
import KanbanCard from './KanbanCard';

interface KanbanColumnProps {
  columnId: Task['status'];
  tasks: Task[];
  onOpenDetail: (task: Task) => void;
}

const colorMap: Record<string, string> = {
  amber: 'bg-amber-500',
  blue: 'bg-blue-500',
  emerald: 'bg-emerald-500',
};

export default function KanbanColumn({ columnId, tasks, onOpenDetail }: KanbanColumnProps) {
  const column = KANBAN_COLUMNS.find((c) => c.id === columnId);
  const { setNodeRef, isOver } = useDroppable({ id: columnId });

  return (
    <div
      ref={setNodeRef}
      className={`
        flex-shrink-0 w-[320px] sm:w-[340px] rounded-xl border-2 border-dashed p-4 min-h-[400px]
        transition-colors duration-200
        ${isOver ? 'border-indigo-400 bg-indigo-50/50' : 'border-gray-200 bg-gray-50/50'}
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${column ? colorMap[column.color] || 'bg-gray-400' : 'bg-gray-400'}`} />
          <h2 className="font-semibold text-gray-900">{column?.title ?? columnId}</h2>
        </div>
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
          {tasks.length}
        </span>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <KanbanCard key={task._id} task={task} onOpenDetail={onOpenDetail} />
        ))}
      </div>
    </div>
  );
}
