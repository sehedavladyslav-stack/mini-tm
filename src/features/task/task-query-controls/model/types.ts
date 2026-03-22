import type { Task } from '@/entities';

type TaskStatusFilter = 'all' | Task['status'];
type TaskSortField = 'title' | 'status' | 'dueDate' | 'updatedAt';
type TaskSortOrder = 'asc' | 'desc';

type TaskQueryParams = {
  status: TaskStatusFilter;
  sortBy: TaskSortField;
  order: TaskSortOrder;
};

export type { TaskStatusFilter, TaskSortField, TaskSortOrder, TaskQueryParams };
