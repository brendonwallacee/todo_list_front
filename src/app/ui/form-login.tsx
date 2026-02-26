"use client";

import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { HelloData } from "@/lib/types";

export default function FormLogin(res: HelloData) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void>{
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const username = formData.get("username")
        const password = formData.get("password")

        const data = res.message

        console.log(data);
        toast.success(`${data}`);

        
    }
  return (
    <div>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-1">E-mail:</label>
          <input
            type="text"
            name="username"
            id="username"
            required
            className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 focus:outline-none focus:border-green-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1">Senha:</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 focus:outline-none focus:border-green-500"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 font-bold text-font-secondary px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Login
        </button>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
    )
}