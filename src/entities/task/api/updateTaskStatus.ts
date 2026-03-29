import { taskSource } from '@/shared';
import type { TaskId } from '@/shared';
import type { Task } from '../model';

export async function updateTaskStatus(taskId: TaskId, status: Task['status']): Promise<void> {
  const updatedTask = await taskSource.updateTaskStatus(taskId, status);

  if (!updatedTask) {
    throw new Error('Task not found');
  }
}
