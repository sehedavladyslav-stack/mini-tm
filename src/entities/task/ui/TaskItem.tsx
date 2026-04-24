import { cn } from '@/shared';
import type { TaskUI } from '../model';

type TaskProps = {
  task: TaskUI;
  href?: string;
  className?: string;
};

const taskStatusClassNames: Record<TaskUI['status'], string> = {
  todo: 'border-border bg-muted text-foreground/75',
  in_progress: 'border-primary/45 bg-primary/65 text-primary-foreground',
  done: 'border-primary/35 bg-success text-foreground',
  canceled: 'border-border bg-foreground/8 text-foreground/70',
};

function TaskItem({ task, href, className = '' }: TaskProps) {
  return (
    <article
      className={cn(
        'border-border bg-surface hover:border-primary/60 grid rounded-md border p-4 shadow-(--app-shadow) transition-all duration-200 hover:-translate-y-0.5',
        className
      )}
    >
      <header className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-foreground text-base font-semibold">
          {href ? (
            <a
              className="text-foreground hover:text-primary no-underline transition-colors duration-200"
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
      <p className="text-foreground/68 mb-3 truncate text-sm leading-relaxed">
        {task.description || 'No description added yet.'}
      </p>
      <footer className="border-border text-foreground/55 flex flex-wrap items-center gap-x-4 gap-y-1 border-t pt-2 text-xs">
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
