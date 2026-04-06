import { Button, type ISODateString, type TaskId, createISODateString } from '@shared/index';
import { TASK_STATUSES, type Task } from '@entities/index';
import { useCreateTaskMutation } from '../model/useCreateTaskMutation';
import { useCreateTaskModalStore } from '../model/modal.store';
import { useTaskFormData, type TaskFormData } from '../model/form.store';

function CreateTaskModal() {
  const { isOpen, closeModal } = useCreateTaskModalStore();
  const { formData, updateField, reset } = useTaskFormData();
  const createTaskMutation = useCreateTaskMutation();
  const fieldClassName =
    'rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-foreground/45 focus:border-primary/55';

  function handleAddTask(data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) {
    const createTaskData = createISODateString(Date.now());

    const task: Task = {
      id: crypto.randomUUID() as TaskId,
      title: data.title.trim(),
      description: data.description.trim(),
      status: data.status,
      dueDate: data.dueDate,
      createdAt: createTaskData,
      updatedAt: createTaskData,
    };
    createTaskMutation.mutate(task);
  }

  if (!isOpen) {
    return null;
  }

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    if (!formData?.title.trim() || !formData?.description.trim()) {
      return;
    }

    handleAddTask(formData);
    closeModal();
    reset();
  }

  function handleClose() {
    closeModal();
    reset();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm"
      role="presentation"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-border bg-surface p-5 text-foreground shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        onClick={event => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight" id="task-modal-title">
            Add Task
          </h3>
          <Button
            className="rounded-lg border border-border px-3 py-1.5 text-sm text-foreground transition-colors duration-200 hover:bg-muted"
            type="button"
            variant="ghost"
            onClick={handleClose}
          >
            Close
          </Button>
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-1.5 text-sm">
            <span>Title</span>
            <input
              className={fieldClassName}
              value={formData?.title}
              onChange={event => updateField('title', event.target.value)}
              placeholder="Task title"
              required
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span>Description</span>
            <textarea
              className={`${fieldClassName} min-h-24 resize-y`}
              value={formData?.description}
              onChange={event => updateField('description', event.target.value)}
              placeholder="What exactly should be done?"
              required
            />
          </label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm">
              <span>Status</span>
              <select
                className={fieldClassName}
                value={formData?.status}
                onChange={event => {
                  const value = event.currentTarget.value;
                  if (TASK_STATUSES.includes(value as TaskFormData['status'])) {
                    updateField('status', value as TaskFormData['status']);
                  }
                }}
              >
                <option value={'todo'}>To do</option>
                <option value={'active'}>In progress</option>
                <option value={'completed'}>Done</option>
                <option value={'canceled'}>Cancel</option>
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              <span>Due date</span>
              <input
                className={fieldClassName}
                type="datetime-local"
                value={formData?.dueDate.slice(0, 16)}
                onChange={event => {
                  const value = createISODateString(event.target.value);

                  if (value as ISODateString) {
                    updateField('dueDate', value as ISODateString);
                  }
                }}
              />
            </label>
          </div>
          <div className="mt-2 flex items-center justify-end gap-2 border-t border-border pt-3">
            <Button
              type="button"
              className="rounded-xl border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted"
              variant="ghost"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              className="rounded-xl border border-primary bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:brightness-95 hover:shadow-md"
              type="submit"
              variant="ghost"
            >
              Create task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { CreateTaskModal };
