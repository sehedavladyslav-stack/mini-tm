import { Link, useParams } from 'react-router';
import { Loader, type TaskId } from '@shared/index';
import { useTaskQuery } from '@entities/index';
import { DeleteTaskButton, UpdateTaskStatusModal, useUpdateTaskStatusModalStore } from '@/features';

const taskStatusClassNames = {
  todo: 'border-border bg-muted text-foreground/75',
  active: 'border-primary/45 bg-primary/15 text-primary-foreground',
  completed: 'border-primary/35 bg-success/25 text-foreground',
  canceled: 'border-border bg-foreground/8 text-foreground/70',
} as const;

function TaskDetailPage() {
  const { taskId } = useParams();
  const id = taskId as TaskId;
  const { task, isLoading } = useTaskQuery(id);
  const { openModal } = useUpdateTaskStatusModalStore();
  const backLinkClassName =
    'inline-flex min-h-9 w-full items-center justify-center rounded-[10px] border border-border bg-surface px-3 text-[0.9rem] font-semibold text-foreground no-underline transition-[transform,border-color,box-shadow] duration-180 ease-in-out hover:-translate-y-px hover:border-primary/60 hover:shadow-(--app-shadow) md:w-auto';

  if (isLoading) {
    return <Loader message="Loading task" />;
  }

  if (!task) {
    return (
      <section className="grid max-w-210 justify-items-start gap-2 font-['Segoe_UI_Variable_Display','Trebuchet_MS','Verdana','Tahoma',sans-serif]">
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
      className="bg-surface text-foreground grid max-w-210 justify-items-start gap-4.5 rounded-md font-['Segoe_UI_Variable_Display','Trebuchet_MS','Verdana','Tahoma',sans-serif] shadow-(--app-shadow)"
      aria-labelledby="task-page-title"
    >
      <article className="border-border bg-surface text-foreground gap-4.5 rounded-md border p-[clamp(16px,2.2vw,28px)] shadow-(--app-shadow) md:grid md:auto-rows-min">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
          <h2 className="m-0 text-[clamp(1.25rem,2.1vw,1.95rem)] leading-[1.1] tracking-[-0.01em]">
            {task.title}
          </h2>
          <button
            onClick={openModal}
            className={`cursor-pointer rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide uppercase transition-opacity hover:opacity-80 ${taskStatusClassNames[task.status]}`}
          >
            {task.status}
          </button>
        </div>
        <p className="text-foreground/65 m-0 truncate text-base leading-[1.6]">
          {task.description || 'No description added yet.'}
        </p>
        <dl className="m-0 grid grid-cols-1 gap-2.5 md:grid-cols-3">
          <div className="border-border bg-background rounded-md border px-3 py-2.5">
            <dt className="text-foreground/55 m-0 text-xs font-bold tracking-[0.08em] uppercase">
              Due date
            </dt>
            <dd className="text-foreground m-0 mt-1 font-bold">{task.dueDate}</dd>
          </div>
          <div className="border-border bg-background rounded-md border px-3 py-2.5">
            <dt className="text-foreground/55 m-0 text-xs font-bold tracking-[0.08em] uppercase">
              Last update
            </dt>
            <dd className="text-foreground m-0 mt-1 font-bold">{task.updatedAt}</dd>
          </div>
        </dl>
        <div className="flex items-center justify-between gap-3">
          <Link className={backLinkClassName} to="/tasks">
            Back to tasks
          </Link>
          {<DeleteTaskButton id={id} />}
        </div>
      </article>
      {task && <UpdateTaskStatusModal id={id} task={task} />}
    </section>
  );
}

export { TaskDetailPage };
