import caller from '@lib/api-caller';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ApiError } from '@lib/errors';

export async function GET() {
  const token = (await cookies()).get('access_token')?.value;
  const sub = (await cookies()).get('sub')?.value;

  console.log('Chegou aqui');

  try {
    const data = await caller(`/users/${sub}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return NextResponse.json(data);
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      return NextResponse.json(err.detalhe, { status: err.status });
    }
    return NextResponse.json('Erro interno', { status: 500 });
  }
}
