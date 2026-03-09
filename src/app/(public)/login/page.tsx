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
    <main className="flex min-h-screen items-center justify-center p-8">
      {/* Caixa central do login */}
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

        {/* Formulário */}
        <FormLogin action={handleLogin} isPending={isPending} />

        {/* Link para cadastro */}
        <p className="text-center text-sm text-green-600">
          Ainda não possui uma conta?{' '}
          <Link
            href="/register"
            className="underline text-green-600 hover:text-green-400 transition"
          >
            Cadastre-se
          </Link>
        </p>
      </div>

      {/* Link Home */}
      <div className="absolute top-8 right-8">
        <HomeButton />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
}
