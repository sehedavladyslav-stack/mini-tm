import { create } from 'zustand';

type TaskFormData = {
  title: string;
  description: string;
  status: string;
  dueDate: string;
};

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
};

export const useModalStore = create(set => ({
  isOpen: false,
  onClose: () => set((state: TaskModalProps) => ({ isOpen: !state.isOpen })),
  onSubmit: () => set((state: TaskModalProps) => ({ isOpen: !state.isOpen })),
}));
