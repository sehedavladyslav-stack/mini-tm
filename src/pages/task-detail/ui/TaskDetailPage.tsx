import { Link, useParams } from 'react-router';
import { Loader, type TaskId } from '@shared/index';
import { useTaskQuery } from '@entities/index';
import { UpdateTaskSelect, DeleteTaskButton } from '@/features';

const taskStatusClassNames = {
  todo: 'border-border bg-muted text-foreground/75',
  active: 'border-primary/45 bg-primary/15 text-primary-foreground',
  completed: 'border-primary/35 bg-primary/12 text-foreground',
  canceled: 'border-border bg-foreground/8 text-foreground/70',
} as const;

function TaskDetailPage() {
  const { taskId } = useParams();
  const id = taskId as TaskId;
  const { task, isLoading } = useTaskQuery(id);
  const backLinkClassName =
    'inline-flex min-h-9 w-full items-center justify-center rounded-[10px] border border-border bg-surface px-3 text-[0.9rem] font-semibold text-foreground no-underline transition-[transform,border-color,box-shadow] duration-180 ease-in-out hover:-translate-y-px hover:border-primary/60 hover:shadow-(--app-shadow) md:w-auto';

  if (isLoading) {
    return <Loader message="Loading task" />;
  }

  if (!task) {
    return (
      <section
        className="grid max-w-[840px] justify-items-start gap-2 font-['Segoe_UI_Variable_Display','Trebuchet_MS','Verdana','Tahoma',sans-serif]"
      >
        <h2 className="m-0">Task not found</h2>
        <p className="m-0">The requested task does not exist or was already removed.</p>
        <Link className={backLinkClassName} to="/tasks">
          Back to tasks
        </Link>
      </section>
    );
  }

  return (
    <section
      className="grid max-w-[840px] gap-[18px] font-['Segoe_UI_Variable_Display','Trebuchet_MS','Verdana','Tahoma',sans-serif]"
      aria-labelledby="task-page-title"
    >
      <div className="flex items-center justify-between gap-3">
        <Link className={backLinkClassName} to="/tasks">
          Back to tasks
        </Link>
        <span
          className={`rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide uppercase ${taskStatusClassNames[task.status]}`}
        >
          {task.status}
        </span>
      </div>

      <article className="grid gap-[18px] rounded-[24px] border border-border bg-surface p-[clamp(16px,2.2vw,28px)] text-foreground shadow-(--app-shadow)">
        <div className="flex flex-col items-stretch justify-between gap-3 md:flex-row md:items-start">
          <h2
            id="task-page-title"
            className="m-0 text-[clamp(1.25rem,2.1vw,1.95rem)] leading-[1.1] tracking-[-0.01em]"
          >
            {task.title}
          </h2>
          {<DeleteTaskButton id={id} />}
        </div>

        <p className="m-0 text-base leading-[1.6] text-foreground/68">
          {task.description || 'No description added yet.'}
        </p>

        <label className="grid gap-1.5" htmlFor="task-status-select">
          <span className="text-xs font-bold tracking-[0.08em] text-foreground/55 uppercase">
            Change status
          </span>
          {<UpdateTaskSelect id={id} task={task} />}
        </label>

        <dl className="m-0 grid grid-cols-1 gap-2.5 md:grid-cols-3">
          <div className="rounded-[14px] border border-border bg-background px-3 py-2.5">
            <dt className="m-0 text-[0.73rem] font-bold tracking-[0.08em] text-foreground/55 uppercase">
              Due date
            </dt>
            <dd className="mt-1 m-0 font-bold text-foreground">{task.dueDate}</dd>
          </div>
          <div className="rounded-[14px] border border-border bg-background px-3 py-2.5">
            <dt className="m-0 text-[0.73rem] font-bold tracking-[0.08em] text-foreground/55 uppercase">
              Last update
            </dt>
            <dd className="mt-1 m-0 font-bold text-foreground">{task.updatedAt}</dd>
          </div>
          <div className="rounded-[14px] border border-border bg-background px-3 py-2.5">
            <dt className="m-0 text-[0.73rem] font-bold tracking-[0.08em] text-foreground/55 uppercase">
              Status
            </dt>
            <dd className="mt-1 m-0 font-bold text-foreground">{task.status}</dd>
          </div>
        </dl>
      </article>

      <Link
        className="inline-flex min-h-9 w-full items-center justify-center rounded-[10px] border border-border bg-muted px-3 text-[0.9rem] font-semibold text-foreground no-underline transition-[transform,border-color,box-shadow] duration-180 ease-in-out hover:-translate-y-px hover:border-primary/60 hover:shadow-(--app-shadow) md:w-auto"
        to="/tasks"
      >
        Return to board
      </Link>
    </section>
  );
}

export { TaskDetailPage };
