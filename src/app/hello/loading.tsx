"use client";

export default function Hello() {
  return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full max-w-3xl bg-gray-900rounded-lg p-4 overflow-x-auto">
                <div className="flex space-x-2 justify-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-300 [animation-delay:-0.15s]"></div>
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-500"></div>
                </div>
            </div>
            <a className="underline" href="/">Home</a>
        </main>
    )
}
