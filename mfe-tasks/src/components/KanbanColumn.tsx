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
  amber: 'bg-amber-400',
  blue: 'bg-blue-500',
  emerald: 'bg-emerald-500',
};

const headerColor: Record<string, string> = {
  amber: 'text-amber-700',
  blue: 'text-blue-700',
  emerald: 'text-emerald-700',
};

export default function KanbanColumn({ columnId, tasks, onOpenDetail }: KanbanColumnProps) {
  const column = KANBAN_COLUMNS.find((c) => c.id === columnId);
  const { setNodeRef, isOver } = useDroppable({ id: columnId });

  return (
    <div
      ref={setNodeRef}
      className={`
        flex-shrink-0 w-[300px] sm:w-[320px] rounded-2xl p-3 min-h-[300px] flex flex-col
        transition-all duration-200 ease-out
        ${isOver
          ? 'bg-indigo-50/80 ring-2 ring-indigo-300 ring-inset scale-[1.005]'
          : 'bg-gray-50/70 hover:bg-gray-50'}
      `}
    >
      {/* Column header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${column ? colorMap[column.color] || 'bg-gray-400' : 'bg-gray-400'}`} />
          <h2 className={`font-semibold text-sm ${column ? headerColor[column.color] || 'text-gray-700' : 'text-gray-700'}`}>
            {column?.title ?? columnId}
          </h2>
        </div>
        <span className="flex items-center justify-center min-w-[26px] h-[26px] rounded-lg bg-white text-gray-600 text-xs font-semibold shadow-sm border border-gray-100">
          {tasks.length}
        </span>
      </div>

      {/* Cards */}
      <div className="space-y-2.5 flex-1">
        {tasks.map((task) => (
          <KanbanCard key={task._id} task={task} onOpenDetail={onOpenDetail} />
        ))}
      </div>
    </div>
  );
}
