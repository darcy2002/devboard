import axios from 'axios';
import { Task, CreateTaskPayload, UpdateTaskPayload, ApiResponse } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5050/api',
  headers: { 'Content-Type': 'application/json' },
});

export const fetchTasks = async (status?: string): Promise<ApiResponse<Task[]>> => {
  const params = status && status !== 'all' ? { status } : {};
  const { data } = await api.get<ApiResponse<Task[]>>('/tasks', { params });
  return data;
};

export const createTask = async (payload: CreateTaskPayload): Promise<ApiResponse<Task>> => {
  const { data } = await api.post<ApiResponse<Task>>('/tasks', payload);
  return data;
};

export const updateTask = async (id: string, payload: UpdateTaskPayload): Promise<ApiResponse<Task>> => {
  const { data } = await api.put<ApiResponse<Task>>(`/tasks/${id}`, payload);
  return data;
};

export const toggleTaskStatus = async (id: string): Promise<ApiResponse<Task>> => {
  const { data } = await api.patch<ApiResponse<Task>>(`/tasks/${id}/status`);
  return data;
};

export const deleteTask = async (id: string): Promise<ApiResponse<null>> => {
  const { data } = await api.delete<ApiResponse<null>>(`/tasks/${id}`);
  return data;
};
