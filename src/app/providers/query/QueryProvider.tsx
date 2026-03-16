import { AppRouterProvider } from '../router/RouterProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/shared';
import { queryClient } from './queryClient';

function QueryProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouterProvider />
      <Toaster />
    </QueryClientProvider>
  );
}

export { QueryProvider };
