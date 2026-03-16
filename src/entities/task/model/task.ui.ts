import type { FormattedDateString, TaskId } from '@/shared/types';

type Status = 'completed' | 'todo' | 'canceled' | 'active';

type TaskUI = {
  id: TaskId;
  title: string;
  description: string;
  status: Status;
  dueDate: FormattedDateString;
  updatedAt: FormattedDateString;
};

export type { TaskUI };
