import { TaskItem, useTasksQuery } from '@/entities';
import { CreateTaskModal, useCreateTaskModalStore } from '@/features';
import {
  TaskQueryControls,
  getVisibleTasks,
  useTaskQueryStore,
  useTaskQueryUrlSync,
} from '@/features/task/task-query-controls';
import { Button, Loader } from '@/shared';

function TaskList() {
  const { openModal } = useCreateTaskModalStore();
  const { params } = useTaskQueryStore();
  useTaskQueryUrlSync();
  const { tasks, isPending, isError } = useTasksQuery();

  if (isPending) {
    return <Loader message="Loading" />;
  }

  if (isError) {
    throw new Error('Bad request!');
  }

  const activeTasks = tasks.filter(task => task.status === 'active').length;
  const todoTasks = tasks.filter(task => task.status === 'todo').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const visibleTasks = getVisibleTasks(tasks, params);

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

      <TaskQueryControls />

      {tasks.length === 0 ? (
        <div className="tasks-empty">
          <h3>No tasks yet</h3>
          <p>Create your first task to start tracking progress.</p>
          <Button
            className="tasks-add-button tasks-empty-action"
            type="button"
            onClick={() => openModal()}
          >
            Add first task
          </Button>
        </div>
      ) : visibleTasks.length > 0 ? (
        <ul className="tasks-list">
          {visibleTasks.map(t => (
            <li key={t.id}>
              <TaskItem task={t} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="tasks-empty">
          <h3>No matching tasks</h3>
          <p>Try changing the current filters or sorting settings.</p>
        </div>
      )}
      <CreateTaskModal />
    </section>
  );
}

export { TaskList };
