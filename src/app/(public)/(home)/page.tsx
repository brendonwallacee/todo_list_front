
import type { Metadata } from 'next';
import HomePage from '@/app/home-page';

export const metadata: Metadata = {
  title: 'Boas vindas!'
};

export default async function Page() {
  
  return <HomePage/>
  
}
