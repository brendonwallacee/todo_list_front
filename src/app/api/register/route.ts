import caller from "@/lib/api-caller";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("O que chegou no POST", req);
  try {
    const body = await req.json();
    const response = await caller("/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });

    return NextResponse.json(response);

  }
  catch (err: any) {
    const detalhe = err instanceof Error && err.cause ? (err.cause as any).detalhe : null;
    const statusCode = err instanceof Error && err.cause ? (err.cause as any).status ?? 500 : 500;

    return NextResponse.json(detalhe , { status: statusCode });
  }
}
