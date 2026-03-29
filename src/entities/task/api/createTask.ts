import { taskSource } from '@/shared';
import type { Task } from '../model';

export async function createTask(task: Task): Promise<void> {
  await taskSource.createTask(task);
}
