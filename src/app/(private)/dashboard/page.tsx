import { GET } from '@application/api/dashboard/route';
import HomeButton from '@components/home-button';
import ListCards from '@components/list-card';
import { TodoList } from '@lib/types';

async function getHello() {
  const data = await GET();
  const json = await data.json();
  console.log('Data do getHello', json);
  return json;
}

export default async function Dashboard() {
  const data: TodoList = await getHello();

  return (
    <main className="flex h-full w-full flex-col items-center p-10">
      <h1 className="text-5xl">Dashboard</h1>
      <ListCards data={data.todos} />
      <HomeButton />
    </main>
  );
}
