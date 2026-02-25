"use client";

import React from "react";
import { toast, Toaster } from "react-hot-toast";


export default function Login() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const username = formData.get("username")
        const password = formData.get("password")

        console.log("Username:", username);
        console.log("Password:", password);

        toast.success("Login efetuado com sucesso!");

        
    }

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      {/* Caixa central do login */}
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-8 space-y-6">
        
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        
        {/* Formulário */}
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-1">E-mail:</label>
            <input
              type="text"
              name="username"
              id="username"
              required
              className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 font-bold text-font-secondary px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Login
          </button>
        </form>

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
        <a href="/" className="underline text-white hover:text-green-500 transition">
          Home
        </a>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
}