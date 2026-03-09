import LogoutButton from '@features/auth/components/logout-button';
import { getUserSubFromToken } from '@features/auth/services/session';
import ProfileTab from '@features/users/components/profile';
import { getUser } from '@features/users/services/get-user';
import { User } from '@features/users/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Profile() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!token) {
    redirect('/');
  }

  const sub = cookieStore.get('sub')?.value ?? getUserSubFromToken(token);

  if (!sub) {
    redirect('/');
  }

  const user: User = await getUser(token, sub);

  return (
    <main className="flex h-full w-[50%] flex-col items-center p-10">
      <h1 className="text-5xl">Perfil</h1>
      <ProfileTab id={user.id} username={user.username} email={user.email} />
      <LogoutButton />
    </main>
  );
}
