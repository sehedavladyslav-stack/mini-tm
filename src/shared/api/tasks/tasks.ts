import type { Task } from '@/entities';
import { formatDate } from '@/shared';

const now = Date.now().toString();
console.log(now);
const date = formatDate(now);

const initialData = [
  {
    id: crypto.randomUUID(),
    title: 'First title',
    description: 'description task',
    status: 'to do',
    dueDate: date,
    createdAt: date,
    updatedAt: date,
  },
  {
    id: crypto.randomUUID(),
    title: 'Second title',
    description: 'description task',
    status: 'to do',
    dueDate: date,
    createdAt: date,
    updatedAt: date,
  },
];

export async function getTasks(): Promise<Task[]> {
  return initialData;
}

export async function getTask(taskId: string | undefined): Promise<Task> {
  const task = initialData.find(t => t.id === taskId) as Task;

  if (!task) {
    throw new Error('Not found task');
  }
  return task;
}

export async function createTask(task: Task): Promise<Task> {
  return task;
}
