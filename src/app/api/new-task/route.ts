import caller from '@lib/api-caller';
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
  } catch (err: any) {
    const detalhe =
      err instanceof Error && err.cause ? (err.cause as any).detalhe : null;
    const statusCode =
      err instanceof Error && err.cause
        ? ((err.cause as any).status ?? 500)
        : 500;

    return NextResponse.json(detalhe, { status: statusCode });
  }
}
