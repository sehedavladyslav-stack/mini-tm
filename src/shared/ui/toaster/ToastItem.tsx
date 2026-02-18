import { useToastStore, type Toast } from '@/shared';
import { useEffect } from 'react';

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

  return <div className={`toast toast-${toast.type}`}>{toast.message}</div>;
}
