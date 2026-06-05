import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();

    const response = await fetch(process.env.post_Booking_Section, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'IsMuTo@2026Xk9$mQ3zP!rL7vN',
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
}