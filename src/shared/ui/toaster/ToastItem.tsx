import { useEffect } from 'react';
import { useToastStore, type Toast } from '../../lib/toast/toast.store';
import { toastVariants } from './toast.variants';
import { cn } from '@shared/lib';

type Props = {
  toast: Toast;
};

export function ToastItem({ toast }: Props) {
  const remove = useToastStore(s => s.remove);

  useEffect(() => {
    const timer = setTimeout(() => {
      remove(toast.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.id, remove]);

  return <div className={cn(toastVariants({ variant: toast.type }))}>{toast.message}</div>;
}
