import type { TaskUI } from '../model';
import { taskSource } from '@/shared/api';
import { fromTaskToUI } from '../lib/mapTaskToUI';

export async function getTasks(): Promise<TaskUI[]> {
  const data = await taskSource.getTasks();
  const tasks = data?.map(t => fromTaskToUI(t));
  return tasks;
}
