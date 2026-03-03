import caller from '@lib/api-caller';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await caller('/');
    console.log(data);
    return data;
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
