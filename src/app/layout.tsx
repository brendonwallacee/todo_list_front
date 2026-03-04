import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Lista de Tarefas - @brendonwallacee',
  description:
    'Este é um projeto feito com Next.js que consiste em uma lista de tarefas, onde o usuário pode adicionar, editar e excluir tarefas. A API foi criada também como forma de estudo de desenvolvimento de APIs com FastAPI.',
  authors: [
    { name: 'Brendon Wallace', url: 'https://github.com/brendonwallacee' },
  ],
  keywords: [
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'TodoDTO List',
    'FastAPI',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
