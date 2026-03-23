import { TASK_SOURCE_MODE } from '@/shared/config';
import { httpTaskSource } from './http-task-source';
import { localTaskSource } from './local-task-source';

export const taskSource = TASK_SOURCE_MODE === 'http' ? httpTaskSource : localTaskSource;

export type { ApiTask, ApiTaskStatus, TaskSource } from './types';
