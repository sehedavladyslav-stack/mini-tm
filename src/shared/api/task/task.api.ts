import { API_BASE_URL } from '@/shared/config';
import { requestJson } from '../base/http';
import type { CreateTaskRequest, TaskApi, TaskStatus } from './task.types';
import type { TaskId } from '@shared/types';

type TaskSource = {
  getTasks: () => Promise<TaskApi[]>;
  getTask: (id: TaskId) => Promise<TaskApi | undefined>;
  createTask: (task: CreateTaskRequest) => Promise<void>;
  deleteTask: (id: TaskId) => Promise<void>;
  updateTaskStatus: (id: TaskId, status: TaskStatus) => Promise<TaskApi | null>;
};

const TASKS_ENDPOINT = `${API_BASE_URL}/tasks`;

const httpTaskSource: TaskSource = {
  async getTasks() {
    return requestJson<TaskApi[]>(TASKS_ENDPOINT);
  },

  async getTask(id) {
    try {
      return await requestJson<TaskApi>(`${TASKS_ENDPOINT}/${id}`);
    } catch {
      return undefined;
    }
  },

  async createTask(task) {
    await requestJson<void>(TASKS_ENDPOINT, {
      method: 'POST',
      body: task,
    });
  },

  async deleteTask(id) {
    await requestJson<void>(`${TASKS_ENDPOINT}/${id}`, {
      method: 'DELETE',
    });
  },

  async updateTaskStatus(id, status) {
    try {
      return await requestJson<TaskApi>(`${TASKS_ENDPOINT}/${id}`, {
        method: 'PATCH',
        body: { status },
      });
    } catch {
      return null;
    }
  },
};

export { httpTaskSource };
