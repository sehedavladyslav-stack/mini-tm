import { deleteTask, type ToastType } from '@/shared';
import { queryClient } from '@/app';
import { useMutation } from '@tanstack/react-query';
import type { NavigateFunction } from 'react-router-dom';

type DeleteTaskMutationProps = {
  navigate: NavigateFunction;
  toast: (message: string, type?: ToastType | undefined) => void;
};

export function useDeleteTaskMutation({ navigate, toast }: DeleteTaskMutationProps) {
  const { mutate: deleteTaskMutate } = useMutation({
    mutationFn: deleteTask,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      navigate(-1);
      toast('Task deleting from your task', 'success');
    },
    onError: err => {
      toast(err.message, 'error');
    },
  });

  return deleteTaskMutate;
}
