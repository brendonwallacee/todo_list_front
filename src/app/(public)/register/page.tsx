"use client";

import FormRegister from "@/_components/form-register";
import { toast, Toaster } from "react-hot-toast";


async function handleRegister(data: any) {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          username: data.username,
          email: data.email,
          password: data.password,
        }),
    });
    const json = await res.json();
    if (!res.ok) return toast.error(`${res.status} - ${json}`);
    toast.success("Cadastro realizado com sucesso!");
    


}

export default function Register() {


  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-8 space-y-6">

        <h1 className="text-2xl font-bold text-center mb-4">Cadastre-se</h1>

        <FormRegister action={handleRegister} />

      </div>

      <div className="absolute top-8 right-8">
        <a href="/" className="underline hover:text-green-500 transition">
          Home
        </a>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
}