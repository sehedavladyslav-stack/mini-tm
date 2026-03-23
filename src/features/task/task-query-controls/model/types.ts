import type { Task } from '@/entities';

type Option<T> = {
  value: T;
  label: string;
};

type TaskStatusFilter = 'all' | Task['status'];
type TaskSortField = 'title' | 'status' | 'dueDate' | 'updatedAt';
type TaskSortOrder = 'asc' | 'desc';

type TaskQueryParams = {
  search: string;
  status: TaskStatusFilter;
  sortBy: TaskSortField;
  order: TaskSortOrder;
};

export type { Option, TaskStatusFilter, TaskSortField, TaskSortOrder, TaskQueryParams };
