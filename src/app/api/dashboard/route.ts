import caller from '@lib/api-caller';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ApiError } from '@lib/errors';

export async function GET() {
  const token = (await cookies()).get('access_token')?.value;

  console.log('Chegou aqui');

  try {
    const data = await caller('/todos/?limit=10&offset=0', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Data que tá sendo impressa', data);
    return NextResponse.json(data);
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      throw err;
    }
    throw new Error('Erro interno');
  }
}
