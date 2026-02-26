import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import Button from 'sharedUi/Button';
import { useFetchTasks, useSetStatus } from '../hooks/useTasks';
import { Task } from '../types';
import { KANBAN_COLUMNS } from '../types';
import KanbanColumn from './KanbanColumn';
import KanbanCard from './KanbanCard';
import TaskDetailModal from './TaskDetailModal';
import SkeletonCard from './SkeletonCard';

export default function KanbanBoard() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const { data: tasks = [], isLoading, isError, error, refetch } = useFetchTasks('all');
  const setStatus = useSetStatus();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const tasksByStatus = KANBAN_COLUMNS.reduce(
    (acc, col) => {
      acc[col.id] = tasks.filter((t) => t.status === col.id);
      return acc;
    },
    {} as Record<Task['status'], Task[]>
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = event.active.data.current?.task as Task | undefined;
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over || over.id === active.id) return;
    const task = active.data.current?.task as Task | undefined;
    const newStatus = over.id as Task['status'];
    if (task && (newStatus === 'pending' || newStatus === 'in_progress' || newStatus === 'completed')) {
      setStatus.mutate({ id: task._id, status: newStatus });
    }
  };

  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4 min-h-0 flex-1 pt-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-shrink-0 w-[300px] sm:w-[320px] space-y-2.5 rounded-2xl p-3 bg-gray-50/70">
            <div className="flex items-center gap-2 px-1 mb-3">
              <div className="w-2.5 h-2.5 skeleton-shimmer rounded-full" />
              <div className="h-4 skeleton-shimmer rounded w-20" />
              <div className="ml-auto w-6 h-6 skeleton-shimmer rounded-lg" />
            </div>
            {[1, 2, 3].map((j) => (
              <SkeletonCard key={j} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-500 mb-4 text-sm">{(error as Error)?.message}</p>
        <Button variant="primary" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4 min-h-0 flex-1 pt-2">
          {KANBAN_COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              columnId={col.id}
              tasks={tasksByStatus[col.id] ?? []}
              onOpenDetail={setSelectedTask}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={null}>
          {activeTask ? (
            <div className="rotate-2 scale-105 opacity-90 transition-transform duration-200 ease-out">
              <KanbanCard task={activeTask} onOpenDetail={() => {}} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {selectedTask && (
        <TaskDetailModal
          taskId={selectedTask._id}
          onClose={() => setSelectedTask(null)}
          onDeleted={() => setSelectedTask(null)}
        />
      )}
    </>
  );
}
