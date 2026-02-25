export interface Task {
  _id: string;
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
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
  status?: 'pending' | 'completed';
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type TaskFilter = 'all' | 'pending' | 'completed';
