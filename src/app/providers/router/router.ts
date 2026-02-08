import { createBrowserRouter } from 'react-router';
import { AppLayout } from 'shared';
import { Dashboard, TaskList } from 'pages';

const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: '/tasks', Component: TaskList },
    ],
  },
]);

export { router };
