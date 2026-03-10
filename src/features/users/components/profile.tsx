import { User } from '@features/users/types';

export default function ProfileTab({ username, email }: User) {
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="flex flex-col p-6 w-full items-center bg-gray-900/90 text-white rounded-2xl shadow-2xl border border-green-900/40 gap-2">
        <h1 className="font-bold text-2xl sm:text-3xl">
          Nome de Usuario: {username}
        </h1>
        <p className="text-lg sm:text-xl text-gray-200">E-mail: {email}</p>
      </div>
    </div>
  );
}
