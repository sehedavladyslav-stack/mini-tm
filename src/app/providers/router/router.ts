import { createBrowserRouter } from 'react-router';
import { AppLayout } from '@/shared';
import { Dashboard, NotFoundPage, TaskDetailPage, TaskList } from '@/pages';

const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: '/tasks', Component: TaskList },
      { path: '/tasks/:taskId', Component: TaskDetailPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);

export { router };
