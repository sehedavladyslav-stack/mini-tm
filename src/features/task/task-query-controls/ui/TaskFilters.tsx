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
      <label className="grid min-w-0 gap-1.5">
        <span className="text-[0.76rem] font-bold tracking-[0.08em] text-foreground/55 uppercase">
          Search
        </span>
        <input
          className="min-h-10 rounded-xl border border-border bg-background px-3 text-foreground outline-none transition-colors duration-150 placeholder:text-foreground/45 focus:border-primary/55"
          type="search"
          value={inputValue}
          placeholder="Search by title or description"
          onChange={event => setInputValue(event.currentTarget.value)}
        />
      </label>

      <label className="grid gap-1.5">
        <span className="text-[0.76rem] font-bold tracking-[0.08em] text-foreground/55 uppercase">
          Status
        </span>
        <select
          className="min-h-10 rounded-xl border border-border bg-background px-3 text-foreground outline-none transition-colors duration-150 focus:border-primary/55"
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
