import type { Task } from '@/entities';
import { create } from 'zustand';

const now = Date.now().toLocaleString();

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'First title',
    description: 'description task',
    status: 'to do',
    dueDate: now,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '2',
    title: 'Second title',
    description: 'description task',
    status: 'to do',
    dueDate: now,
    createdAt: now,
    updatedAt: now,
  },
];

type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
};

export const useTask = create<TaskStore>()(set => ({
  tasks: initialTasks,
  addTask: task => set(state => ({ tasks: [...state.tasks, task] })),
}));
