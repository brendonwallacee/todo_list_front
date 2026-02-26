export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="absolute top-8 right-8">
        <a 
          href="/login"
          className="bg-green-500 font-bold text-font-secondary px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Login
          </a>
      </div>
      <h1 className="text-4xl font-bold">Sejam bem-vindos a nossa Lista de Tarefas!</h1>
      <p className="text-lg">Aqui você pode gerenciar suas tarefas de forma simples e eficiente.</p>
      <p className="text-lg">Como prova que nossa API também já está funcionando corretamente, vocé pode ver o resultado da API clicando <a className="underline" href="/hello">aqui</a>.</p>
    </main>
  );
}
