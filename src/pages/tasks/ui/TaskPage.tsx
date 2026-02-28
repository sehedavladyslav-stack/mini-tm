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
        <p>Updated: {task.updatedAt}</p>
      </div>
      <Button variant="danger" size="sm" onClick={() => mutate(id)}>
        Delete
      </Button>
      <Link to="/tasks">Back to tasks</Link>
    </section>
  );
}

export { TaskPage };
