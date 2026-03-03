"use client";

import LogoutButton from "@components/logout-button";

export default function Home() {
  return (
    <main className="flex h-full w-full flex-col items-center p-10">
      <div className="flex h-12 text-5xl"> Dashboard</div>
      <div className="flex flex-col items-center justify-center h-full w-full bg-gray-900 rounded-l-2xl p-4 gap-2">
        <div className="flex justify-center items-center w-full h-full gap-4">
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce [animation-delay:-0.5s]"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce [animation-delay:-0.25s]"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce [animation-delay:0s]"></div>
        </div>
      </div>
      <div>
          <LogoutButton />
        </div>
    </main>
  );
}