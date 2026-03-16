import { setApiTask } from '@/shared/api';
import type { Task } from '../model';

export async function createTask(task: Task): Promise<void> {
  await setApiTask(task);
}
