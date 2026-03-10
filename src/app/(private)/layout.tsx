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
    `flex-1 min-w-[120px] px-3 py-2 rounded-md flex items-center justify-center cursor-pointer font-semibold transition-colors text-sm sm:text-base
  ${
    pathname === path
      ? 'bg-green-600 hover:bg-green-500'
      : 'bg-green-800 hover:bg-green-500'
  }`;

  return (
    <div className="flex min-h-screen w-full">
      <main className="flex min-h-screen w-full flex-col items-center">
        <div className="sticky top-0 z-10 flex flex-wrap gap-2 bg-gray-900/90 border-b border-green-900/40 w-full px-2 py-2">
          <button
            className={getButtonClass('/dashboard')}
            onClick={() => router.push('/dashboard')}
          >
            Dashboard
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
        <div className="flex items-center justify-center w-full flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
