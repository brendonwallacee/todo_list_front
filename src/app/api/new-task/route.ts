import caller from '@lib/api-caller';
import { ApiError } from '@lib/errors';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const token = (await cookies()).get('access_token')?.value;

    const body = await req.json();
    const response = await caller('/todos/', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return NextResponse.json(response);
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      throw err;
    }
    throw new Error('Erro interno');
  }
}
