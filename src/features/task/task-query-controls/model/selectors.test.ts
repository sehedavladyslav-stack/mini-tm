import { describe, expect, it } from 'vitest';
import type { TaskUI } from '@/entities';
import type { TaskQueryParams } from './types';
import { filterTasks, getVisibleTasks, sortTasks } from './selectors';

const tasks: TaskUI[] = [
  {
    id: '1' as TaskUI['id'],
    title: 'Write docs',
    description: 'Prepare release notes',
    status: 'todo',
    dueDate: '22-03-2026 10:00' as TaskUI['dueDate'],
    updatedAt: '21-03-2026 09:15' as TaskUI['updatedAt'],
  },
  {
    id: '2' as TaskUI['id'],
    title: 'Deploy app',
    description: 'Ship to production',
    status: 'in_progress',
    dueDate: '20-03-2026 12:00' as TaskUI['dueDate'],
    updatedAt: '23-03-2026 08:45' as TaskUI['updatedAt'],
  },
  {
    id: '3' as TaskUI['id'],
    title: 'Archive tasks',
    description: 'Cleanup completed cards',
    status: 'done',
    dueDate: 'invalid-date' as TaskUI['dueDate'],
    updatedAt: '19-03-2026 17:30' as TaskUI['updatedAt'],
  },
];

describe('filterTasks', () => {
  it('filters by normalized search and status', () => {
    const params: TaskQueryParams = {
      search: '  release  ',
      status: 'todo',
      sortBy: 'updatedAt',
      order: 'desc',
    };

    expect(filterTasks(tasks, params)).toEqual([tasks[0]]);
  });

  it('returns all statuses when filter is all', () => {
    const params: TaskQueryParams = {
      search: 'app',
      status: 'all',
      sortBy: 'updatedAt',
      order: 'desc',
    };

    expect(filterTasks(tasks, params)).toEqual([tasks[1]]);
  });
});

describe('sortTasks', () => {
  it('sorts by title ascending', () => {
    const params: TaskQueryParams = {
      search: '',
      status: 'all',
      sortBy: 'title',
      order: 'asc',
    };

    expect(sortTasks(tasks, params).map(task => task.id)).toEqual([
      tasks[2].id,
      tasks[1].id,
      tasks[0].id,
    ]);
  });

  it('sorts by due date descending and treats invalid dates as oldest', () => {
    const params: TaskQueryParams = {
      search: '',
      status: 'all',
      sortBy: 'dueDate',
      order: 'desc',
    };

    expect(sortTasks(tasks, params).map(task => task.id)).toEqual([
      tasks[0].id,
      tasks[1].id,
      tasks[2].id,
    ]);
  });
});

describe('getVisibleTasks', () => {
  it('filters first and then sorts the visible tasks', () => {
    const params: TaskQueryParams = {
      search: 't',
      status: 'all',
      sortBy: 'updatedAt',
      order: 'asc',
    };

    expect(getVisibleTasks(tasks, params).map(task => task.id)).toEqual([
      tasks[2].id,
      tasks[0].id,
      tasks[1].id,
    ]);
  });
});
