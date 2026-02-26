import { Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  isDeleted: boolean;
  deletedAt: Date | null;
  isOverdue: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  byPriority: { low: number; medium: number; high: number };
  byStatus: { pending: number; in_progress: number; completed: number };
  inProgress: number;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: { field: string; message: string }[];
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}
