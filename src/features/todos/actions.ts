'use server';

import { createTodo } from '@features/todos/services/create-todo';
import { RegisterTodo, registerTodoSchema } from '@features/todos/schemas';
import { ApiError } from '@lib/errors/api-error';
import { ActionResult } from '@lib/types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

function getActionErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    return error.detalhe ?? error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Erro interno';
}

export async function createTodoAction(
  data: RegisterTodo,
): Promise<ActionResult> {
  const parsed = registerTodoSchema.safeParse(data);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? 'Dados inválidos',
    };
  }

  const token = (await cookies()).get('access_token')?.value;

  if (!token) {
    return {
      ok: false,
      message: 'Não autenticado',
    };
  }

  try {
    await createTodo(token, parsed.data);
    revalidatePath('/dashboard');

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      message: getActionErrorMessage(error),
    };
  }
}
