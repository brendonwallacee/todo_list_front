import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookie = await cookies()
  const res = NextResponse.json({ message: "logout" });
  cookie.delete("access_token");
  cookie.delete("sub");
  return res;
}