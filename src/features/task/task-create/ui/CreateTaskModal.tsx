import { Button, type ISODateString, type TaskId, createISODateString } from '@/shared';
import type { Task } from '@/entities';
import { useCreateTaskMutation } from '../model/useCreateTaskMutation';
import { useCreateTaskModalStore } from '../model/modal.store';
import { useTaskFormData, type TaskFormData } from '../model/form.store';

const STATUS_VALUE: TaskFormData['status'][] = ['todo', 'active', 'completed', 'canceled'];

function CreateTaskModal() {
  const { isOpen, closeModal } = useCreateTaskModalStore();
  const { formData, updateField, reset } = useTaskFormData();
  const createTaskMutation = useCreateTaskMutation();

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
    <div className="task-modal-overlay" role="presentation" onClick={handleClose}>
      <div
        className="task-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        onClick={event => event.stopPropagation()}
      >
        <div className="task-modal-header">
          <h3 className="task-modal-title" id="task-modal-title">
            Add Task
          </h3>
          <Button className="task-modal-close" type="button" onClick={handleClose}>
            Close
          </Button>
        </div>

        <form className="task-modal-form" onSubmit={handleSubmit}>
          <label className="task-modal-field">
            <span>Title</span>
            <input
              className="task-modal-input"
              value={formData?.title}
              onChange={event => updateField('title', event.target.value)}
              placeholder="Task title"
              required
            />
          </label>

          <label className="task-modal-field">
            <span>Description</span>
            <textarea
              className="task-modal-input task-modal-textarea"
              value={formData?.description}
              onChange={event => updateField('description', event.target.value)}
              placeholder="What exactly should be done?"
              required
            />
          </label>

          <div className="task-modal-grid">
            <label className="task-modal-field">
              <span>Status</span>
              <select
                className="task-modal-input"
                value={formData?.status}
                onChange={event => {
                  const value = event.currentTarget.value;
                  if (STATUS_VALUE.includes(value as TaskFormData['status'])) {
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
            <label className="task-modal-field">
              <span>Due date</span>
              <input
                className="task-modal-input"
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
          <div className="task-modal-actions">
            <Button type="button" className="task-modal-cancel" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="task-modal-submit" type="submit">
              Create task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { CreateTaskModal };
