import Link from 'next/link';
export default function HomeButton() {
  return (
    <Link
      className="bg-green-600 font-bold px-4 py-2 text-font-secondary rounded-lg hover:bg-green-500 cursor-pointer transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:disabled:bg-green-600"
      href="/"
    >
      Home
    </Link>
  );
}
