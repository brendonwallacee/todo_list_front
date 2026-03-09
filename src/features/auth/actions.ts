'use server';

import { registerUser } from '@features/users/services/register';
import {
  RegisterUserForm,
  registerUserFormSchema,
} from '@features/users/schemas';
import { loginSchema, LoginInput } from '@features/auth/schemas';
import {
  clearSessionCookies,
  setSessionCookies,
} from '@features/auth/services/session';
import { loginUser } from '@features/auth/services/login';
import { ApiError } from '@lib/errors/api-error';
import { ActionResult } from '@lib/types';

function getActionErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    return error.detalhe ?? error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Erro interno';
}

export async function loginAction(data: LoginInput): Promise<ActionResult> {
  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? 'Credenciais inválidas',
    };
  }

  try {
    const response = await loginUser(parsed.data.email, parsed.data.password);
    await setSessionCookies(response.access_token);

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      message: getActionErrorMessage(error),
    };
  }
}

export async function registerAndLoginAction(
  data: RegisterUserForm,
): Promise<ActionResult> {
  const parsed = registerUserFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? 'Dados inválidos',
    };
  }

  try {
    await registerUser({
      username: parsed.data.username,
      email: parsed.data.email,
      password: parsed.data.password,
    });

    const response = await loginUser(parsed.data.email, parsed.data.password);
    await setSessionCookies(response.access_token);

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      message: getActionErrorMessage(error),
    };
  }
}

export async function logoutAction(): Promise<ActionResult> {
  try {
    await clearSessionCookies();
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      message: getActionErrorMessage(error),
    };
  }
}
