"use client"

import { Todo } from "@lib/types";
import { useEffect, useState } from "react";
import Card from "./card";
import { TodoState } from "@root/public/enums";

export default function ListCards({ data }: { data: Todo[] }) {
  const [tasks, setTasks] = useState<Todo[]>([]);

  useEffect(() => {
    setTasks(data);
  }, [data]);

  const handleChangeState = (id: number, newState: TodoState) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newState } : task)
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
    )
  }

  const columns: { [key in Exclude<TodoState, TodoState.TRASH>]: Todo[] } = {
    [TodoState.TODO]: [],
    [TodoState.DOING]: [],
    [TodoState.DONE]: []
  };

  tasks.forEach((task) => {
    if (columns[task.state !== TodoState.TRASH]) {
      columns[task.state as TodoState].push(task);
    }
  });

  return (
    <div className="flex w-full gap-4">
      {Object.entries(columns).map(([state, tasksInState]) => (
        <div
          key={state}
          className="flex flex-col w-1/3 bg-gray-900 rounded-2xl p-4 gap-2"
        >
          <h2 className="font-bold text-white mb-2">
            {state === TodoState.TODO
              ? "A fazer"
              : state === TodoState.DOING
                ? "Em andamento"
                : state === TodoState.DONE
                  ? "Concluído"
                  : ""
            }
          </h2>

          {tasksInState.map((task) => (
            <Card
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              state={task.s}
              onChangeState={handleChangeState}
            />
          ))}
        </div>
      ))}
    </div>
  );
}