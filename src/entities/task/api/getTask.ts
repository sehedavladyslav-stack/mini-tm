import type { TaskId } from '@/shared';
import type { TaskUI } from '../model';
import { taskSource } from '@/shared';
import { fromTaskToUI } from '../lib/mapTaskToUI';

export async function getTask(taskId: TaskId): Promise<TaskUI> {
  const task = await taskSource.getTask(taskId);

  if (!task) {
    throw new Error('Not found task');
  }

  return fromTaskToUI(task);
}
