import type { Task } from '../model';
import { httpTaskSource } from '@shared/index';

export async function createTask(task: Task): Promise<void> {
  await httpTaskSource.createTask(task);
}
