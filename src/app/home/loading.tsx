"use client";

export default function Home() {
    return (
        <main className="flex min-h-screen items-center justify-center p-8">
            {/* Caixa central do login */}
            <div className="flex w-full h-92 max-w-md bg-gray-900 rounded-xl shadow-lg space-x-2 items-center justify-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce [animation-delay:-0.5s]"></div>
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce [animation-delay:-0.25s]"></div>
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce [animation-delay:0s]"></div>
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