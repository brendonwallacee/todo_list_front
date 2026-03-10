'use client';

import { LoginInput, loginSchema } from '@features/auth/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type FormLoginProps = {
  action: (data: LoginInput) => void | Promise<void>;
  isPending?: boolean;
};

export default function FormLogin({
  action: onSubmitForm,
  isPending = false,
}: FormLoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  function onSubmit(data: LoginInput) {
    onSubmitForm(data);
  }

  return (
    <div className="w-full">
      <form
        className="flex flex-col space-y-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-1">
            Email:
          </label>
          <input
            {...register('email')}
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1">
            Senha:
          </label>
          <input
            type="password"
            {...register('password')}
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid || isPending}
          className="bg-green-600 font-bold text-font-secondary px-4 py-2 rounded-lg hover:bg-green-500 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed hover:disabled:bg-green-600"
        >
          {isPending ? 'Entrando...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
