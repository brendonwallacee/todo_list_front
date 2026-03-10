'use client';

import HomeButton from '@components/navigation/home-button';
import { registerAndLoginAction } from '@features/auth/actions';
import FormRegister from '@features/users/components/form-register';
import { RegisterUserForm } from '@features/users/schemas';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export default function Register() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleRegister(data: RegisterUserForm) {
    startTransition(async () => {
      const result = await registerAndLoginAction(data);

      if (!result.ok) {
        toast.error(result.message ?? 'Não foi possível cadastrar');
        return;
      }

      toast.success('Cadastro realizado com sucesso!');
      router.push('/dashboard');
      router.refresh();
    });
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-gray-900/90 text-white rounded-2xl shadow-2xl border border-green-900/40 p-6 sm:p-8 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          Cadastre-se
        </h1>
        <p className="text-sm text-center text-gray-300">
          Crie sua conta para começar a organizar suas tarefas.
        </p>

        <FormRegister action={handleRegister} isPending={isPending} />
      </div>

      <div className="absolute top-6 right-6">
        <HomeButton />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
}
