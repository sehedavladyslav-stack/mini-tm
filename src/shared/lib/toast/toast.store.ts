import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info';

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastStore = {
  toasts: Toast[];
  show: (message: string, type?: ToastType) => void;
  remove: (id: string) => void;
};

export const useToastStore = create<ToastStore>(set => ({
  toasts: [],
  show: (message, type = 'info') =>
    set(state => ({
      toasts: [...state.toasts, { id: crypto.randomUUID(), message, type }],
    })),
  remove: id =>
    set(state => ({
      toasts: state.toasts.filter(t => t.id !== id),
    })),
}));
