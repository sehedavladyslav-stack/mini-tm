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
      className="min-h-10 rounded-xl border border-zinc-300 bg-white px-3 text-[0.92rem] font-semibold text-zinc-800 outline-none transition-colors duration-180 ease-in-out focus:border-teal-500/75 disabled:cursor-not-allowed disabled:opacity-70"
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
