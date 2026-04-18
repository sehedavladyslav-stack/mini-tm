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
      <label className="flex flex-1 flex-col gap-1.5">
        <span className="text-foreground/55 text-xs font-bold tracking-[0.08em] uppercase">
          Sort by
        </span>
        <select
          className="border-border bg-background text-foreground focus:border-primary/55 min-h-10 truncate rounded-xl border px-3 transition-colors duration-150 outline-none"
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

      <label className="flex flex-1 flex-col gap-1.5">
        <span className="text-foreground/55 text-xs font-bold tracking-[0.08em] uppercase">
          Order
        </span>
        <select
          className="border-border bg-background text-foreground focus:border-primary/55 min-h-10 truncate rounded-xl border px-3 transition-colors duration-150 outline-none"
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
