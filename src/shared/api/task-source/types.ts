// import type { ISODateString, TaskId } from '@/shared/types';

// type ApiTaskStatus = 'completed' | 'todo' | 'canceled' | 'active';

// type ApiTask = {
//   id: TaskId;
//   title: string;
//   description: string;
//   status: ApiTaskStatus;
//   dueDate: ISODateString;
//   createdAt: ISODateString;
//   updatedAt: ISODateString;
// };

// type TaskSource = {
//   getTasks: () => Promise<ApiTask[]>;
//   getTask: (id: TaskId) => Promise<ApiTask | undefined>;
//   createTask: (task: ApiTask) => Promise<void>;
//   deleteTask: (id: TaskId) => Promise<void>;
//   updateTaskStatus: (id: TaskId, status: ApiTask['status']) => Promise<ApiTask | null>;
// };

// export type { ApiTask, ApiTaskStatus, TaskSource };
