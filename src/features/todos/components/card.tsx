'use client';

import { deleteTodoAction } from '@features/todos/actions';
import { TodoState } from '@features/todos/todo-state';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  TrashIcon,
} from '@heroicons/react/16/solid';
import toast from 'react-hot-toast';

interface CardProps {
  id: number;
  title: string;
  description: string;
  state: TodoState;
  onChangeState: (id: number, newState: TodoState) => void;
}

export default function Card({
  id,
  title,
  description,
  state,
  onChangeState,
}: CardProps) {
  const goToNext = () => {
    if (state === TodoState.TODO) {
      onChangeState(id, TodoState.DOING);
    } else if (state === TodoState.DOING) {
      onChangeState(id, TodoState.DONE);
    }
  };

  const goToPrevious = () => {
    if (state === TodoState.DOING) {
      onChangeState(id, TodoState.TODO);
    } else if (state === TodoState.DONE) {
      onChangeState(id, TodoState.DOING);
    }
  };

  function lixo() {
    toast.custom((t) => (
      <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg flex flex-col gap-3">
        <span>Deseja realmente excluir a tarefa?</span>

        <div className="flex gap-2 justify-end">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              toast.remove(t.id);
              const res = await deleteTodoAction(id);

              if (!res.ok) {
                toast.error(res.message ?? 'Não foi possível excluir a tarefa');
                return;
              }

              onChangeState(id, TodoState.TRASH);
              toast.success(res.message ?? 'Tarefa excluida com sucesso!', {
                duration: 3000,
              });
            }}
            className="px-3 py-1 bg-red-600 rounded-md hover:bg-red-500"
          >
            Sim
          </button>

          <button
            onClick={() => {
              toast.dismiss(t.id);
              toast.remove(t.id);
            }}
            className="px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600"
          >
            Não
          </button>
        </div>
      </div>
    ));
  }

  return (
    <div className="relative flex flex-col p-2 w-[95%] bg-white rounded-sm shadow-lg dark:bg-gray-800">
      <h1 className="font-bold p-2">{title}</h1>
      <p>{description}</p>
      <div className="flex h-full w-full bg-transparent items-center justify-center">
        {state === TodoState.TODO && (
          <button onClick={goToNext} aria-label="Avancar tarefa para Fazendo">
            <ChevronDoubleRightIcon className="flex h-8 w-8 text-green-600 hover:text-green-500" />
          </button>
        )}
        {state === TodoState.DOING && (
          <div className="flex w-full justify-around">
            <button
              onClick={goToPrevious}
              aria-label="Retornar tarefa para A fazer"
            >
              <ChevronDoubleLeftIcon className="flex h-8 w-8 text-green-600 hover:text-green-500" />
            </button>
            <button
              onClick={goToNext}
              aria-label="Avancar tarefa para Concluída"
            >
              <ChevronDoubleRightIcon className="flex h-8 w-8 text-green-600 hover:text-green-500" />
            </button>
          </div>
        )}
        {state === TodoState.DONE && (
          <button
            onClick={goToPrevious}
            aria-label="Retornar tarefa para Fazendo"
          >
            <ChevronDoubleLeftIcon className="flex h-8 w-8 text-green-600 hover:text-green-500" />
          </button>
        )}
      </div>

      <button onClick={lixo} aria-label="Excluir esta tarefa">
        <TrashIcon className="absolute top-2 right-2 w-4 h-4 hover:text-red-800" />
      </button>
    </div>
  );
}
