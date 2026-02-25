import type { Task } from '@/entities';
import { createISODateString, type TaskId } from '@/shared';

console.log(localStorage.getItem('tasks'));

let tasks: Task[];

// if (!localStorage.getItem('tasks')) {
//   tasks = JSON.parse(localStorage.getItem('tasks'));
// }

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

export async function getApiTasks() {
  console.log('Get ', tasks);
  if (!localStorage.getItem('tasks')) {
    localStorage.tasks = JSON.stringify(initialData);
  }
  tasks = JSON.parse(localStorage.tasks);
  return tasks;
}

export async function getApiTask(id: TaskId) {
  if (!tasks) {
    localStorage.tasks = JSON.stringify(initialData);
  }
  tasks = JSON.parse(localStorage.tasks);
  const task = tasks.find(t => t.id === id);
  return task;
}

export async function setApiTask(task: Task) {
  console.log('Create', task);
  tasks.push(task);
  localStorage.tasks = JSON.stringify(tasks);
}
