import {
  SORT_FIELD_OPTIONS,
  SORT_FIELD_VALUES,
  SORT_ORDER_OPTIONS,
  SORT_ORDER_VALUES,
} from '../model/constants';
import { useTaskQueryStore } from '../model/task-query.store';
import type { TaskSortField, TaskSortOrder } from '../model/types';

function TaskSorting() {
  const sortBy = useTaskQueryStore(state => state.params.sortBy);
  const order = useTaskQueryStore(state => state.params.order);
  const setSortBy = useTaskQueryStore(state => state.setSortBy);
  const setOrder = useTaskQueryStore(state => state.setOrder);

  return (
    <>
      <label className="grid gap-1.5">
        <span className="text-[0.76rem] font-bold tracking-[0.08em] text-foreground/55 uppercase">
          Sort by
        </span>
        <select
          className="min-h-10 rounded-xl border border-border bg-background px-3 text-foreground outline-none transition-colors duration-150 focus:border-primary/55"
          value={sortBy}
          onChange={event => {
            const value = event.currentTarget.value;

            if (SORT_FIELD_VALUES.includes(value as TaskSortField)) {
              setSortBy(value as TaskSortField);
            }
          }}
        >
          {SORT_FIELD_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-1.5">
        <span className="text-[0.76rem] font-bold tracking-[0.08em] text-foreground/55 uppercase">
          Order
        </span>
        <select
          className="min-h-10 rounded-xl border border-border bg-background px-3 text-foreground outline-none transition-colors duration-150 focus:border-primary/55"
          value={order}
          onChange={event => {
            const value = event.currentTarget.value;

            if (SORT_ORDER_VALUES.includes(value as TaskSortOrder)) {
              setOrder(value as TaskSortOrder);
            }
          }}
        >
          {SORT_ORDER_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}

export { TaskSorting };
