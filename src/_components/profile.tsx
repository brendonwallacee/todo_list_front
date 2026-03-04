import { User } from '@/_lib/types';

export default function ProfileTab({ username, email }: User) {
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="flex flex-col p-2 w-full h-full items-center bg-white rounded-sm shadow-lg dark:bg-gray-800">
        <h1 className="font-bold p-2 text-3xl">Nome de Usuario: {username}</h1>
        <p className="text-2xl">E-mail: {email}</p>
      </div>
    </div>
  );
}
