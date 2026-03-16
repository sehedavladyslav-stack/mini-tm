import { useQuery } from '@tanstack/react-query';
import type { TaskId } from '@/shared/types';
import { getTask } from '../../api/getTask';

export function useTaskQuery(id: TaskId) {
  const { data: task, isLoading } = useQuery({
    queryKey: ['task', id],
    queryFn: () => getTask(id),
  });

  return { task, isLoading };
}
