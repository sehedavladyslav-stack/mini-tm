import { AppRouterProvider, queryClient } from '@/app';
import { QueryClientProvider } from '@tanstack/react-query';

function QueryProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouterProvider />
    </QueryClientProvider>
  );
}

export { QueryProvider };
