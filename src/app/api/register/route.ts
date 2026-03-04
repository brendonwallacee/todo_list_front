import caller from '@lib/api-caller';
import { ApiError } from '@lib/errors';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log('O que chegou no POST\n', req);
  try {
    const body = await req.json();
    const response = await caller('/users/', {
      method: 'POST',
      headers: {
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
