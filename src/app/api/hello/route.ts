import caller from '@lib/api-caller';
import { ApiError } from '@lib/errors';

export async function GET() {
  try {
    const data = await caller('/');
    console.log(data);
    return data;
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      throw err;
    }
    throw new Error('Erro interno');
  }
}
