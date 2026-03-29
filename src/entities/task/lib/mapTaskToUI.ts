import { formatDate } from '@/shared';
import type { Task, TaskUI } from '../model';

export function fromTaskToUI(data: Omit<Task, 'createdAt'>): TaskUI {
  const dueDate = formatDate(data.dueDate);
  const updateDate = formatDate(data.updatedAt);

  const uiTask = { ...data, dueDate: dueDate, updatedAt: updateDate };

  return uiTask;
}
