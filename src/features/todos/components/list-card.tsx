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
      <div className="flex w-[80%] h-full bg-transparent rounded-xl shadow-lg space-x-2 items-center justify-center">
        <div className="flex h-full w-full items-center justify-center bg-gray-900 gap-2">
          <p>Nenhuma tarefa encontrada.</p>
        </div>
      </div>
    );
  }

  const todo = tasks.filter((task) => task.state === TodoState.TODO);
  const doing = tasks.filter((task) => task.state === TodoState.DOING);
  const done = tasks.filter((task) => task.state === TodoState.DONE);

  return (
    <div className="flex w-full h-full gap-4">
      <div className="flex flex-col items-center w-1/3 bg-gray-900 rounded-l-2xl p-4 gap-2">
        <h2 className="font-bold text-white mb-2">A fazer</h2>

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

      <div className="flex flex-col items-center w-1/3 bg-gray-900 p-4 gap-2">
        <h2 className="font-bold text-white mb-2">Em andamento</h2>

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

      <div className="flex flex-col items-center w-1/3 bg-gray-900 rounded-r-2xl p-4 gap-2">
        <h2 className="font-bold text-white mb-2">Concluído</h2>

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
