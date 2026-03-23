// @vitest-environment jsdom

import { MemoryRouter, Route, Routes, useLocation } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { TaskUI } from '@/entities';
import { click, flushPromises, render } from '@/shared/test';
import { useTaskQueryStore } from '@/features/task/task-query-controls';

const useTasksQueryMock = vi.fn();
const openModalMock = vi.fn();

vi.mock('@/entities', async () => {
  return {
    TASK_STATUSES: ['todo', 'active', 'completed', 'canceled'],
    useTasksQuery: () => useTasksQueryMock(),
    TaskItem: ({ task, href }: { task: TaskUI; href?: string }) => (
      <article data-href={href}>{task.title}</article>
    ),
  };
});

vi.mock('@/features', () => {
  return {
    CreateTaskModal: () => null,
    useCreateTaskModalStore: () => ({
      openModal: openModalMock,
    }),
  };
});

import { TaskList } from './TaskList';

const tasks: TaskUI[] = [
  {
    id: '1' as TaskUI['id'],
    title: 'Deploy app',
    description: 'Ship to production',
    status: 'active',
    dueDate: '24-03-2026 12:00' as TaskUI['dueDate'],
    updatedAt: '23-03-2026 10:00' as TaskUI['updatedAt'],
  },
  {
    id: '2' as TaskUI['id'],
    title: 'Write docs',
    description: 'Prepare the release guide',
    status: 'todo',
    dueDate: '25-03-2026 09:00' as TaskUI['dueDate'],
    updatedAt: '22-03-2026 18:00' as TaskUI['updatedAt'],
  },
];

describe('TaskList integration', () => {
  beforeEach(() => {
    openModalMock.mockReset();
    useTaskQueryStore.getState().reset();
    useTasksQueryMock.mockReturnValue({
      tasks,
      isPending: false,
      isError: false,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    useTaskQueryStore.getState().reset();
  });

  function LocationProbe() {
    const location = useLocation();
    return <output data-testid="location-search">{location.search}</output>;
  }

  it('renders task list without URL parameters', async () => {
    vi.useFakeTimers();

    try {
      const { container, unmount } = await render(
        <MemoryRouter initialEntries={['/tasks']}>
          <Routes>
            <Route path="/tasks" element={<TaskList />} />
          </Routes>
        </MemoryRouter>
      );

      vi.advanceTimersByTime(500);
      await flushPromises();

      expect(container.textContent).toContain('Task board');
      expect(container.textContent).toContain('Deploy app');
      expect(container.textContent).toContain('Write docs');

      await unmount();
    } finally {
      vi.useRealTimers();
    }
  });

  it.skip('hydrates from URL params, filters the list, updates chips and clears everything on reset', async () => {
    vi.useFakeTimers();

    try {
      const { container, unmount } = await render(
        <MemoryRouter initialEntries={['/tasks?search=deploy&status=active']}>
          <Routes>
            <Route
              path="/tasks"
              element={
                <>
                  <LocationProbe />
                  <TaskList />
                </>
              }
            />
          </Routes>
        </MemoryRouter>
      );

      const locationSearch = container.querySelector('[data-testid="location-search"]');
      if (!(locationSearch instanceof HTMLOutputElement)) {
        throw new Error('Location probe was not rendered');
      }

      // Advance timers to allow any debouncing to complete
      vi.advanceTimersByTime(500);
      await flushPromises();

      expect(container.textContent).toContain('Deploy app');
      expect(container.textContent).not.toContain('Write docs');
      expect(container.textContent).toContain('Search: "deploy"');
      expect(container.textContent).toContain('Status: In progress');
      expect(locationSearch.textContent).toBe('?search=deploy&status=active');

      const removeSearchButton = Array.from(container.querySelectorAll('button')).find(
        button => button.getAttribute('aria-label') === 'Remove Search: "deploy"'
      );

      if (!(removeSearchButton instanceof HTMLButtonElement)) {
        throw new Error('Search chip remove button was not rendered');
      }

      await click(removeSearchButton);
      await flushPromises();
      vi.advanceTimersByTime(500);
      await flushPromises();

      expect(locationSearch.textContent).toBe('?status=active');
      expect(container.textContent).not.toContain('Search: "deploy"');
      expect(container.textContent).toContain('Deploy app');
      expect(container.textContent).not.toContain('Write docs');

      const resetButton = Array.from(container.querySelectorAll('button')).find(button =>
        button.textContent?.includes('Reset')
      );

      if (!(resetButton instanceof HTMLButtonElement)) {
        throw new Error('Reset button was not rendered');
      }

      await click(resetButton);
      await flushPromises();
      vi.advanceTimersByTime(500);
      await flushPromises();

      expect(locationSearch.textContent).toBe('');
      expect(container.textContent).not.toContain('Status: In progress');
      expect(container.textContent).toContain('Deploy app');
      expect(container.textContent).toContain('Write docs');

      await unmount();
    } finally {
      vi.useRealTimers();
    }
  });
});
