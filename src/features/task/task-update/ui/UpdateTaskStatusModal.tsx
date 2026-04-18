import { TASK_STATUSES, type Task, type TaskUI } from '@/entities';
import { Button, type TaskId, useToastStore } from '@/shared';
import { useUpdateStatusMutate } from '../model/useUpdateTaskMutation';
import { useUpdateTaskStatusModalStore } from '../model/modal.store';
import { useState } from 'react';

type UpdateTaskStatusModalProps = {
  id: TaskId;
  task: TaskUI;
};

export function UpdateTaskStatusModal({ id, task }: UpdateTaskStatusModalProps) {
  const { isOpen, closeModal } = useUpdateTaskStatusModalStore();
  const toast = useToastStore(s => s.show);
  const { updateStatusMutate, isStatusUpdating } = useUpdateStatusMutate({
    toast,
    id,
  });
  const [selectedStatus, setSelectedStatus] = useState<Task['status']>(task.status);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStatusMutate({ id, status: selectedStatus });
    closeModal();
  };

  const handleClose = () => {
    setSelectedStatus(task.status);
    closeModal();
  };

  return (
    <div
      className="bg-background/70 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
      role="presentation"
      onClick={handleClose}
    >
      <div
        className="border-border bg-surface text-foreground w-full max-w-sm rounded-2xl border p-5 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="status-modal-title"
        onClick={event => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight" id="status-modal-title">
            Change Status
          </h3>
          <Button
            className="border-border text-foreground hover:bg-muted rounded-lg border px-3 py-1.5 text-sm transition-colors duration-200"
            type="button"
            variant="ghost"
            onClick={handleClose}
          >
            ✕
          </Button>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="status-select" className="text-sm font-medium">
              Select new status:
            </label>
            <select
              id="status-select"
              className="border-border bg-background text-foreground hover:border-primary/60 focus:border-primary rounded-md border px-3 py-2 transition-colors duration-200 outline-none"
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value as Task['status'])}
            >
              {TASK_STATUSES.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="border-border flex items-center justify-end gap-2 border-t pt-3">
            <Button
              type="button"
              className="border-border text-foreground hover:bg-muted rounded-xl border px-3 py-2 text-sm font-medium transition-colors duration-200"
              variant="ghost"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-xl px-4 py-2 text-sm font-medium"
              disabled={isStatusUpdating}
            >
              {isStatusUpdating ? 'Updating...' : 'Update Status'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
