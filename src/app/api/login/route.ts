import caller from '@lib/api-caller';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getUserSub } from '@lib/token';
import { ApiError } from '@lib/errors';

export async function POST(req: NextRequest) {
  console.log('O que chegou no POST\n', req);
  try {
    const formData = await req.formData();

    console.log('Form data\n', formData);

    const username = formData.get('username');
    const password = formData.get('password');

    const params = new URLSearchParams({
      username: String(username),
      password: String(password),
    });

    console.log('Aqui é o body\n', params);
    const response = await caller('/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    (await cookies()).set('access_token', response.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });

    const sub = await getUserSub();
    console.log(sub);

    if (sub) {
      (await cookies()).set('sub', sub, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
      });
    }

    return NextResponse.json(response);
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      throw err;
    }
    throw new Error('Erro interno');
  }
}
