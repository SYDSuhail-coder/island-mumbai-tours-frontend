import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  const url = `${process.env.Get_Toures_Section}`;
  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
    headers: {
        'x-api-key':'IsMuTo@2026Xk9$mQ3zP!rL7vN'
    }
  });
  const data = await response.json();
  return NextResponse.json(data);
}
