import { useToastStore } from '../../lib/toast/toast.store';
import { ToastItem } from './ToastItem';

export function Toaster() {
  const toasts = useToastStore(s => s.toasts);

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
