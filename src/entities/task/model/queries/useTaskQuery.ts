import { useQuery } from '@tanstack/react-query';
import { getTask, type TaskId } from '@/shared';

export function useTaskQuery(id: TaskId) {
  const { data: task, isLoading } = useQuery({
    queryKey: ['task', id],
    queryFn: () => getTask(id),
  });

  return { task, isLoading };
}
