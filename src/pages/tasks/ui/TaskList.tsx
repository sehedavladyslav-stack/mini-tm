import { useState } from 'react';
import type { Task } from '@/entities';
import { TaskItem } from '@/entities';
import { TaskModal } from '@/shared/ui/modal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createTask, formatDate, getTasks, Loader } from '@/shared';
import { queryClient } from '@/app';

function TaskList() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const {
    data: tasks = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: newTask => {
      queryClient.setQueryData<Task[]>(['tasks'], prev => [...(prev ?? []), newTask]);
    },
  });

  if (isPending) {
    return <Loader message="Loading" />;
  }

  if (isError) {
    throw new Error('Not found');
  }

  function handleAddTask(data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = Date.now().toString();
    const createTaskData = formatDate(now);

    const task: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      status: data.status,
      dueDate: data.dueDate,
      createdAt: createTaskData,
      updatedAt: createTaskData,
    };
    createTaskMutation.mutate(task);
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
