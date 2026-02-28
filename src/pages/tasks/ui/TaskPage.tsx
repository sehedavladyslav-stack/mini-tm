import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router';
import { Button, deleteTask, getTask, Loader, useToastStore, type TaskId } from '@/shared';
import { queryClient } from '@/app';

function TaskPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const id = taskId as TaskId;
  const { data: task, isLoading } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTask(id),
  });

  const toast = useToastStore(s => s.show);

  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      navigate(-1);
      toast('Task deleting from your task', 'success');
    },
    onError: err => {
      toast(err.message, 'error');
    },
  });

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
          <Button variant="danger" size="sm" onClick={() => mutate(id)}>
            Delete task
          </Button>
        </div>

        <p className="task-page-description">{task.description || 'No description added yet.'}</p>

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

export { TaskPage };
