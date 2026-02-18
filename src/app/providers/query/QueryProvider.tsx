import { AppRouterProvider, queryClient } from '@/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'shared';

function QueryProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouterProvider />
      <Toaster />
    </QueryClientProvider>
  );
}

export { QueryProvider };
