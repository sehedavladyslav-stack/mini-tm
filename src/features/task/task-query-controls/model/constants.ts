import { TASK_STATUSES } from '@/entities';
import type { Option, TaskSortField, TaskSortOrder, TaskStatusFilter } from './types';

const SEARCH_DEBOUNCE_MS = 300;
const STATUS_VALUES: TaskStatusFilter[] = ['all', ...TASK_STATUSES];
const SORT_FIELD_VALUES: TaskSortField[] = ['updatedAt', 'dueDate', 'title', 'status'];
const SORT_ORDER_VALUES: TaskSortOrder[] = ['asc', 'desc'];

const STATUS_OPTIONS: Option<TaskStatusFilter>[] = [
  { value: 'all', label: 'All tasks' },
  { value: 'todo', label: 'To do' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'done', label: 'Completed' },
  { value: 'canceled', label: 'Canceled' },
];

const SORT_FIELD_OPTIONS: Option<TaskSortField>[] = [
  { value: 'updatedAt', label: 'Last updated' },
  { value: 'dueDate', label: 'Due date' },
  { value: 'title', label: 'Title' },
  { value: 'status', label: 'Status' },
];

const SORT_ORDER_OPTIONS: Option<TaskSortOrder>[] = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
];

export {
  SEARCH_DEBOUNCE_MS,
  STATUS_VALUES,
  SORT_FIELD_VALUES,
  SORT_ORDER_VALUES,
  STATUS_OPTIONS,
  SORT_FIELD_OPTIONS,
  SORT_ORDER_OPTIONS,
};
