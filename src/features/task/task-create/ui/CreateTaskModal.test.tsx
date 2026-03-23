// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { click, render, submit } from '@/shared/test';
import { INITIAL_FORM, useTaskFormData } from '../model/form.store';
import { useCreateTaskModalStore } from '../model/modal.store';

const mutateMock = vi.fn();

vi.mock('../model/useCreateTaskMutation', () => ({
  useCreateTaskMutation: () => ({
    mutate: mutateMock,
  }),
}));

import { CreateTaskModal } from './CreateTaskModal';

describe('CreateTaskModal', () => {
  beforeEach(() => {
    mutateMock.mockReset();
    useCreateTaskModalStore.setState({ isOpen: false });
    useTaskFormData.setState({ formData: INITIAL_FORM });
  });

  afterEach(() => {
    useCreateTaskModalStore.setState({ isOpen: false });
    useTaskFormData.setState({ formData: INITIAL_FORM });
  });

  it('does not render when the modal is closed', async () => {
    const { container, unmount } = await render(<CreateTaskModal />);

    expect(container.innerHTML).toBe('');

    await unmount();
  });

  it('submits a trimmed task, closes the modal and resets the form', async () => {
    useCreateTaskModalStore.setState({ isOpen: true });
    useTaskFormData.setState({
      formData: {
        ...INITIAL_FORM,
        title: '  New task  ',
        description: '  Ship release  ',
        status: 'active',
        dueDate: '2026-03-23T10:00:00.000Z' as typeof INITIAL_FORM.dueDate,
      },
    });

    const { container, unmount } = await render(<CreateTaskModal />);
    const form = container.querySelector('form');

    if (!(form instanceof HTMLFormElement)) {
      throw new Error('Form was not rendered');
    }

    await submit(form);

    expect(mutateMock).toHaveBeenCalledTimes(1);
    expect(mutateMock.mock.calls[0][0]).toMatchObject({
      title: 'New task',
      description: 'Ship release',
      status: 'active',
      dueDate: '2026-03-23T10:00:00.000Z',
    });
    expect(useCreateTaskModalStore.getState().isOpen).toBe(false);
    expect(useTaskFormData.getState().formData).toEqual(INITIAL_FORM);

    await unmount();
  });

  it('closes and resets when the close button is clicked', async () => {
    useCreateTaskModalStore.setState({ isOpen: true });
    useTaskFormData.setState({
      formData: {
        ...INITIAL_FORM,
        title: 'Draft',
        description: 'Body',
      },
    });

    const { container, unmount } = await render(<CreateTaskModal />);
    const closeButton = Array.from(container.querySelectorAll('button')).find(button =>
      button.textContent?.includes('Close'),
    );

    if (!(closeButton instanceof HTMLButtonElement)) {
      throw new Error('Close button was not rendered');
    }

    await click(closeButton);

    expect(useCreateTaskModalStore.getState().isOpen).toBe(false);
    expect(useTaskFormData.getState().formData).toEqual(INITIAL_FORM);
    expect(mutateMock).not.toHaveBeenCalled();

    await unmount();
  });
});
