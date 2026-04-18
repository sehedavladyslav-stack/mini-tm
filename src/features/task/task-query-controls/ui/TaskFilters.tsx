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
      <label className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="text-foreground/55 text-xs font-bold tracking-[0.08em] uppercase">
          Search
        </span>
        <input
          className="border-border bg-background text-foreground placeholder:text-foreground/45 focus:border-primary/55 min-h-10 truncate rounded-xl border px-3 transition-colors duration-150 outline-none"
          type="search"
          value={inputValue}
          placeholder="Search by title or description"
          onChange={event => setInputValue(event.currentTarget.value)}
        />
      </label>

      <label className="flex flex-1 flex-col gap-1.5 md:gap-2">
        <span className="text-foreground/55 text-xs font-bold tracking-[0.08em] uppercase">
          Status
        </span>
        <select
          className="border-border bg-background text-foreground focus:border-primary/55 min-h-10 truncate rounded-xl border px-3 transition-colors duration-150 outline-none"
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
