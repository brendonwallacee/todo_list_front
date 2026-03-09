import type { Metadata } from 'next';
import HomePage from './_components/home-page';

export const metadata: Metadata = {
  title: 'Boas vindas!',
};

export default async function Page() {
  return <HomePage />;
}
