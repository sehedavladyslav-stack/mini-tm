import type { TaskSortField, TaskSortOrder, TaskStatusFilter } from './types';

type Option<T> = {
  value: T;
  label: string;
};

const STATUS_OPTIONS: Option<TaskStatusFilter>[] = [
  { value: 'all', label: 'All tasks' },
  { value: 'todo', label: 'To do' },
  { value: 'active', label: 'In progress' },
  { value: 'completed', label: 'Completed' },
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

export { STATUS_OPTIONS, SORT_FIELD_OPTIONS, SORT_ORDER_OPTIONS };
