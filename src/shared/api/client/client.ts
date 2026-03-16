import { createISODateString } from '@/shared/lib';
import type { ISODateString, TaskId } from '@/shared/types';

type ApiTaskStatus = 'completed' | 'todo' | 'canceled' | 'active';

type ApiTask = {
  id: TaskId;
  title: string;
  description: string;
  status: ApiTaskStatus;
  dueDate: ISODateString;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

let tasks: ApiTask[] = [];

const date = createISODateString(Date.now());

const initialData: ApiTask[] = [
  {
    id: crypto.randomUUID() as TaskId,
    title: 'First title',
    description: 'Prepare homepage copy and align it with the updated product positioning.',
    status: 'todo',
    dueDate: date,
    createdAt: date,
    updatedAt: date,
  },
  {
    id: crypto.randomUUID() as TaskId,
    title: 'Second title',
    description: 'Review open pull requests, leave feedback, and merge ready changes.',
    status: 'todo',
    dueDate: date,
    createdAt: date,
    updatedAt: date,
  },
];

function readTasks() {
  const rawTasks = localStorage.getItem('tasks');

  if (!rawTasks) {
    localStorage.setItem('tasks', JSON.stringify(initialData));
    return [...initialData];
  }

  try {
    const parsedTasks = JSON.parse(rawTasks) as ApiTask[];
    if (!Array.isArray(parsedTasks)) {
      localStorage.setItem('tasks', JSON.stringify(initialData));
      return [...initialData];
    }

    return parsedTasks;
  } catch {
    localStorage.setItem('tasks', JSON.stringify(initialData));
    return [...initialData];
  }
}

function writeTasks(nextTasks: ApiTask[]) {
  tasks = nextTasks;
  localStorage.setItem('tasks', JSON.stringify(nextTasks));
}

export async function getApiTasks(): Promise<ApiTask[]> {
  tasks = readTasks();
  return tasks;
}

export async function getApiTask(id: TaskId): Promise<ApiTask | undefined> {
  tasks = readTasks();
  const task = tasks.find(t => t.id === id);
  return task;
}

export async function setApiTask(task: ApiTask): Promise<void> {
  const currentTasks = readTasks();
  writeTasks([...currentTasks, task]);
}

export async function deleteApiTask(id: TaskId): Promise<void> {
  const currentTasks = readTasks();
  writeTasks(currentTasks.filter(t => t.id !== id));
}

export async function updateApiTaskStatus(
  id: TaskId,
  status: ApiTask['status'],
): Promise<ApiTask | null> {
  const currentTasks = readTasks();
  const updatedAt = createISODateString(Date.now());
  let nextTask: ApiTask | null = null;

  const nextTasks = currentTasks.map(task => {
    if (task.id !== id) {
      return task;
    }

    const updatedTask = { ...task, status, updatedAt };
    nextTask = updatedTask;
    return updatedTask;
  });

  if (nextTask) {
    writeTasks(nextTasks);
  }

  return nextTask;
}

export type { ApiTask };
