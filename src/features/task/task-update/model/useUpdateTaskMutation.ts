import { queryClient } from '@/app';
import type { Task } from '@/entities';
import { updateTaskStatus, type TaskId, type ToastType } from '@/shared';
import { useMutation } from '@tanstack/react-query';

type DeleteTaskMutationProps = {
  toast: (message: string, type?: ToastType | undefined) => void;
  id: TaskId;
};

export function useUpdateStatusMutate({ toast, id }: DeleteTaskMutationProps) {
  const { mutate: updateStatusMutate, isPending: isStatusUpdating } = useMutation({
    mutationFn: ({ id, status }: { id: TaskId; status: Task['status'] }) =>
      updateTaskStatus(id, status),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['tasks'] }),
        queryClient.invalidateQueries({ queryKey: ['task', id] }),
      ]);
      toast('Task status updated', 'success');
    },
    onError: err => {
      toast(err.message, 'error');
    },
  });

  return { updateStatusMutate, isStatusUpdating };
}
