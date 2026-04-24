import type { TaskId } from '@/shared';
import type { TaskUI } from '../model';
import { httpTaskSource } from '@/shared/index';
import { fromTaskToUI } from '../lib/mapTaskToUI';

export async function getTask(taskId: TaskId): Promise<TaskUI> {
  const task = await httpTaskSource.getTask(taskId);

  if (!task) {
    throw new Error('Not found task');
  }

  return fromTaskToUI(task);
}
