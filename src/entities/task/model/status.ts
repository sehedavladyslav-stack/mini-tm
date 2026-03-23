const TASK_STATUSES = ['todo', 'active', 'completed', 'canceled'] as const;

type TaskStatus = (typeof TASK_STATUSES)[number];

export { TASK_STATUSES };
export type { TaskStatus };
