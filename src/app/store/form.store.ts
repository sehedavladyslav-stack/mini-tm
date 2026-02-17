import { create } from 'zustand';

export type TaskFormData = {
  title: string;
  description: string;
  status: string;
  dueDate: string;
};

export const INITIAL_FORM: TaskFormData = {
  title: '',
  description: '',
  status: 'to do',
  dueDate: '',
};

type TaskFormState = {
  formData: TaskFormData;
  updateField: <K extends keyof TaskFormData>(field: K, value: TaskFormData[K]) => void;
  reset: () => void;
};

export const useTaskFormData = create<TaskFormState>(set => ({
  formData: INITIAL_FORM,
  updateField: (field, value) =>
    set(state => ({
      formData: { ...state.formData, [field]: value },
    })),
  reset: () =>
    set({
      formData: INITIAL_FORM,
    }),
}));
