import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-6 py-16">
      <div className="absolute top-6 right-6">
        <Link
          href="/login"
          className="bg-green-600 text-font-secondary font-bold px-4 py-2 rounded-lg hover:bg-green-500 transition"
        >
          Login
        </Link>
      </div>

      <div className="w-full max-w-4xl rounded-3xl bg-gray-900/90 text-white shadow-2xl border border-green-900/40 p-8 sm:p-12 space-y-6">
        <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-green-400">
          Lista de Tarefas
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
          Sejam bem-vindos a nossa Lista de Tarefas!
        </h1>
        <p className="text-base sm:text-lg text-gray-200">
          Aqui você pode gerenciar suas tarefas de forma simples, rápida e
          eficiente.
        </p>
        <p className="text-base sm:text-lg text-gray-300">
          Como prova que nossa API já está funcionando corretamente, você pode
          ver o resultado clicando{' '}
          <Link
            className="underline text-green-300 hover:text-green-200 font-semibold"
            href="/hello"
          >
            aqui
          </Link>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/login"
            className="bg-green-600 text-font-secondary font-bold px-5 py-3 rounded-lg hover:bg-green-500 transition text-center"
          >
            Entrar agora
          </Link>
          <Link
            href="/hello"
            className="bg-transparent border border-green-500 text-green-200 font-semibold px-5 py-3 rounded-lg hover:bg-green-500/10 transition text-center"
          >
            Ver resposta da API
          </Link>
        </div>
      </div>
    </main>
  );
}
