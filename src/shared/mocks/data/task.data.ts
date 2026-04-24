import type { TaskApi } from '@shared/api';

export const tasks = [
  {
    id: crypto.randomUUID(),
    title: 'First title',
    description: 'Prepare homepage copy and align it with the updated product positioning.',
    status: 'todo',
    dueDate: Date.now().toString(),
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  },
  {
    id: crypto.randomUUID(),
    title: 'Second title',
    description: 'Review open pull requests, leave feedback, and merge ready changes.',
    status: 'todo',
    dueDate: Date.now().toString(),
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  },
] as TaskApi[];
