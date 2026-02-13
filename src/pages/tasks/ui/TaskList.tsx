import { useState } from 'react';
import type { Task } from '@/entities';
import { TaskItem } from '@/entities';
import { TaskModal } from '@/shared/ui/modal';
import { useTask } from '@/app';

function TaskList() {
  const { tasks, addTask } = useTask(state => state);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  function handleAddTask(data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toLocaleString();
    const task: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      status: data.status,
      dueDate: data.dueDate,
      createdAt: now,
      updatedAt: now,
    };
    addTask(task);
  }

  return (
    <section className="tasks-section" aria-labelledby="tasks-heading">
      <div className="tasks-header" id="tasks-header">
        <h2 className="tasks-title" id="tasks-heading">
          List of task
        </h2>
        <button className="tasks-add-button" type="button" onClick={() => setModalOpen(true)}>
          Add Task
        </button>
      </div>
      {tasks.length > 0 ? (
        <ul className="tasks-list">
          {tasks.map(t => (
            <li key={t.id}>
              <TaskItem task={t} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="tasks-loading">Is loading</p>
      )}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddTask}
      />
    </section>
  );
}

export { TaskList };
