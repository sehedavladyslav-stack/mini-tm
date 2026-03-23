import { useEffect, useState } from 'react';
import { SEARCH_DEBOUNCE_MS, STATUS_OPTIONS, STATUS_VALUES } from '../model/constants';
import { useTaskQueryStore } from '../model/task-query.store';
import type { TaskStatusFilter } from '../model/types';

function TaskFilters() {
  const search = useTaskQueryStore(state => state.params.search);
  const status = useTaskQueryStore(state => state.params.status);
  const setSearch = useTaskQueryStore(state => state.setSearch);
  const setStatus = useTaskQueryStore(state => state.setStatus);
  const [inputValue, setInputValue] = useState(search);

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== search) {
        setSearch(inputValue);
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [inputValue, search, setSearch]);

  return (
    <>
      <label className="tasks-control-field tasks-control-field--search">
        <span>Search</span>
        <input
          className="tasks-control-input"
          type="search"
          value={inputValue}
          placeholder="Search by title or description"
          onChange={event => setInputValue(event.currentTarget.value)}
        />
      </label>

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
    </>
  );
}

export { TaskFilters };
