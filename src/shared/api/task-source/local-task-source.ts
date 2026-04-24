// import { createISODateString } from '@/shared/lib';
// import type { TaskId } from '@/shared/types';
// import type { ApiTask, TaskSource } from './types';

// let tasks: ApiTask[] = [];

// const date = createISODateString(Date.now());

// const initialData: ApiTask[] = [
//   {
//     id: crypto.randomUUID() as TaskId,
//     title: 'First title',
//     description: 'Prepare homepage copy and align it with the updated product positioning.',
//     status: 'todo',
//     dueDate: date,
//     createdAt: date,
//     updatedAt: date,
//   },
//   {
//     id: crypto.randomUUID() as TaskId,
//     title: 'Second title',
//     description: 'Review open pull requests, leave feedback, and merge ready changes.',
//     status: 'todo',
//     dueDate: date,
//     createdAt: date,
//     updatedAt: date,
//   },
// ];

// function readTasks(): ApiTask[] {
//   const rawTasks = localStorage.getItem('tasks');

//   if (!rawTasks) {
//     localStorage.setItem('tasks', JSON.stringify(initialData));
//     return [...initialData];
//   }

//   try {
//     const parsedTasks = JSON.parse(rawTasks) as ApiTask[];

//     if (!Array.isArray(parsedTasks)) {
//       localStorage.setItem('tasks', JSON.stringify(initialData));
//       return [...initialData];
//     }

//     return parsedTasks;
//   } catch {
//     localStorage.setItem('tasks', JSON.stringify(initialData));
//     return [...initialData];
//   }
// }

// function writeTasks(nextTasks: ApiTask[]) {
//   tasks = nextTasks;
//   localStorage.setItem('tasks', JSON.stringify(nextTasks));
// }

// const localTaskSource: TaskSource = {
//   async getTasks() {
//     tasks = readTasks();
//     return tasks;
//   },

//   async getTask(id) {
//     tasks = readTasks();
//     return tasks.find(task => task.id === id);
//   },

//   async createTask(task) {
//     const currentTasks = readTasks();
//     writeTasks([...currentTasks, task]);
//   },

//   async deleteTask(id) {
//     const currentTasks = readTasks();
//     writeTasks(currentTasks.filter(task => task.id !== id));
//   },

//   async updateTaskStatus(id, status) {
//     const currentTasks = readTasks();
//     const updatedAt = createISODateString(Date.now());
//     let nextTask: ApiTask | null = null;

//     const nextTasks = currentTasks.map(task => {
//       if (task.id !== id) {
//         return task;
//       }

//       const updatedTask = { ...task, status, updatedAt };
//       nextTask = updatedTask;
//       return updatedTask;
//     });

//     if (nextTask) {
//       writeTasks(nextTasks);
//     }

//     return nextTask;
//   },
// };

// export { localTaskSource };
