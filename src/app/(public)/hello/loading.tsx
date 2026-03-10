import HomeButton from '@components/navigation/home-button';

export default function Hello() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12 gap-6">
      <div className="w-full max-w-3xl bg-gray-900/90 rounded-2xl border border-green-900/40 p-6 sm:p-8 overflow-x-auto">
        <div className="flex space-x-2 justify-center">
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-300 [animation-delay:-0.15s]"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-500"></div>
        </div>
      </div>
      <HomeButton />
    </main>
  );
}
