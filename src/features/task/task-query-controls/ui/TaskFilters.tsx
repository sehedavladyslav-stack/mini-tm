import { STATUS_OPTIONS } from '../model/constants';
import { useTaskQueryStore } from '../model/task-query.store';
import type { TaskStatusFilter } from '../model/types';

const STATUS_VALUES: TaskStatusFilter[] = STATUS_OPTIONS.map(option => option.value);

function TaskFilters() {
  const status = useTaskQueryStore(state => state.params.status);
  const setStatus = useTaskQueryStore(state => state.setStatus);

  return (
    <label className="tasks-control-field">
      <span>Status</span>
      <select
        className="tasks-control-input"
        value={status}
        onChange={event => {
          const value = event.currentTarget.value;

          if (STATUS_VALUES.includes(value as TaskStatusFilter)) {
            setStatus(value as TaskStatusFilter);
          }
        }}
      >
        {STATUS_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export { TaskFilters };
