'use client';

import HomeButton from '@components/home-button';
import TaskInput from '@components/task-input';
import { TodoInput } from '@lib/schemas';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function NewTask() {
  const router = useRouter();

  async function handleRegisterTask(data: TodoInput) {
    const res = await fetch('/api/new-task', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) return toast.error(`${res.status} - ${json}`);
    toast.custom((t) => (
      <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg flex flex-col gap-3">
        <span>Tarefa cadastrada com sucesso! Deseja cadastrar outra?</span>

        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              // limpa formulário ou apenas fecha o toast
            }}
            className="px-3 py-1 bg-green-600 rounded-md hover:bg-green-500"
          >
            Sim
          </button>

          <button
            onClick={() => {
              toast.dismiss(t.id);
              router.push('/dashboard'); // ou qualquer rota
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
    <main className="flex h-full flex-col items-center p-10">
      <h1>Nova Tarefa</h1>
      <TaskInput action={handleRegisterTask} />
      <HomeButton />
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
}
