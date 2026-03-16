import type { ISODateString, TaskId } from '@/shared/types';

type Status = 'completed' | 'todo' | 'canceled' | 'active';

type Task = {
  id: TaskId;
  title: string;
  description: string;
  status: Status;
  dueDate: ISODateString;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type { Task };
