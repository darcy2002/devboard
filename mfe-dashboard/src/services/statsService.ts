import axios from 'axios';
import { TaskStats, Task, ApiResponse } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5050/api',
  headers: { 'Content-Type': 'application/json' },
});

export const fetchStats = async (): Promise<ApiResponse<TaskStats>> => {
  const { data } = await api.get<ApiResponse<TaskStats>>('/tasks/stats');
  return data;
};

export const fetchTasks = async (): Promise<ApiResponse<Task[]>> => {
  const { data } = await api.get<ApiResponse<Task[]>>('/tasks');
  return data;
};

export const fetchTask = async (id: string): Promise<ApiResponse<Task>> => {
  const { data } = await api.get<ApiResponse<Task>>(`/tasks/${id}`);
  return data;
};
