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
          <Link to={`/tasks/${task.id}`}>{task.title}</Link>
        </h3>
        <span className="task-status">{task.status}</span>
      </header>
      <p className="task-card-description">{task.description}</p>
      <footer className="task-card-footer">
        <span>Due: {task.dueDate}</span>
        <span>Updated: {task.updatedAt}</span>
      </footer>
    </article>
  );
}

export { TaskItem };
