'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string(),
});

type LoginFormData = z.infer<typeof loginSchema>;

type FormLoginProps = {
  action: (data: LoginFormData) => void;
};

export default function FormLogin({ action: onSubmitForm }: FormLoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  function onSubmit(data: LoginFormData) {
    onSubmitForm(data);
  }

  return (
    <div>
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
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

        <button
          type="submit"
          disabled={!isValid}
          className="bg-green-600 font-bold text-font-secondary px-4 py-2 rounded-lg hover:bg-green-500 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed hover:disabled:bg-green-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
