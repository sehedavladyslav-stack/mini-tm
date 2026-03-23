import { TASK_STATUSES, type Task, type TaskUI } from '@/entities';
import { type TaskId, useToastStore } from '@/shared';
import { useUpdateStatusMutate } from '../model/useUpdateTaskMutation';

type UpdateTaskProps = {
  id: TaskId;
  task: TaskUI;
};

export function UpdateTaskSelect({ id, task }: UpdateTaskProps) {
  const toast = useToastStore(s => s.show);
  const { updateStatusMutate, isStatusUpdating } = useUpdateStatusMutate({ toast, id });

  return (
    <select
      id="task-status-select"
      className="task-page-status-select"
      value={task.status}
      disabled={isStatusUpdating}
      onChange={event =>
        updateStatusMutate({ id: id, status: event.target.value as Task['status'] })
      }
    >
      {TASK_STATUSES.map(status => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}
