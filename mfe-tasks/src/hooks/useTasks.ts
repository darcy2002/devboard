import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as taskService from '../services/taskService';
import { Task, CreateTaskPayload, UpdateTaskPayload, TaskFilter, ApiResponse } from '../types';

export const useFetchTasks = (filter: TaskFilter) => {
  return useQuery({
    queryKey: ['tasks', filter],
    queryFn: () => taskService.fetchTasks(filter === 'all' ? undefined : filter),
    select: (res) => res.data,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTaskPayload) => taskService.createTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useToggleStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taskService.toggleTaskStatus(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      const previousQueries = queryClient.getQueriesData<ApiResponse<Task[]>>({
        queryKey: ['tasks'],
      });

      queryClient.setQueriesData<ApiResponse<Task[]>>(
        { queryKey: ['tasks'] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.map((task) =>
              task._id === id
                ? { ...task, status: task.status === 'pending' ? 'completed' as const : 'pending' as const }
                : task
            ),
          };
        }
      );

      return { previousQueries };
    },
    onError: (_err, _id, context) => {
      context?.previousQueries.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taskService.deleteTask(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      const previousQueries = queryClient.getQueriesData<ApiResponse<Task[]>>({
        queryKey: ['tasks'],
      });

      queryClient.setQueriesData<ApiResponse<Task[]>>(
        { queryKey: ['tasks'] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.filter((task) => task._id !== id),
          };
        }
      );

      return { previousQueries };
    },
    onError: (_err, _id, context) => {
      context?.previousQueries.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTaskPayload }) =>
      taskService.updateTask(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
