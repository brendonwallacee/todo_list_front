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
    <main className="flex h-full w-full flex-col items-center p-10">
      <h1 className="text-5xl">Dashboard</h1>
      <ListCards data={data} />
      <HomeButton />
    </main>
  );
}
