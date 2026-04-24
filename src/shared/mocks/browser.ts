import { setupWorker } from 'msw/browser';
import { taskHandlers } from './handlers/task.handlers';

const handlers = [...taskHandlers];

export const worker = setupWorker(...handlers);
