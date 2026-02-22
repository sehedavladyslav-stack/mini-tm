import type { Task, TaskUI } from '@/entities';
import { createISODateString, formatDate, type TaskId } from '@/shared';

const date = createISODateString(Date.now());

const initialData = [
  {
    id: crypto.randomUUID(),
    title: 'First title',
    description: 'description task',
    status: 'todo',
    dueDate: date,
    createdAt: date,
    updatedAt: date,
  },
  {
    id: crypto.randomUUID(),
    title: 'Second title',
    description: 'description task',
    status: 'todo',
    dueDate: date,
    createdAt: date,
    updatedAt: date,
  },
] as Task[];

function fromTaskToUI(data: Omit<Task, 'createdAt'>): TaskUI {
  const dueDate = formatDate(data.dueDate);
  const updateDate = formatDate(data.updatedAt);

  const uiTask = { ...data, dueDate: dueDate, updatedAt: updateDate };

  return uiTask;
}

export async function getTasks(): Promise<TaskUI[]> {
  const tasks = initialData.map(t => fromTaskToUI(t));

  return tasks;
}

export async function getTask(taskId: TaskId): Promise<TaskUI> {
  const task = initialData.find(t => t.id === taskId) as Task;

  if (!task) {
    throw new Error('Not found task');
  }

  return fromTaskToUI(task);
}

export async function createTask(task: Task): Promise<Task> {
  return task;
}
