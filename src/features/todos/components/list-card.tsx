'use client';

import { TodoState } from '@features/todos/todo-state';
import { useEffect, useState } from 'react';
import Card from './card';
import { Todo, TodoList } from '../types';
import { Toaster } from 'react-hot-toast';

export default function ListCards({ data }: { data: TodoList }) {
  const [tasks, setTasks] = useState<Todo[]>([]);

  useEffect(() => {
    setTasks(data.todos);
  }, [data]);

  const handleChangeState = (id: number, newState: TodoState) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, state: newState } : task,
      ),
    );
    console.log(`Card ${id} mudou para ${newState}`);
  };

  if (tasks.length === 0) {
    return (
      <div className="flex w-full justify-center">
        <div className="flex w-full max-w-3xl items-center justify-center bg-gray-900/90 text-white rounded-2xl border border-green-900/40 p-8 shadow-2xl">
          <p>Nenhuma tarefa encontrada.</p>
        </div>
      </div>
    );
  }

  const todo = tasks.filter((task) => task.state === TodoState.TODO);
  const doing = tasks.filter((task) => task.state === TodoState.DOING);
  const done = tasks.filter((task) => task.state === TodoState.DONE);

  return (
    <div className="flex w-full flex-col lg:flex-row gap-4">
      <div className="flex flex-col items-stretch w-full lg:w-1/3 bg-gray-900/90 rounded-2xl border border-green-900/40 p-4 gap-3 min-h-[240px]">
        <h2 className="font-bold text-white mb-2 text-center">A fazer</h2>

        {todo.map((task) => (
          <Card
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            state={task.state}
            onChangeState={handleChangeState}
          />
        ))}
      </div>

      <div className="flex flex-col items-stretch w-full lg:w-1/3 bg-gray-900/90 rounded-2xl border border-green-900/40 p-4 gap-3 min-h-[240px]">
        <h2 className="font-bold text-white mb-2 text-center">Em andamento</h2>

        {doing.map((task) => (
          <Card
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            state={task.state}
            onChangeState={handleChangeState}
          />
        ))}
      </div>

      <div className="flex flex-col items-stretch w-full lg:w-1/3 bg-gray-900/90 rounded-2xl border border-green-900/40 p-4 gap-3 min-h-[240px]">
        <h2 className="font-bold text-white mb-2 text-center">Concluído</h2>

        {done.map((task) => (
          <Card
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            state={task.state}
            onChangeState={handleChangeState}
          />
        ))}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
