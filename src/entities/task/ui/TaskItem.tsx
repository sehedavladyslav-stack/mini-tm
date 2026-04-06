import type { TaskUI } from '../model';

type TaskProps = {
  task: TaskUI;
  href?: string;
};

const taskStatusClassNames: Record<TaskUI['status'], string> = {
  todo: 'border-border bg-muted text-foreground/75',
  active: 'border-primary/45 bg-primary/15 text-primary-foreground',
  completed: 'border-primary/35 bg-primary/12 text-foreground',
  canceled: 'border-border bg-foreground/8 text-foreground/70',
};

function TaskItem({ task, href }: TaskProps) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-4 shadow-(--app-shadow) transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60">
      <header className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-foreground">
          {href ? (
            <a
              className="text-foreground no-underline transition-colors duration-200 hover:text-primary"
              href={href}
            >
              {task.title}
            </a>
          ) : (
            task.title
          )}
        </h3>
        <span
          className={`rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide uppercase ${taskStatusClassNames[task.status]}`}
        >
          {task.status}
        </span>
      </header>
      <p className="mb-3 text-sm leading-relaxed text-foreground/68">
        {task.description || 'No description added yet.'}
      </p>
      <footer className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border pt-2 text-xs text-foreground/55">
        <span>
          <strong className="text-foreground/78">Due:</strong> {task.dueDate}
        </span>
        <span>
          <strong className="text-foreground/78">Updated:</strong> {task.updatedAt}
        </span>
      </footer>
    </article>
  );
}

export { TaskItem };
