import { useModalStore, useTaskFormData, type TaskFormData } from '@/app';

type TaskModalProps = {
  onSubmit: (data: TaskFormData) => void;
};

function TaskModal({ onSubmit }: TaskModalProps) {
  const { isOpen, closeModal } = useModalStore();
  const { formData, updateField, reset } = useTaskFormData();

  if (!isOpen) {
    return null;
  }

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    if (!formData?.title.trim()) {
      return;
    }

    onSubmit(formData);
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
          <button className="task-modal-close" type="button" onClick={handleClose}>
            Close
          </button>
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
              placeholder="Task description"
            />
          </label>

          <div className="task-modal-grid">
            <label className="task-modal-field">
              <span>Status</span>
              <select
                className="task-modal-input"
                value={formData?.status}
                onChange={event => updateField('status', event.target.value)}
              >
                <option value="to do">To do</option>
                <option value="in progress">In progress</option>
                <option value="done">Done</option>
              </select>
            </label>

            <label className="task-modal-field">
              <span>Due date</span>
              <input
                className="task-modal-input"
                type="date"
                value={formData?.dueDate}
                onChange={event => updateField('dueDate', event.target.value)}
              />
            </label>
          </div>

          <div className="task-modal-actions">
            <button className="task-modal-cancel" type="button" onClick={handleClose}>
              Cancel
            </button>
            <button className="task-modal-submit" type="submit">
              Create task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { TaskModal };
