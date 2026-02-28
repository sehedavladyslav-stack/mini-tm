import { Link } from 'react-router';
import type { TaskUI } from '@/entities';

type TaskProps = {
  task: TaskUI;
  onStatusChange: (taskId: TaskUI['id'], status: TaskUI['status']) => void;
  isStatusUpdating?: boolean;
};

const STATUS_OPTIONS: TaskUI['status'][] = ['todo', 'active', 'completed', 'canceled'];

function TaskItem({ task, onStatusChange, isStatusUpdating = false }: TaskProps) {
  return (
    <article className="task-card">
      <header className="task-card-header">
        <h3 className="task-card-title">
          <Link className="task-card-link" to={`/tasks/${task.id}`}>
            {task.title}
          </Link>
        </h3>
        <span className={`task-status task-status--${task.status}`}>{task.status}</span>
      </header>
      <p className="task-card-description">{task.description || 'No description added yet.'}</p>
      <div className="task-card-controls">
        <label htmlFor={`task-card-status-${task.id}`}>Status</label>
        <select
          id={`task-card-status-${task.id}`}
          className="task-card-status-select"
          value={task.status}
          disabled={isStatusUpdating}
          onChange={event => onStatusChange(task.id, event.target.value as TaskUI['status'])}
        >
          {STATUS_OPTIONS.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <footer className="task-card-footer">
        <span>
          <strong>Due:</strong> {task.dueDate}
        </span>
        <span>
          <strong>Updated:</strong> {task.updatedAt}
        </span>
      </footer>
    </article>
  );
}

export { TaskItem };
