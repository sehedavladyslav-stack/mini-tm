import { httpTaskSource } from '@/shared/index';
import type { TaskId } from '@/shared';
import type { Task } from '../model';

export async function updateTaskStatus(taskId: TaskId, status: Task['status']): Promise<void> {
  const updatedTask = await httpTaskSource.updateTaskStatus(taskId, status);

  if (!updatedTask) {
    throw new Error('Task not found');
  }
}
