'use client';

import FormRegister from '@components/form-register';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';

export default function Register() {
  const router = useRouter();

  async function handleRegister(data: any) {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    });

    const json = await res.json();
    if (!res.ok) return toast.error(`${res.status} - ${json}`);
    toast.success('Cadastro realizado com sucesso!');

    const params = new URLSearchParams({
      username: data.email,
      password: data.password,
    });
    const res2 = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const json2 = await res2.json();
    if (!res2.ok) return toast.error(`${res2.status} - ${json}`);
    console.log(json);
    router.push('/dashboard');
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center mb-4">Cadastre-se</h1>

        <FormRegister action={handleRegister} />
      </div>

      <div className="absolute top-8 right-8">
        <a href="/" className="underline hover:text-green-500 transition">
          Home
        </a>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
}
