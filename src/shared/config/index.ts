type TaskSourceMode = 'local' | 'http';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';
const TASK_SOURCE_MODE = (import.meta.env.VITE_TASK_SOURCE_MODE ?? 'local') as TaskSourceMode;

export { API_BASE_URL, TASK_SOURCE_MODE };
export type { TaskSourceMode };
