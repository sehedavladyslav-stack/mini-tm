import { http, HttpResponse } from 'msw';
import { tasks } from '../data/task.data';
import type { CreateTaskRequest } from '@shared/api/task/task.types';

export const taskHandlers = [
  http.get('api/tasks', () => {
    return HttpResponse.json(tasks);
  }),

  http.get('/api/tasks/:taskId', ({ params }) => {
    console.log(params, tasks);
    const task = tasks.find(t => t.id === params.taskId);
    return HttpResponse.json(task);
  }),

  http.post('/api/tasks', async ({ request }) => {
    const body = (await request.json()) as CreateTaskRequest;

    const newTask = {
      id: crypto.randomUUID(),
      ...body,
      status: 'todo' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);

    return HttpResponse.json(newTask, { status: 201 });
  }),
];
