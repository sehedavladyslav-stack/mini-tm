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
    <section className="tasks-controls" aria-label="Task filters and sorting">
      <div className="tasks-controls-main">
        <div className="tasks-controls-group">
          <TaskFilters />
          <TaskSorting />
        </div>

        {hasActiveFilters ? (
          <div className="tasks-active-filters" aria-label="Active filters">
            {activeFilters.map(filter => (
              <span key={filter.key} className="tasks-active-filter">
                <span className="tasks-active-filter-label">{filter.label}</span>
                <button
                  type="button"
                  className="tasks-active-filter-remove"
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
