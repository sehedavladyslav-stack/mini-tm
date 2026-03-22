import { Link, useParams } from 'react-router';
import { Loader, type TaskId } from '@/shared';
import { useTaskQuery } from '@/entities';
import { UpdateTaskSelect, DeleteTaskButton } from '@/features';

function TaskDetailPage() {
  const { taskId } = useParams();
  const id = taskId as TaskId;
  const { task, isLoading } = useTaskQuery(id);

  if (isLoading) {
    return <Loader message="Loading task" />;
  }

  if (!task) {
    return (
      <section className="task-page task-page-empty">
        <h2>Task not found</h2>
        <p>The requested task does not exist or was already removed.</p>
        <Link className="task-page-back" to="/tasks">
          Back to tasks
        </Link>
      </section>
    );
  }

  return (
    <section className="task-page" aria-labelledby="task-page-title">
      <div className="task-page-top">
        <Link className="task-page-back" to="/tasks">
          Back to tasks
        </Link>
        <span className={`task-status task-status--${task.status}`}>{task.status}</span>
      </div>

      <article className="task-page-card">
        <div className="task-page-header">
          <h2 id="task-page-title">{task.title}</h2>
          {<DeleteTaskButton id={id} />}
        </div>

        <p className="task-page-description">{task.description || 'No description added yet.'}</p>

        <label className="task-page-status-control" htmlFor="task-status-select">
          <span>Change status</span>
          {<UpdateTaskSelect id={id} task={task} />}
        </label>

        <dl className="task-page-meta">
          <div>
            <dt>Due date</dt>
            <dd>{task.dueDate}</dd>
          </div>
          <div>
            <dt>Last update</dt>
            <dd>{task.updatedAt}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{task.status}</dd>
          </div>
        </dl>
      </article>

      <Link className="task-page-back task-page-back-plain" to="/tasks">
        Return to board
      </Link>
    </section>
  );
}

export { TaskDetailPage };
