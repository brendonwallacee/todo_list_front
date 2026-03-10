import ListCards from '@features/todos/components/list-card';
import { getTodos } from '@features/todos/services/get-todos';
import { TodoList } from '@features/todos/types';
import HomeButton from '@components/navigation/home-button';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const token = (await cookies()).get('access_token')?.value;

  if (!token) {
    redirect('/');
  }

  const data: TodoList = await getTodos(token);

  return (
    <main className="flex w-full flex-col items-center px-4 py-8 sm:px-8 gap-6">
      <h1 className="text-3xl sm:text-5xl font-bold text-center">Dashboard</h1>
      <div className="w-full max-w-6xl">
        <ListCards data={data} />
      </div>
      <HomeButton />
    </main>
  );
}
