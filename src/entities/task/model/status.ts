const TASK_STATUSES = ['todo', 'canceled', 'in_progress', 'done'] as const;

type TaskStatus = (typeof TASK_STATUSES)[number];

export { TASK_STATUSES };
export type { TaskStatus };
