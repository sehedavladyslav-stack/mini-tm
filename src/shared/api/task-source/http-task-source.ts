// import { API_BASE_URL } from '@/shared/config';
// import { requestJson } from '../base/http';
// import type { ApiTask, TaskSource } from './types';

// const TASKS_ENDPOINT = `${API_BASE_URL}/tasks`;

// const httpTaskSource: TaskSource = {
//   async getTasks() {
//     return requestJson<ApiTask[]>(TASKS_ENDPOINT);
//   },

//   async getTask(id) {
//     try {
//       return await requestJson<ApiTask>(`${TASKS_ENDPOINT}/${id}`);
//     } catch {
//       return undefined;
//     }
//   },

//   async createTask(task) {
//     await requestJson<void>(TASKS_ENDPOINT, {
//       method: 'POST',
//       body: task,
//     });
//   },

//   async deleteTask(id) {
//     await requestJson<void>(`${TASKS_ENDPOINT}/${id}`, {
//       method: 'DELETE',
//     });
//   },

//   async updateTaskStatus(id, status) {
//     try {
//       return await requestJson<ApiTask>(`${TASKS_ENDPOINT}/${id}`, {
//         method: 'PATCH',
//         body: { status },
//       });
//     } catch {
//       return null;
//     }
//   },
// };

// export { httpTaskSource };
