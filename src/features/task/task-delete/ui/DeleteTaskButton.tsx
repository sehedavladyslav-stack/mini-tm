import { Button, useToastStore, type TaskId } from '@/shared';
import { useNavigate } from 'react-router';
import { useDeleteTaskMutation } from '../model/useDeleteTaskMutation';

type DeleteTaskProps = {
  id: TaskId;
};

export function DeleteTaskButton({ id }: DeleteTaskProps) {
  const navigate = useNavigate();
  const toast = useToastStore(s => s.show);

  const deleteTaskMutate = useDeleteTaskMutation({ navigate, toast });

  return (
    <Button variant="danger" size="sm" onClick={() => deleteTaskMutate(id)}>
      Delete task
    </Button>
  );
}
