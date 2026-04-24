import type { ISODateString, TaskId } from '@/shared';
import type { TaskStatus } from './status';

type Task = {
  id: TaskId;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate: ISODateString;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type { Task };
