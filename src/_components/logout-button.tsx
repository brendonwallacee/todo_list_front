"use client"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    const data = await fetch('/api/logout')
    console.log(data)
    router.push("/")
  }

  return (
    <button className="underline" onClick={handleLogout}>Voltar</button>
  )
}