import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="text-lg">
        Página não encontrada. Volte mais tarde ou entre em contato como nosso
        <Link href="/">suporte</Link> para saber mais.
      </p>
      <Link href="/">Voltar para a página inicial</Link>
    </main>
  );
}
