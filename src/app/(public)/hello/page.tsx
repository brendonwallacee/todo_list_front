import { GET } from '@application/api/hello/route';
import HomeButton from '@components/home-button';
import { ApiError } from '@lib/errors';
import { Message } from '@lib/types';

async function getHello(): Promise<Message> {
  try {
    const data = await GET();
    return data;
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      return { message: err.message };
    }
    return { message: err instanceof Error ? err.message : 'Erro interno' };
  }
}

export default async function Hello() {
  const data = await getHello();

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-3xl bg-gray-900 text-white rounded-lg p-4 overflow-x-auto">
        <pre className="whitespace-pre-wrap">{renderJson(data)}</pre>
      </div>
      <HomeButton />
    </main>
  );
}
