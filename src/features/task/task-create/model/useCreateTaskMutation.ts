import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '@entities/index';
import { useToastStore } from '@shared/index';

export function useCreateTaskMutation() {
  const toast = useToastStore(s => s.show);
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast('New task created', 'success');
    },
    onError: err => {
      toast(err.message, 'error');
    },
  });

  return createTaskMutation;
}
