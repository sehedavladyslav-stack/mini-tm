import { create } from 'zustand';

type UpdateTaskStatusModalState = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
};

export const useUpdateTaskStatusModalStore = create<UpdateTaskStatusModalState>(set => ({
  isOpen: false,

  openModal: () => set({ isOpen: true }),

  closeModal: () => set({ isOpen: false }),

  toggleModal: () => set(state => ({ isOpen: !state.isOpen })),
}));
