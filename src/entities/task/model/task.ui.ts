import type { FormattedDateString } from 'shared';

type TaskId = ReturnType<typeof crypto.randomUUID>;

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
