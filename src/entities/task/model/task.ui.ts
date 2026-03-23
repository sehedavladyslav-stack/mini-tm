import type { FormattedDateString } from '@/shared/types';
import type { Task } from './task';

type TaskUI = Omit<Task, 'dueDate' | 'createdAt' | 'updatedAt'> & {
  dueDate: FormattedDateString;
  updatedAt: FormattedDateString;
};

export type { TaskUI };
