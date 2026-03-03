import type { Metadata } from 'next';
import HomePage from '@application/home-page';

export const metadata: Metadata = {
  title: 'Boas vindas!',
};

export default async function Page() {
  return <HomePage />;
}
