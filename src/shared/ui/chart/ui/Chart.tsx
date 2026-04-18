import { Button, Loader } from '@shared/index';

type StatusKey = 'todo' | 'active' | 'completed' | 'canceled';

const STATUS_META: Record<
  StatusKey,
  {
    label: string;
    barClassName: string;
    badgeClassName: string;
    textClassName: string;
  }
> = {
  todo: {
    label: 'To do',
    barClassName: 'bg-foreground/58',
    badgeClassName: 'bg-muted text-foreground',
    textClassName: 'text-foreground',
  },
  active: {
    label: 'In progress',
    barClassName: 'bg-primary/75',
    badgeClassName: 'bg-primary/34 text-primary-foreground',
    textClassName: 'text-foreground',
  },
  completed: {
    label: 'Done',
    barClassName: 'bg-chart-2',
    badgeClassName: 'bg-primary/48 text-primary-foreground',
    textClassName: 'text-foreground',
  },
  canceled: {
    label: 'Canceled',
    barClassName: 'bg-danger',
    badgeClassName: 'bg-foreground/18 text-foreground/70',
    textClassName: 'text-foreground/70',
  },
};

type PropsChart = {
  tasksQuery: {
    tasks: { status: StatusKey }[];
    isPending: boolean;
    isError: boolean;
  };
};

export function Chart({ tasksQuery }: PropsChart) {
  const { tasks, isPending, isError } = tasksQuery;

  if (isPending) {
    return <Loader message="Loading overview" />;
  }

  if (isError) {
    throw new Error('Failed to load overview');
  }

  const totals = {
    todo: tasks.filter(task => task.status === 'todo').length,
    active: tasks.filter(task => task.status === 'active').length,
    completed: tasks.filter(task => task.status === 'completed').length,
    canceled: tasks.filter(task => task.status === 'canceled').length,
  };

  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((totals.completed / totalTasks) * 100) : 0;
  const activeRate = totalTasks > 0 ? Math.round((totals.active / totalTasks) * 100) : 0;
  const statusOrder: StatusKey[] = ['todo', 'active', 'completed', 'canceled'];

  return (
    <section
      className="border-border bg-surface text-foreground w-full max-w-sm min-w-fit rounded-3xl border p-5 shadow-(--app-shadow)"
      aria-labelledby="chart-title"
    >
      <div className="flex flex-col items-start justify-between gap-3 md:flex-row">
        <div className="grid gap-1">
          <p className="text-foreground/55 m-0 text-[0.72rem] font-bold tracking-[0.14em] uppercase">
            Snapshot
          </p>
          <h3 id="chart-title" className="m-0 text-[1.25rem] font-semibold tracking-[-0.02em]">
            Team progress
          </h3>
          <p className="text-foreground/68 m-0 max-w-[24ch] text-sm leading-5">
            A quick read on current workload and completed delivery.
          </p>
        </div>
        <div className="border-border bg-background text-foreground rounded-md border px-3 py-1 text-sm font-semibold">
          {totalTasks} tasks
        </div>
      </div>

      <div className="border-border bg-background mt-5 rounded-[20px] border p-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-foreground/60 m-0 text-sm">Completion</p>
            <p className="m-0 text-[2rem] leading-none font-black tracking-[-0.03em]">
              {completionRate}%
            </p>
          </div>
          <div className="text-right">
            <p className="text-foreground/60 m-0 text-sm">In progress</p>
            <p className="m-0 text-lg font-semibold">{activeRate}%</p>
          </div>
        </div>

        <div className="bg-muted mt-4 h-3 overflow-hidden rounded-full" aria-hidden="true">
          <div
            className="bg-primary h-full rounded-full transition-[width] duration-300"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {statusOrder.map(status => {
          const count = totals[status];
          const share = totalTasks > 0 ? Math.round((count / totalTasks) * 100) : 0;
          const meta = STATUS_META[status];

          return (
            <div key={status} className="border-border bg-background rounded-md border px-3.5 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`rounded-md px-2.5 py-1 text-xs font-semibold ${meta.badgeClassName}`}
                  >
                    {meta.label}
                  </span>
                  <span className={`text-sm ${meta.textClassName}`}>{count} items</span>
                </div>
                <span className="text-foreground/65 text-sm font-semibold">{share}%</span>
              </div>
              <div className="bg-muted mt-3 h-2 overflow-hidden rounded-full">
                <div
                  className={`h-full rounded-full transition-[width] duration-300 ${meta.barClassName}`}
                  style={{ width: `${share}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
