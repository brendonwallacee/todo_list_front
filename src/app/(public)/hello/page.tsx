import { Message } from '@lib/types';
import HomeButton from '@components/navigation/home-button';
import { ApiError } from '@lib/errors/api-error';
import { getHello } from './_services/get-hello';

async function loadHello(): Promise<Message> {
  try {
    return await getHello();
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      return {message: err.detalhe ?? err.message};
    }
    return {message: err instanceof Error ? err.message : 'Erro interno'};
  }
}

export default async function Hello() {
  const data = await loadHello();

  function renderJson(value: Message): React.ReactElement {
    if (typeof value === 'object') {
      return (
        <pre>
          <span className="text-yellow-400">{`"message"`}</span>:{' '}
          <span className="text-green-400">{`"${value.message}"`}</span>
        </pre>
      );
    }
    return <span className="text-green-400">{`"${value}"`}</span>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12 gap-6">
      <div className="w-full max-w-3xl bg-gray-900/90 text-white rounded-2xl border border-green-900/40 p-6 sm:p-8 overflow-x-auto shadow-2xl">
        <pre className="whitespace-pre-wrap text-sm sm:text-base">
          {renderJson(data)}
        </pre>
      </div>
      <HomeButton />
    </main>
  );
}
