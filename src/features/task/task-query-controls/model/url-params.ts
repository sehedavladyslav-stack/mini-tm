import { SORT_FIELD_VALUES, SORT_ORDER_VALUES, STATUS_VALUES } from './constants';
import { INITIAL_TASK_QUERY_PARAMS } from './task-query.store';
import type { TaskQueryParams, TaskSortField, TaskSortOrder, TaskStatusFilter } from './types';

function isTaskStatusFilter(value: string): value is TaskStatusFilter {
  return STATUS_VALUES.includes(value as TaskStatusFilter);
}

function isTaskSortField(value: string): value is TaskSortField {
  return SORT_FIELD_VALUES.includes(value as TaskSortField);
}

function isTaskSortOrder(value: string): value is TaskSortOrder {
  return SORT_ORDER_VALUES.includes(value as TaskSortOrder);
}

export function parseTaskQueryParams(searchParams: URLSearchParams): TaskQueryParams {
  const search = searchParams.get('search') ?? INITIAL_TASK_QUERY_PARAMS.search;
  const statusParam = searchParams.get('status');
  const sortByParam = searchParams.get('sortBy');
  const orderParam = searchParams.get('order');

  return {
    search,
    status:
      statusParam && isTaskStatusFilter(statusParam)
        ? statusParam
        : INITIAL_TASK_QUERY_PARAMS.status,
    sortBy:
      sortByParam && isTaskSortField(sortByParam) ? sortByParam : INITIAL_TASK_QUERY_PARAMS.sortBy,
    order:
      orderParam && isTaskSortOrder(orderParam) ? orderParam : INITIAL_TASK_QUERY_PARAMS.order,
  };
}

export function isSameTaskQueryParams(
  firstParams: TaskQueryParams,
  secondParams: TaskQueryParams,
): boolean {
  return (
    firstParams.search === secondParams.search &&
    firstParams.status === secondParams.status &&
    firstParams.sortBy === secondParams.sortBy &&
    firstParams.order === secondParams.order
  );
}

export function createTaskQuerySearchParams(params: TaskQueryParams): URLSearchParams {
  const nextSearchParams = new URLSearchParams();

  if (params.search.trim()) {
    nextSearchParams.set('search', params.search.trim());
  }

  if (params.status !== INITIAL_TASK_QUERY_PARAMS.status) {
    nextSearchParams.set('status', params.status);
  }

  if (params.sortBy !== INITIAL_TASK_QUERY_PARAMS.sortBy) {
    nextSearchParams.set('sortBy', params.sortBy);
  }

  if (params.order !== INITIAL_TASK_QUERY_PARAMS.order) {
    nextSearchParams.set('order', params.order);
  }

  return nextSearchParams;
}
