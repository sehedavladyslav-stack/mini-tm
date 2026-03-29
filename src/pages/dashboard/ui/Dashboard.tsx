import { useState } from 'react';
import { useTasksQuery } from '@entities/index';
import { Chart, Loader } from '@shared/index';

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

  return (
    <section className="dashboard" aria-labelledby="dashboard-title">
      <Chart></Chart>
      <section>
        <section className="dashboard-filter" aria-label="Dashboard period filter">
          <div className="dashboard-filter-copy">
            <h3>Time range</h3>
            <p>Data is calculated by task updates within the selected period.</p>
          </div>
          <div className="dashboard-filter-actions">
            {PERIOD_OPTIONS.map(option => (
              <button
                key={option.value}
                className={`dashboard-filter-btn ${period === option.value ? 'is-active' : ''}`}
                type="button"
                onClick={() => setPeriod(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>
        <section className="dashboard-activity" aria-labelledby="dashboard-activity-title">
          <div className="dashboard-activity-head">
            <h3 id="dashboard-activity-title">Activity chart</h3>
            <span>{periodLabel}</span>
          </div>
          <div className="dashboard-activity-chart">
            {chartPoints.map(point => (
              <div key={point.label} className="dashboard-activity-column">
                <span className="dashboard-activity-value">{point.value}</span>
                <div className="dashboard-activity-bar-track">
                  <div
                    className="dashboard-activity-bar-fill"
                    style={{ height: `${(point.value / chartMax) * 100}%` }}
                  />
                </div>
                <span className="dashboard-activity-label">{point.label}</span>
              </div>
            ))}
          </div>
        </section>
      </section>
    </section>
  );
}

export { Dashboard };
