import { create } from 'zustand';
import type { TaskQueryParams, TaskSortField, TaskSortOrder, TaskStatusFilter } from './types';

const INITIAL_TASK_QUERY_PARAMS: TaskQueryParams = {
  search: '',
  status: 'all',
  sortBy: 'updatedAt',
  order: 'desc',
};

type TaskQueryState = {
  params: TaskQueryParams;
  setParams: (params: TaskQueryParams) => void;
  setSearch: (search: string) => void;
  setStatus: (status: TaskStatusFilter) => void;
  setSortBy: (sortBy: TaskSortField) => void;
  setOrder: (order: TaskSortOrder) => void;
  reset: () => void;
};

export const useTaskQueryStore = create<TaskQueryState>(set => ({
  params: INITIAL_TASK_QUERY_PARAMS,
  setParams: params =>
    set({
      params,
    }),
  setSearch: search =>
    set(state => ({
      params: { ...state.params, search },
    })),
  setStatus: status =>
    set(state => ({
      params: { ...state.params, status },
    })),
  setSortBy: sortBy =>
    set(state => ({
      params: { ...state.params, sortBy },
    })),
  setOrder: order =>
    set(state => ({
      params: { ...state.params, order },
    })),
  reset: () =>
    set({
      params: INITIAL_TASK_QUERY_PARAMS,
    }),
}));

export { INITIAL_TASK_QUERY_PARAMS };
