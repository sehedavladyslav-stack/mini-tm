import { Link } from 'react-router';
import type { TaskUI } from '@/entities';

type TaskProps = {
  task: TaskUI;
};

function TaskItem({ task }: TaskProps) {
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
