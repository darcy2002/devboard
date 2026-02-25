import { useQuery } from '@tanstack/react-query';
import { fetchStats } from '../services/statsService';

export const useStats = () => {
  const query = useQuery({
    queryKey: ['taskStats'],
    queryFn: fetchStats,
    select: (res) => res.data,
    refetchInterval: 30_000,
  });

  return {
    stats: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    isRefetching: query.isRefetching,
  };
};
