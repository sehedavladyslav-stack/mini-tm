import type { TaskUI } from '@/entities';
import type { TaskQueryParams } from './types';

function parseFormattedDate(value: TaskUI['dueDate'] | TaskUI['updatedAt']): number {
  const match = value.match(/^(\d{1,2})-(\d{1,2})-(\d{4}) (\d{2}):(\d{2})$/);

  if (!match) {
    return 0;
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

  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

export function filterTasks(tasks: TaskUI[], params: TaskQueryParams): TaskUI[] {
  const normalizedSearch = params.search.trim().toLowerCase();

  return tasks.filter(task => {
    const matchesStatus = params.status === 'all' || task.status === params.status;

    if (!normalizedSearch) {
      return matchesStatus;
    }

    const matchesSearch =
      task.title.toLowerCase().includes(normalizedSearch) ||
      task.description?.toLowerCase().includes(normalizedSearch);

    return matchesStatus && matchesSearch;
  });
}

export function sortTasks(tasks: TaskUI[], params: TaskQueryParams): TaskUI[] {
  const direction = params.order === 'asc' ? 1 : -1;

  return [...tasks].sort((firstTask, secondTask) => {
    switch (params.sortBy) {
      case 'title':
        return firstTask.title.localeCompare(secondTask.title) * direction;
      case 'status':
        return firstTask.status.localeCompare(secondTask.status) * direction;
      case 'dueDate':
        return (
          (parseFormattedDate(firstTask.dueDate) - parseFormattedDate(secondTask.dueDate)) *
          direction
        );
      case 'updatedAt':
        return (
          (parseFormattedDate(firstTask.updatedAt) - parseFormattedDate(secondTask.updatedAt)) *
          direction
        );
      default:
        return 0;
    }
  });
}

export function getVisibleTasks(tasks: TaskUI[], params: TaskQueryParams): TaskUI[] {
  const filteredTasks = filterTasks(tasks, params);

  return sortTasks(filteredTasks, params);
}
