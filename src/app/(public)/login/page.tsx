'use client';

import { loginAction } from '@features/auth/actions';
import FormLogin from '@features/auth/components/form-login';
import { LoginInput } from '@features/auth/schemas';
import HomeButton from '@components/navigation/home-button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export default function Login() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleLogin(data: LoginInput) {
    startTransition(async () => {
      const result = await loginAction(data);

      if (!result.ok) {
        toast.error(result.message ?? 'Não foi possível entrar');
        return;
      }

      router.push('/dashboard');
      router.refresh();
    });
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-gray-900/90 text-white rounded-2xl shadow-2xl border border-green-900/40 p-6 sm:p-8 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">Login</h1>
        <p className="text-sm text-center text-gray-300">
          Acesse sua conta para ver suas tarefas.
        </p>

        {/* Formulário */}
        <FormLogin action={handleLogin} isPending={isPending} />

        {/* Link para cadastro */}
        <p className="text-center text-sm text-green-300">
          Ainda não possui uma conta?{' '}
          <Link
            href="/register"
            className="underline text-green-300 hover:text-green-200 transition"
          >
            Cadastre-se
          </Link>
        </p>
      </div>

      {/* Link Home */}
      <div className="absolute top-6 right-6">
        <HomeButton />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
}
