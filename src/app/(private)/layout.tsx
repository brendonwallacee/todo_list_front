'use client';
import { usePathname, useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const getButtonClass = (path: string) =>
    `h-full w-full flex items-center justify-center cursor-pointer center font-bold transition-colors
  ${
    pathname === path
      ? 'bg-green-600 hover:bg-green-500'
      : 'bg-green-800 hover:bg-green-500'
  }`;

  return (
    <div className="flex h-screen w-screen">
      <main className="flex h-full w-full flex-col items-center">
        <div className="flex flex-row gap-2 bg-gray-600 w-full h-10">
          <button
            className={getButtonClass('/dashboard')}
            onClick={() => router.push('/dashboard')}
          >
            {' '}
            Dashboard{' '}
          </button>
          <button
            className={getButtonClass('/new-task')}
            onClick={() => router.push('/new-task')}
          >
            Nova Tarefa
          </button>
          <button
            className={getButtonClass('/profile')}
            onClick={() => router.push('/profile')}
          >
            Perfil
          </button>
        </div>
        <div className="flex items-center justify-center w-full h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
