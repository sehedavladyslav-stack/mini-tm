import { taskSource } from '@/shared';
import type { TaskId } from '@/shared';

export async function deleteTask(taskId: TaskId): Promise<void> {
  await taskSource.deleteTask(taskId);
}
