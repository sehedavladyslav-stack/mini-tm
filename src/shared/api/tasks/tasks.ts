import type { Task, TaskUI } from '@/entities';
import { formatDate, type TaskId } from '@/shared';
import {
  deleteApiTask,
  getApiTask,
  getApiTasks,
  setApiTask,
  updateApiTaskStatus,
} from '../client/client';

function fromTaskToUI(data: Omit<Task, 'createdAt'>): TaskUI {
  const dueDate = formatDate(data.dueDate);
  const updateDate = formatDate(data.updatedAt);

  const uiTask = { ...data, dueDate: dueDate, updatedAt: updateDate };

  return uiTask;
}

export async function getTasks(): Promise<TaskUI[]> {
  const data = await getApiTasks();
  const tasks = data?.map(t => fromTaskToUI(t));
  return tasks;
}

export async function getTask(taskId: TaskId): Promise<TaskUI> {
  const task = await getApiTask(taskId);

  if (!task) {
    throw new Error('Not found task');
  }

  return fromTaskToUI(task);
}

export async function createTask(task: Task): Promise<void> {
  await setApiTask(task);
}

export async function deleteTask(taskId: TaskId): Promise<void> {
  await deleteApiTask(taskId);
}

export async function updateTaskStatus(taskId: TaskId, status: Task['status']): Promise<void> {
  const updatedTask = await updateApiTaskStatus(taskId, status);

  if (!updatedTask) {
    throw new Error('Task not found');
  }
}
