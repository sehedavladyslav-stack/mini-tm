import type { Task } from '@/entities';
import { TaskItem } from '@/entities';
import { TaskModal } from '@/shared/ui/modal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, createISODateString, createTask, getTasks, Loader, useToastStore } from '@/shared';
import { queryClient, useModalStore } from '@/app';

function TaskList() {
  const { openModal } = useModalStore();
  const toast = useToastStore(s => s.show);

  const {
    data: tasks = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast('New task created', 'success');
    },
    onError: err => {
      toast(err.message, 'error');
    },
  });

  if (isPending) {
    return <Loader message="Loading" />;
  }

  if (isError) {
    throw new Error('Bad request!');
  }

  function handleAddTask(data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) {
    const createTaskData = createISODateString(Date.now());

    const task: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      status: data.status,
      dueDate: data.dueDate,
      createdAt: createTaskData,
      updatedAt: createTaskData,
    };
    createTaskMutation.mutate(task);
  }

  const activeTasks = tasks.filter(task => task.status === 'active').length;
  const todoTasks = tasks.filter(task => task.status === 'todo').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;

  return (
    <section className="tasks-section" aria-labelledby="tasks-heading">
      <div className="tasks-header" id="tasks-header">
        <div className="tasks-heading-wrap">
          <p className="tasks-kicker">Workspace</p>
          <h2 className="tasks-title" id="tasks-heading">
            Task board
          </h2>
          <p className="tasks-subtitle">Keep priorities visible and ship work every day.</p>
        </div>
        <Button className="tasks-add-button" type="button" onClick={() => openModal()}>
          Create task
        </Button>
      </div>

      <ul className="tasks-metrics" aria-label="Task statistics">
        <li className="tasks-metric-card">
          <span className="tasks-metric-label">Total</span>
          <span className="tasks-metric-value">{tasks.length}</span>
        </li>
        <li className="tasks-metric-card">
          <span className="tasks-metric-label">In progress</span>
          <span className="tasks-metric-value">{activeTasks}</span>
        </li>
        <li className="tasks-metric-card">
          <span className="tasks-metric-label">To do</span>
          <span className="tasks-metric-value">{todoTasks}</span>
        </li>
        <li className="tasks-metric-card">
          <span className="tasks-metric-label">Done</span>
          <span className="tasks-metric-value">{completedTasks}</span>
        </li>
      </ul>

      {tasks.length > 0 ? (
        <ul className="tasks-list">
          {tasks.map(t => (
            <li key={t.id}>
              <TaskItem task={t} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="tasks-empty">
          <h3>No tasks yet</h3>
          <p>Create your first task to start tracking progress.</p>
          <Button className="tasks-add-button tasks-empty-action" type="button" onClick={() => openModal()}>
            Add first task
          </Button>
        </div>
      )}
      <TaskModal onSubmit={handleAddTask} />
    </section>
  );
}

export { TaskList };
