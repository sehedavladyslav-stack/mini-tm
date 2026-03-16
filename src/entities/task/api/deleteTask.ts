import { deleteApiTask } from '@/shared/api';
import type { TaskId } from '@/shared/types';

export async function deleteTask(taskId: TaskId): Promise<void> {
  await deleteApiTask(taskId);
}
