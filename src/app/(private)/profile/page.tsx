import { User } from '@lib/types';
import { GET } from '@application/api/user/route';
import LogoutButton from '@components/logout-button';
import ProfileTab from '@components/profile';

async function getUser() {
  const data = await GET();
  const json = await data.json();
  console.log(json);
  return json;
}

export default async function Profile() {
  const user: User = await getUser();

  return (
    <main className="flex h-full w-[50%] flex-col items-center p-10">
      <h1 className="text-5xl">Perfil</h1>
      <ProfileTab id={user.id} username={user.username} email={user.email} />
      <LogoutButton />
    </main>
  );
}
