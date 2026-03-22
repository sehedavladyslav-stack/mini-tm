import { Button } from '@/shared';
import { TaskFilters } from './TaskFilters';
import { TaskSorting } from './TaskSorting';
import { useTaskQueryStore } from '../model/task-query.store';

function TaskQueryControls() {
  const reset = useTaskQueryStore(state => state.reset);

  return (
    <section className="tasks-controls" aria-label="Task filters and sorting">
      <div className="tasks-controls-group">
        <TaskFilters />
        <TaskSorting />
      </div>
      <Button type="button" variant="ghost" size="sm" onClick={reset}>
        Reset
      </Button>
    </section>
  );
}

export { TaskQueryControls };
