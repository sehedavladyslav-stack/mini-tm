import { createISODateString, type ISODateString } from '@shared/index';
import type { TaskStatus } from '@entities/index';
import { create } from 'zustand';

export type TaskFormData = {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: ISODateString;
};

const date = createISODateString(Date.now());

export const INITIAL_FORM: TaskFormData = {
  title: '',
  description: '',
  status: 'todo',
  dueDate: date,
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
