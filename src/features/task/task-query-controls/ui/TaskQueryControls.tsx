import { Button } from '@/shared';
import { TaskFilters } from './TaskFilters';
import { TaskSorting } from './TaskSorting';
import { SORT_FIELD_OPTIONS, SORT_ORDER_OPTIONS, STATUS_OPTIONS } from '../model/constants';
import { INITIAL_TASK_QUERY_PARAMS, useTaskQueryStore } from '../model/task-query.store';

type ActiveFilterChip = {
  key: string;
  label: string;
  onRemove: () => void;
};

function TaskQueryControls() {
  const params = useTaskQueryStore(state => state.params);
  const reset = useTaskQueryStore(state => state.reset);
  const setSearch = useTaskQueryStore(state => state.setSearch);
  const setStatus = useTaskQueryStore(state => state.setStatus);
  const setSortBy = useTaskQueryStore(state => state.setSortBy);
  const setOrder = useTaskQueryStore(state => state.setOrder);
  const statusLabel = STATUS_OPTIONS.find(option => option.value === params.status)?.label;
  const sortFieldLabel = SORT_FIELD_OPTIONS.find(option => option.value === params.sortBy)?.label;
  const sortOrderLabel = SORT_ORDER_OPTIONS.find(option => option.value === params.order)?.label;
  const activeFilters: ActiveFilterChip[] = [];

  if (params.search.trim()) {
    activeFilters.push({
      key: 'search',
      label: `Search: "${params.search.trim()}"`,
      onRemove: () => setSearch(INITIAL_TASK_QUERY_PARAMS.search),
    });
  }

  if (params.status !== INITIAL_TASK_QUERY_PARAMS.status && statusLabel) {
    activeFilters.push({
      key: 'status',
      label: `Status: ${statusLabel}`,
      onRemove: () => setStatus(INITIAL_TASK_QUERY_PARAMS.status),
    });
  }

  if (
    (params.sortBy !== INITIAL_TASK_QUERY_PARAMS.sortBy ||
      params.order !== INITIAL_TASK_QUERY_PARAMS.order) &&
    sortFieldLabel &&
    sortOrderLabel
  ) {
    activeFilters.push({
      key: 'sort',
      label: `Sort: ${sortFieldLabel} (${sortOrderLabel})`,
      onRemove: () => {
        setSortBy(INITIAL_TASK_QUERY_PARAMS.sortBy);
        setOrder(INITIAL_TASK_QUERY_PARAMS.order);
      },
    });
  }

  const hasActiveFilters = activeFilters.length > 0;

  return (
    <section
      className="mt-4 flex flex-col items-stretch gap-4 rounded-[18px] border border-border bg-surface px-[18px] py-4 text-foreground shadow-(--app-shadow) md:flex-row md:items-end md:justify-between"
      aria-label="Task filters and sorting"
    >
      <div className="grid flex-1 gap-3">
        <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]">
          <TaskFilters />
          <TaskSorting />
        </div>

        {hasActiveFilters ? (
          <div className="flex flex-wrap gap-2" aria-label="Active filters">
            {activeFilters.map(filter => (
              <span
                key={filter.key}
                className="inline-flex min-h-7.5 max-w-full items-center rounded-full border border-primary/30 bg-primary/12 px-2.5 text-[0.82rem] font-semibold text-foreground"
              >
                <span className="min-w-0 md:truncate">{filter.label}</span>
                <button
                  type="button"
                  className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/18 text-[0.8rem] leading-none font-bold text-foreground transition-colors hover:bg-primary/26 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/35"
                  aria-label={`Remove ${filter.label}`}
                  onClick={filter.onRemove}
                >
                  x
                </button>
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <Button type="button" variant="ghost" size="sm" onClick={reset} disabled={!hasActiveFilters}>
        Reset
      </Button>
    </section>
  );
}

export { TaskQueryControls };
