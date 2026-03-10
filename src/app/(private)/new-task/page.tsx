'use client';

import { createTodoAction } from '@features/todos/actions';
import TaskInput from '@features/todos/components/task-input';
import { RegisterTodo } from '@features/todos/schemas';
import HomeButton from '@components/navigation/home-button';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function NewTask() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleRegisterTask(data: RegisterTodo) {
    startTransition(async () => {
      const result = await createTodoAction(data);

      if (!result.ok) {
        toast.error(result.message ?? 'Não foi possível criar a tarefa');
        return;
      }

      toast.custom((t) => (
        <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg flex flex-col gap-3">
          <span>Tarefa cadastrada com sucesso! Deseja cadastrar outra?</span>

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                toast.dismiss(t.id);
              }}
              className="px-3 py-1 bg-green-600 rounded-md hover:bg-green-500"
            >
              Sim
            </button>

            <button
              onClick={() => {
                toast.dismiss(t.id);
                router.push('/dashboard');
                router.refresh();
              }}
              className="px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600"
            >
              Não
            </button>
          </div>
        </div>
      ));
    });
  }

  return (
    <main className="flex w-full flex-col items-center px-4 py-8 sm:px-8 gap-6">
      <div className="w-full max-w-md bg-gray-900/90 text-white rounded-2xl shadow-2xl border border-green-900/40 p-6 sm:p-8 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          Nova Tarefa
        </h1>
        <TaskInput action={handleRegisterTask} isPending={isPending} />
      </div>
      <HomeButton />
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
}
