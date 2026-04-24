import { httpTaskSource } from '@/shared/index';
import type { TaskId } from '@/shared';

export async function deleteTask(taskId: TaskId): Promise<void> {
  await httpTaskSource.deleteTask(taskId);
}
