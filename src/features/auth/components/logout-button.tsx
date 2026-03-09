'use client';

import { logoutAction } from '@features/auth/actions';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleLogout() {
    startTransition(async () => {
      const result = await logoutAction();

      if (!result.ok) {
        return;
      }

      router.push('/');
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      className="bg-red-600 font-bold px-4 py-2 rounded-lg hover:bg-red-500 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed hover:disabled:bg-red-600"
      disabled={isPending}
      onClick={handleLogout}
    >
      {isPending ? 'Saindo...' : 'Sair'}
    </button>
  );
}
