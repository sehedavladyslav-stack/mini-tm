import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../../api/getTasks';

export function useTasksQuery() {
  const {
    data: tasks = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  return { tasks, isPending, isError };
}
