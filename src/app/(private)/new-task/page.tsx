
import LogoutButton from "@components/logout-button";
import { cookies } from "next/headers";


export default async function Dashboard() {
  const sub = (await cookies()).get('sub')?.value

  return (
    <main className="flex h-full flex-col items-center p-10">
      <h1>Nova Tarefa</h1>
      <p>Olá, {sub}!</p>
      <LogoutButton />
    </main>
  )
}