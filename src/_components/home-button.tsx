"use client"
import { useRouter } from "next/navigation"

export default function HomeButton() {
  const router = useRouter()

  return (
    <button 
    className="bg-green-600 font-bold px-4 py-2 rounded-lg hover:bg-green-500 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed hover:disabled:bg-green-600" 
    onClick={() => {router.push("/")}}>Home</button>
  )
}