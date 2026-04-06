import { TaskItem, useTasksQuery } from '@/entities';
import { CreateTaskModal, useCreateTaskModalStore } from '@/features';
import {
  TaskQueryControls,
  getVisibleTasks,
  useTaskQueryStore,
  useTaskQueryUrlSync,
} from '@/features';
import { Button, Loader } from '@/shared';

function TaskList() {
  const { openModal } = useCreateTaskModalStore();
  const { params } = useTaskQueryStore();
  useTaskQueryUrlSync();
  const { tasks, isPending, isError } = useTasksQuery();
  const statCardClassName =
    'relative grid gap-1.5 rounded-[20px] border border-border bg-surface px-4 py-4 shadow-(--app-shadow)';
  const statLabelClassName =
    'text-[0.72rem] font-bold tracking-[0.14em] text-foreground/55 uppercase';
  const statValueClassName =
    'text-[clamp(1.25rem,2vw,1.7rem)] font-extrabold text-foreground';
  const emptyStateClassName =
    'mt-4 grid gap-2.5 rounded-[22px] border border-dashed border-border bg-surface px-6 py-7 text-center shadow-(--app-shadow)';

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
    <section
      className="flex flex-col gap-4 font-['Segoe_UI_Variable_Display','Trebuchet_MS','Verdana','Tahoma',sans-serif]"
      aria-labelledby="tasks-heading"
    >
      <div
        className="relative flex flex-col items-start gap-3 overflow-hidden rounded-[22px] border border-border bg-surface px-5 py-4 text-foreground shadow-(--app-shadow) md:flex-row md:items-center md:justify-between"
        id="tasks-header"
      >
        <div className="grid gap-2">
          <p className="m-0 text-[0.72rem] font-bold tracking-[0.16em] text-foreground/55 uppercase">
            Workspace
          </p>
          <h2
            className="m-0 text-[clamp(1.5rem,2.3vw,2.1rem)] tracking-[-0.02em] text-foreground"
            id="tasks-heading"
          >
            Task board
          </h2>
          <p className="m-0 max-w-[54ch] leading-[1.55] text-foreground/68">
            Keep priorities visible and ship work every day.
          </p>
        </div>
        <Button className="w-full md:w-auto" type="button" onClick={() => openModal()}>
          Create task
        </Button>
      </div>

      <ul
        className="m-0 mt-4 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-2"
        aria-label="Task statistics"
      >
        <li className={statCardClassName}>
          <span className={statLabelClassName}>
            Total
          </span>
          <span className={statValueClassName}>
            {tasks.length}
          </span>
        </li>
        <li className={statCardClassName}>
          <span className={statLabelClassName}>
            In progress
          </span>
          <span className={statValueClassName}>
            {activeTasks}
          </span>
        </li>
        <li className={statCardClassName}>
          <span className={statLabelClassName}>
            To do
          </span>
          <span className={statValueClassName}>
            {todoTasks}
          </span>
        </li>
        <li className={statCardClassName}>
          <span className={statLabelClassName}>
            Done
          </span>
          <span className={statValueClassName}>
            {completedTasks}
          </span>
        </li>
      </ul>

      <TaskQueryControls />

      {tasks.length === 0 ? (
        <div className={emptyStateClassName}>
          <h3 className="m-0 text-[1.2rem] tracking-[-0.01em] text-foreground">No tasks yet</h3>
          <p className="m-0 text-foreground/68">Create your first task to start tracking progress.</p>
          <Button
            className="w-full justify-self-center md:w-auto"
            type="button"
            onClick={() => openModal()}
          >
            Add first task
          </Button>
        </div>
      ) : visibleTasks.length > 0 ? (
        <ul className="mt-4 grid gap-4">
          {visibleTasks.map(t => (
            <li key={t.id} className="translate-y-0 opacity-100 transition-transform duration-200">
              <TaskItem task={t} href={`/tasks/${t.id}`} />
            </li>
          ))}
        </ul>
      ) : (
        <div className={emptyStateClassName}>
          <h3 className="m-0 text-[1.2rem] tracking-[-0.01em] text-foreground">
            No matching tasks
          </h3>
          <p className="m-0 text-foreground/68">
            Try changing the current filters or sorting settings.
          </p>
        </div>
      )}
      <CreateTaskModal />
    </section>
  );
}

export { TaskList };
