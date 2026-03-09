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
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center mb-4">Cadastre-se</h1>

        <FormRegister action={handleRegister} isPending={isPending} />
      </div>

      <div className="absolute top-8 right-8">
        <HomeButton />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
}
