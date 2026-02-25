export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  byPriority: { low: number; medium: number; high: number };
  byStatus: { pending: number; completed: number };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ChartDataItem {
  name: string;
  value: number;
  color: string;
}
