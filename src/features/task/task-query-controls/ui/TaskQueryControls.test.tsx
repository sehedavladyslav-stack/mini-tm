// @vitest-environment jsdom

import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SEARCH_DEBOUNCE_MS, useTaskQueryStore } from '../model';
import { click, render, setInputValue, setSelectValue } from '@/shared/test';
import { TaskQueryControls } from './TaskQueryControls';

describe('TaskQueryControls', () => {
  beforeEach(() => {
    useTaskQueryStore.getState().reset();
  });

  afterEach(() => {
    vi.useRealTimers();
    useTaskQueryStore.getState().reset();
  });

  it('renders active chips and reset clears all query params', async () => {
    useTaskQueryStore.getState().setParams({
      search: 'desk',
      status: 'active',
      sortBy: 'title',
      order: 'asc',
    });

    const { container, unmount } = await render(<TaskQueryControls />);

    expect(container.textContent).toContain('Search: "desk"');
    expect(container.textContent).toContain('Status: In progress');
    expect(container.textContent).toContain('Sort: Title (Ascending)');

    const resetButton = Array.from(container.querySelectorAll('button')).find(button =>
      button.textContent?.includes('Reset'),
    );

    if (!(resetButton instanceof HTMLButtonElement)) {
      throw new Error('Reset button was not rendered');
    }

    expect(resetButton.disabled).toBe(false);

    await click(resetButton);

    expect(useTaskQueryStore.getState().params).toEqual({
      search: '',
      status: 'all',
      sortBy: 'updatedAt',
      order: 'desc',
    });
    expect(container.textContent).not.toContain('Search: "desk"');

    await unmount();
  });

  it('updates search with debounce and changes status immediately', async () => {
    vi.useFakeTimers();

    const { container, unmount } = await render(<TaskQueryControls />);
    const searchInput = container.querySelector('input[type="search"]');
    const selects = container.querySelectorAll('select');
    const statusSelect = selects.item(0);

    if (!(searchInput instanceof HTMLInputElement) || !(statusSelect instanceof HTMLSelectElement)) {
      throw new Error('Controls were not rendered');
    }

    await setInputValue(searchInput, 'deploy');

    expect(useTaskQueryStore.getState().params.search).toBe('');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SEARCH_DEBOUNCE_MS);
    });

    expect(useTaskQueryStore.getState().params.search).toBe('deploy');

    await setSelectValue(statusSelect, 'completed');

    expect(useTaskQueryStore.getState().params.status).toBe('completed');

    await unmount();
  });
});
