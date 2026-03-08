import type { Task } from '@/entities';
import { createISODateString, type TaskId } from '@/shared';

let tasks: Task[];

const date = createISODateString(Date.now());

const initialData = [
  {
    id: crypto.randomUUID(),
    title: 'First title',
    description: 'Prepare homepage copy and align it with the updated product positioning.',
    status: 'todo',
    dueDate: date,
    createdAt: date,
    updatedAt: date,
  },
  {
    id: crypto.randomUUID(),
    title: 'Second title',
    description: 'Review open pull requests, leave feedback, and merge ready changes.',
    status: 'todo',
    dueDate: date,
    createdAt: date,
    updatedAt: date,
  },
] as Task[];

function readTasks(): Task[] {
  const rawTasks = localStorage.getItem('tasks');

  if (!rawTasks) {
    localStorage.setItem('tasks', JSON.stringify(initialData));
    return [...initialData];
  }

  try {
    const parsedTasks = JSON.parse(rawTasks) as Task[];
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

function writeTasks(nextTasks: Task[]) {
  tasks = nextTasks;
  localStorage.setItem('tasks', JSON.stringify(nextTasks));
}

export async function getApiTasks() {
  tasks = readTasks();
  return tasks;
}

export async function getApiTask(id: TaskId) {
  tasks = readTasks();
  const task = tasks.find(t => t.id === id);
  return task;
}

export async function setApiTask(task: Task) {
  const currentTasks = readTasks();
  writeTasks([...currentTasks, task]);
}

export async function deleteApiTask(id: TaskId) {
  const currentTasks = readTasks();
  writeTasks(currentTasks.filter(t => t.id !== id));
}

export async function updateApiTaskStatus(id: TaskId, status: Task['status']) {
  const currentTasks = readTasks();
  const updatedAt = createISODateString(Date.now());
  let nextTask: Task | null = null;

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
