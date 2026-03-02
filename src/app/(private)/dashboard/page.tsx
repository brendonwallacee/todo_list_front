
import LogoutButton from "@components/logout-button";
import ListCards from "@components/list-card";
import { cookies } from "next/headers";
import { ApiResponse } from "@lib/types";
import { GET } from "@application/api/dashboard/route"
 
async function getHello() {
  const data = await GET()
  const json = await data.json()
  console.log("Data do getHello", json)
  return json
}


export default async function Dashboard() {
  const sub = (await cookies()).get('sub')?.value

  const data: ApiResponse = await getHello();



  return (
    <main className="flex h-full w-full flex-col items-center p-10">
      <h1>Dashboard</h1>
      <p>Olá, {sub}!</p>
      <ListCards data={data.todos} />
      <LogoutButton />
    </main>
  )
}