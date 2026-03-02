"use client"
import { useRouter } from "next/navigation"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <div className="flex h-screen w-screen">
      <main className="flex h-full w-full flex-col items-center">
        <div className="flex flex-row gap-2 bg-gray-600 w-full h-10">
          <button
            className="bg-green-600 h-full w-full flex items-center justify-center font-bold cursor-pointer hover:bg-green-500"
            onClick={() => router.push('/dashboard')}> Dashboard </button>
          <button
            className="bg-green-600 h-full w-full flex items-center justify-center font-bold cursor-pointer hover:bg-green-500"
            onClick={() => router.push('/new-task')}>Nova Tarefa</button>
          <button
            className="bg-green-600 h-full w-full flex items-center justify-center font-bold cursor-pointer hover:bg-green-500"
            onClick={() => router.push('/profile')}>Perfil</button>
        </div>
        <div className="flex items-center justify-center w-full h-full">
          {children}
        </div>

      </main>
    </div>

  )
}