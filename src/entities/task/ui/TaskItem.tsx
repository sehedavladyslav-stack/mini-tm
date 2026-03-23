import type { TaskUI } from '../model';

type TaskProps = {
  task: TaskUI;
  href?: string;
};

function TaskItem({ task, href }: TaskProps) {
  return (
    <article className="task-card">
      <header className="task-card-header">
        <h3 className="task-card-title">
          {href ? (
            <a className="task-card-link" href={href}>
              {task.title}
            </a>
          ) : (
            task.title
          )}
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
