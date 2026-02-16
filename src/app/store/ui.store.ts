import { create } from 'zustand';

type TaskFormData = {
  title: string;
  description: string;
  status: string;
  dueDate: string;
};

type ModalState = {
  isOpen: boolean;
  formData: TaskFormData;
  setFormData: (updater: (prev: TaskFormData) => TaskFormData) => void;
  openModal: () => void;
  closeModal: () => void;
  submitModal: (data: TaskFormData) => void;
};

const INITIAL_FORM: TaskFormData = {
  title: '',
  description: '',
  status: 'to do',
  dueDate: '',
};

export const useModalStore = create<ModalState>(set => ({
  isOpen: false,
  formData: INITIAL_FORM,
  
  setFormData: (updater) => set((state) => ({
    formData: updater(state.formData),
  })),
  
  openModal: () => set({ isOpen: true, formData: INITIAL_FORM }),
  
  closeModal: () => set({ isOpen: false, formData: INITIAL_FORM }),
  
  submitModal: (data: TaskFormData) => set({ isOpen: false, formData: INITIAL_FORM }),
}))
