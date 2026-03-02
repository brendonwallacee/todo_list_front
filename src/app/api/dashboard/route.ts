import caller from "@/_lib/api-caller";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const token = (await cookies()).get("access_token")?.value;
  

  console.log("Chegou aqui")

  try {
    const data = await caller("/todos/?limit=10&offset=0", {
      method: "GET",
      headers:{ 
        "accept": "application/json",
        "Authorization": `Bearer ${token}`},
    });
    console.log("Data que tá sendo impressa", data)
    return NextResponse.json(data);

  } catch (err: any) {
    const detalhe = err instanceof Error && err.cause ? (err.cause as any).detalhe : null;
    const statusCode = err instanceof Error && err.cause ? (err.cause as any).status ?? 500 : 500;

    return NextResponse.json(detalhe, { status: statusCode });
  }
}
