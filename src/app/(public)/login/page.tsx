"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import FormLogin from "@components/form-login";

export default function Login() {

  const router = useRouter();

  async function handleRegister(data: any) {
    const params = new URLSearchParams({
      username: data.email,
      password: data.password
    });
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const json = await res.json();
    if (!res.ok) return toast.error(`${res.status} - ${json}`);
    console.log(json);
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      {/* Caixa central do login */}
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-8 space-y-6">

        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

        {/* Formulário */}
        <FormLogin action={handleRegister} />

        {/* Link para cadastro */}
        <p className="text-center text-sm text-green-600">
          Ainda não possui uma conta?{" "}
          <a href="/register" className="underline text-green-600 hover:text-green-400 transition">
            Cadastre-se
          </a>
        </p>
      </div>

      {/* Link Home */}
      <div className="absolute top-8 right-8">
        <a href="/" className="underline hover:text-green-500 transition">
          Home
        </a>
      </div>
    </main>
  );
}