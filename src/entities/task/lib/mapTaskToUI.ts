import { formatDate, type TaskApi, type TaskId } from '@/shared';
import type { TaskUI } from '../model';

export function fromTaskToUI(data: Omit<TaskApi, 'createdAt'>): TaskUI {
  const dueDate = formatDate(data.dueDate as string);
  const updateDate = formatDate(data.updatedAt);

  const uiTask = {
    ...data,
    id: data.id as TaskId,
    description: data.description || '',
    dueDate: dueDate,
    updatedAt: updateDate,
  };

  return uiTask;
}
