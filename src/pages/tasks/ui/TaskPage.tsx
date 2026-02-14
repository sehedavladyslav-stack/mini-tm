import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';
import { getTask, Loader } from '@/shared';

function TaskPage() {
  const { taskId } = useParams();
  const { data: task, isLoading } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTask(taskId),
  });

  if (isLoading) {
    return <Loader message="Loading task" />;
  }

  if (!task) {
    return (
      <section className="task-page task-page-empty">
        <h2>Task not found</h2>
        <p>The requested task does not exist.</p>
        <Link to="/tasks">Back to tasks</Link>
      </section>
    );
  }

  return (
    <section className="task-page" aria-labelledby="task-page-title">
      <div className="task-page-header">
        <h2 id="task-page-title">{task.title}</h2>
        <span className="task-status">{task.status}</span>
      </div>
      <p className="task-page-description">{task.description}</p>
      <div className="task-page-meta">
        <p>Due: {task.dueDate}</p>
        <p>Created: {task.createdAt}</p>
        <p>Updated: {task.updatedAt}</p>
      </div>
      <Link to="/tasks">Back to tasks</Link>
    </section>
  );
}

export { TaskPage };
