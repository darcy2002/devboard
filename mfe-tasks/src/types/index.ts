export interface Task {
  _id: string;
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  isDeleted: boolean;
  isOverdue: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  status?: 'pending' | 'in_progress' | 'completed';
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type TaskFilter = 'all' | 'pending' | 'in_progress' | 'completed';

export const KANBAN_COLUMNS: { id: Task['status']; title: string; color: string }[] = [
  { id: 'pending', title: 'To Do', color: 'amber' },
  { id: 'in_progress', title: 'In Progress', color: 'blue' },
  { id: 'completed', title: 'Done', color: 'emerald' },
];
