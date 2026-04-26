import { formatDate, type TaskApi, type TaskId } from '@/shared';
import type { TaskUI } from '../model';

export function fromTaskToUI(date: Omit<TaskApi, 'createdAt'>): TaskUI {
  const dueDate = formatDate(date.dueDate as string);
  const updateDate = formatDate(date.updatedAt);

  const uiTask = {
    ...date,
    id: date.id as TaskId,
    description: date.description || '',
    dueDate: dueDate,
    updatedAt: updateDate,
  };

  return uiTask;
}
