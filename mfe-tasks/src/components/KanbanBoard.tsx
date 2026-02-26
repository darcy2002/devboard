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
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-shrink-0 w-[320px] space-y-3">
            <div className="h-10 bg-gray-200 rounded animate-pulse mb-4" />
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
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-gray-600 mb-4">{(error as Error)?.message}</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4 min-h-[500px]">
          {KANBAN_COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              columnId={col.id}
              tasks={tasksByStatus[col.id] ?? []}
              onOpenDetail={setSelectedTask}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="rotate-2 scale-105">
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
