import { z } from 'zod';

export const registerUserSchema = z.object({
  username: z.string().min(3, 'Usuário deve ter pelo menos 3 caracteres'),
  email: z.email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export type RegisterUser = z.infer<typeof registerUserSchema>;

export const registerUserFormSchema = registerUserSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas devem ser iguais',
    path: ['confirmPassword'],
  });

export type RegisterUserForm = z.infer<typeof registerUserFormSchema>;
