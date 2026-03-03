import caller from "@/_lib/api-caller";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const token = (await cookies()).get("access_token")?.value;
  const sub = (await cookies()).get("sub")?.value;
  

  console.log("Chegou aqui")

  try {
    const data = await caller(`/users/${sub}`, {
      method: "GET",
      headers:{ 
        "accept": "application/json",
        "Authorization": `Bearer ${token}`},
    });
    return NextResponse.json(data);

  } catch (err: any) {
    const detalhe = err instanceof Error && err.cause ? (err.cause as any).detalhe : null;
    const statusCode = err instanceof Error && err.cause ? (err.cause as any).status ?? 500 : 500;

    return NextResponse.json(detalhe, { status: statusCode });
  }
}
