'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const data = await fetch('/api/logout');
    console.log(data);
    router.push('/');
  }

  return (
    <button
      className="bg-red-600 font-bold px-4 py-2 rounded-lg hover:bg-red-500 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed hover:disabled:bg-red-600"
      onClick={handleLogout}
    >
      Sair
    </button>
  );
}
