import type { TaskUI } from '../model';
import { httpTaskSource } from '@/shared/index';
import { fromTaskToUI } from '../lib/mapTaskToUI';

export async function getTasks(): Promise<TaskUI[]> {
  const date = await httpTaskSource.getTasks();

  const tasks = date?.map(t => fromTaskToUI(t));

  return tasks;
}
