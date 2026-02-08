import { RouterProvider } from 'react-router/dom';
import { router } from './router';

function AppRouterProvider() {
  return <RouterProvider router={router} />;
}
export { AppRouterProvider };
