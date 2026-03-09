'use client';

import {
  RegisterUserForm,
  registerUserFormSchema,
} from '@features/users/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type FormRegisterProps = {
  action: (data: RegisterUserForm) => void | Promise<void>;
  isPending?: boolean;
};

export default function FormRegister({
  action: onSubmitForm,
  isPending = false,
}: FormRegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterUserForm>({
    resolver: zodResolver(registerUserFormSchema),
    mode: 'onChange',
  });

  function onSubmit(data: RegisterUserForm) {
    onSubmitForm(data);
  }

  return (
    <div>
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label>Usuário:</label>
          <input
            {...register('username')}
            className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 focus:outline-none focus:border-green-500"
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-1">
            Email:
          </label>
          <input
            {...register('email')}
            className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 focus:outline-none focus:border-green-500"
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
            className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1">
            Repita a senha:
          </label>
          <input
            type="password"
            {...register('confirmPassword')}
            className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid || isPending}
          className="bg-green-600 font-bold text-font-secondary px-4 py-2 rounded-lg hover:bg-green-500 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed hover:disabled:bg-green-600"
        >
          {isPending ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}
