import type { TaskUI } from '../model';
import { getApiTasks } from '@/shared/api';
import { fromTaskToUI } from '../lib/mapTaskToUI';

export async function getTasks(): Promise<TaskUI[]> {
  const data = await getApiTasks();
  const tasks = data?.map(t => fromTaskToUI(t));
  return tasks;
}
