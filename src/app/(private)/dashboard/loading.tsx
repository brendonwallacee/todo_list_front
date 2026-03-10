import LogoutButton from '@features/auth/components/logout-button';

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center px-4 py-8 sm:px-8 gap-6">
      <div className="flex h-12 text-3xl sm:text-5xl font-bold">
        Dashboard
      </div>
      <div className="flex flex-col items-center justify-center w-full max-w-6xl bg-gray-900/90 rounded-2xl border border-green-900/40 p-6 sm:p-8 gap-2">
        <div className="flex justify-center items-center w-full h-full gap-4">
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce [animation-delay:-0.5s]"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce [animation-delay:-0.25s]"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce [animation-delay:0s]"></div>
        </div>
      </div>
      <div>
        <LogoutButton />
      </div>
    </main>
  );
}
