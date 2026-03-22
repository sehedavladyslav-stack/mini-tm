import { SORT_FIELD_OPTIONS, SORT_ORDER_OPTIONS } from '../model/constants';
import { useTaskQueryStore } from '../model/task-query.store';
import type { TaskSortField, TaskSortOrder } from '../model/types';

const SORT_FIELD_VALUES: TaskSortField[] = SORT_FIELD_OPTIONS.map(option => option.value);
const SORT_ORDER_VALUES: TaskSortOrder[] = SORT_ORDER_OPTIONS.map(option => option.value);

function TaskSorting() {
  const sortBy = useTaskQueryStore(state => state.params.sortBy);
  const order = useTaskQueryStore(state => state.params.order);
  const setSortBy = useTaskQueryStore(state => state.setSortBy);
  const setOrder = useTaskQueryStore(state => state.setOrder);

  return (
    <>
      <label className="tasks-control-field">
        <span>Sort by</span>
        <select
          className="tasks-control-input"
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

      <label className="tasks-control-field">
        <span>Order</span>
        <select
          className="tasks-control-input"
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
