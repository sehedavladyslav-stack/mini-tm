import { useState } from 'react';
import { useTasksQuery } from '@entities/index';
import { Button, Chart, Loader } from '@shared/index';

type Period = 'today' | '7d' | '30d';

type ChartPoint = {
  label: string;
  value: number;
};

const PERIOD_OPTIONS: { value: Period; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: '7d', label: '7 days' },
  { value: '30d', label: '30 days' },
];

function parseTaskDate(value: string): Date | null {
  const match = value.match(/^(\d{1,2})-(\d{1,2})-(\d{4}) (\d{2}):(\d{2})$/);

  if (!match) {
    return null;
  }

  const [, day, month, year, hours, minutes] = match;
  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hours),
    Number(minutes),
    0,
    0
  );

  return Number.isNaN(date.getTime()) ? null : date;
}

function Dashboard() {
  const [period, setPeriod] = useState<Period>('7d');

  const { tasks, isPending, isError } = useTasksQuery();

  if (isPending) {
    return <Loader message="Loading dashboard" />;
  }

  if (isError) {
    throw new Error('Failed to load dashboard');
  }

  const now = new Date();
  const rangeStart = new Date(now);

  if (period === 'today') {
    rangeStart.setHours(0, 0, 0, 0);
  } else {
    rangeStart.setHours(0, 0, 0, 0);
    rangeStart.setDate(rangeStart.getDate() - (period === '7d' ? 6 : 29));
  }

  const filteredTasks = tasks.filter(task => {
    const updatedAt = parseTaskDate(task.updatedAt);
    return updatedAt ? updatedAt >= rangeStart && updatedAt <= now : false;
  });

  const sortedFilteredTasks = [...filteredTasks].sort((a, b) => {
    const first = parseTaskDate(a.updatedAt)?.getTime() ?? 0;
    const second = parseTaskDate(b.updatedAt)?.getTime() ?? 0;
    return second - first;
  });

  const chartPoints: ChartPoint[] = (() => {
    if (period === 'today') {
      const points = Array.from({ length: 8 }, (_, index) => ({
        label: `${(index * 3).toString().padStart(2, '0')}:00`,
        value: 0,
      }));

      filteredTasks.forEach(task => {
        const updatedAt = parseTaskDate(task.updatedAt);
        if (!updatedAt) {
          return;
        }
        const bucket = Math.min(Math.floor(updatedAt.getHours() / 3), points.length - 1);
        points[bucket].value += 1;
      });

      return points;
    }

    const days = period === '7d' ? 7 : 30;
    const dayBuckets = Array.from({ length: days }, (_, index) => {
      const date = new Date(rangeStart);
      date.setDate(rangeStart.getDate() + index);
      date.setHours(0, 0, 0, 0);

      return {
        date,
        label: `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`,
        value: 0,
      };
    });

    filteredTasks.forEach(task => {
      const updatedAt = parseTaskDate(task.updatedAt);
      if (!updatedAt) {
        return;
      }

      const normalized = new Date(updatedAt);
      normalized.setHours(0, 0, 0, 0);
      const index = Math.floor((normalized.getTime() - dayBuckets[0].date.getTime()) / 86400000);

      if (index >= 0 && index < dayBuckets.length) {
        dayBuckets[index].value += 1;
      }
    });

    return dayBuckets;
  })();

  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter(task => task.status === 'completed').length;
  const activeTasks = filteredTasks.filter(task => task.status === 'active').length;
  const todoTasks = filteredTasks.filter(task => task.status === 'todo').length;
  const canceledTasks = filteredTasks.filter(task => task.status === 'canceled').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const recentTasks = sortedFilteredTasks.slice(0, 5);
  const chartMax = Math.max(...chartPoints.map(point => point.value), 1);
  const periodLabel = PERIOD_OPTIONS.find(item => item.value === period)?.label ?? '7 days';

  const chartStyle = {
    border: '1px solid color-mix(in oklch, var(--app-border) 45%, transparent)',
  };
  const barTrackStyle = {
    background: 'color-mix(in oklch, var(--app-muted) 65%, transparent)',
    border: '1px solid color-mix(in oklch, var(--app-border) 40%, transparent)',
  };
  const barFillStyle = {
    background: 'var(--app-primary)',
  };

  return (
    <section className="flex flex-wrap gap-4" aria-labelledby="dashboard-title">
      <Chart />
      <section className="flex flex-col gap-3">
        <section
          className="flex flex-col items-stretch gap-3 rounded-md p-4 text-foreground shadow-(--app-shadow) lg:flex-row lg:items-center lg:justify-between"
          aria-label="Dashboard period filter"
        >
          <div className="grid grid-cols-1 gap-1">
            <h3 className="m-0 text-base font-medium">Time range</h3>
            <p className="m-0 text-sm text-foreground/70">
              Data is calculated by task updates within the selected period.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 lg:justify-between">
            {PERIOD_OPTIONS.map(option => (
              <Button
                key={option.value}
                type="button"
                onClick={() => setPeriod(option.value)}
                className={`${option.value === period ? 'bg-muted shadow-xs' : ''} flex-1 basis-[30%] lg:basis-auto`}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </section>
        <section
          className="grid gap-4 rounded-md p-4 text-foreground shadow-(--app-shadow)"
          aria-labelledby="dashboard-activity-title"
        >
          <div className="flex items-center justify-between gap-2.5">
            <h3 id="dashboard-activity-title" className="m-0 text-[1.05rem]">
              Activity chart
            </h3>
            <span className="text-[0.85rem] font-bold text-foreground/70">{periodLabel}</span>
          </div>
          <div
            className="grid min-h-47.5 auto-rows-fr grid-cols-[repeat(8,minmax(24px,1fr))] items-end gap-2 overflow-x-auto rounded-[14px] p-3 min-[721px]:grid-cols-[repeat(auto-fit,minmax(22px,1fr))]"
            style={chartStyle}
          >
            {chartPoints.map(point => (
              <div key={point.label} className="grid justify-items-center gap-1.5">
                <span className="text-[0.72rem] font-bold text-foreground/65">{point.value}</span>
                <div
                  className="flex h-27.5 w-full items-end overflow-hidden rounded-full"
                  style={barTrackStyle}
                >
                  <div
                    className="min-h-0.5 w-full rounded-[inherit]"
                    style={{
                      ...barFillStyle,
                      height: `${(point.value / chartMax) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-[0.68rem] text-foreground/55">{point.label}</span>
              </div>
            ))}
          </div>
        </section>
      </section>
    </section>
  );
}

export { Dashboard };
